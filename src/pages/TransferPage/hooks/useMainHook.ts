import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setUser,
  setUserCompanies,
  UserState,
} from "../../../store/slices/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { setKaspiPhone, setUserData, setUserName, setUserPhone } from "../../../store/slices/orderSlice.ts";
import {
  fetchCategories,
  setCart,
  setLoginTime,
} from "../../../store/slices/mainSlice.ts";
import { fetchCompanies } from "../../../store/slices/companySlice.ts";
import {
  fetchDeliveries,
  fetchOrders,
  OrderStatuses,
} from "../../../store/slices/managerSlice.ts";
import { fetchActions } from "../../../store/slices/loyaltySlice.ts";

const useMainHook = (promo: string = "") => {
  const user = useAppSelector((state) => state.user);
  const main = useAppSelector((state) => state.main);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorType, setErrorType] = useState<
    "internet" | "unauthorised" | "server" | "bad request" | null
  >(null);

  const updateLoginTime = () => {
    const lastLogin = main.lastLogin;
    const now = new Date();
    const diffInMilliseconds = Math.abs(
      now.getTime() - new Date(lastLogin).getTime(),
    );
    if (Math.floor(diffInMilliseconds / (1000 * 60)) > 30) {
      dispatch(setCart([]));
    }
    dispatch(setLoginTime(new Date().toISOString()));
  };

  const getUserCompanies = async (user_id: string) => {
    // service/user/1234249296/companies/
    const response = await fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL +
        `service/user/${user_id}/companies/`,
      {
        method: "GET",
      },
    );
    return response.json();
  };

  const updateGeneralData = async (data: UserState) => {
    dispatch(fetchCategories());
    dispatch(setUser(data));
    dispatch(setUserData(data));
    const companies: number[] = await getUserCompanies(data.telegram_id);
    dispatch(setUserCompanies(companies));
    // console.log("User: ", data);
    // console.log("Companies: ", companies);
    const routes = {
      client: "/menu",
      manager: "/orders/search",
      cook: "/cook",
      runner: "/runner",
      admin: "/orders",
      delivery: "",
      "": "",
    };
    if (!["client", "manager", "cook", "runner", "admin"].includes(data.role)) {
      setErrorType("bad request");
      return;
    }

    dispatch(fetchCompanies());
    if (data.role === "client") {
      updateLoginTime();
      dispatch(fetchActions({ company_id: 1, user_id: data.telegram_id }));
    } else if (
      data.role === "manager" ||
      data.role === "cook" ||
      data.role === "admin" ||
      data.role === "runner"
    ) {
      type OrderFilters = {
        [key in "manager" | "cook" | "admin" | "runner"]: {
          statuses: OrderStatuses[];
          company_ids: number[];
        };
      };
      if (companies.length === 0) {
        setErrorType("bad request");
        return;
      }
      const orderFilters: OrderFilters = {
        manager: {
          statuses: ["manager_await", "payment_await"],
          company_ids: companies,
        },
        cook: {
          statuses: ["active"],
          company_ids: companies,
        },
        admin: {
          statuses: [
            "manager_await",
            "payment_await",
            "active",
            "on_runner",
            "done",
            "on_delivery",
            "inactive",
            "rejected",
          ],
          company_ids: companies,
        },
        runner: {
          statuses: ["on_runner"],
          company_ids: companies,
        },
      };
      dispatch(fetchOrders(orderFilters[data.role]));
      dispatch(fetchDeliveries());
    }
    navigate(routes[data.role]);
  };

  const fetchData = () => {
    setErrorType(null);
    const telegram_id = searchParams.get("telegram_id");
    const phone = searchParams.get("phone");
    const name = searchParams.get("name");

    if (telegram_id === null || phone === null || name === null) {
      setErrorType("unauthorised");
      return;
    }

    const postData = {
      telegram_id: `${telegram_id}`,
      telegram_fullname: name,
      promo: promo,
    };

    fetch(import.meta.env.VITE_REACT_APP_API_BASE_URL + "auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorType("internet");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: UserState) => {
        console.log(phone)
        console.log(name)
        dispatch(setUserPhone(phone));
        dispatch(setUserName(name));
        dispatch(setKaspiPhone(phone))
        updateGeneralData(data);
      })
      .catch((error) => {
        if (error === null) setErrorType("server");
        console.error("Error during registration:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    navigate,
    searchParams,
  ]);

  return { user, navigate, errorType, fetchData };
};

export default useMainHook;
