import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { setUser, UserState } from "../../../store/slices/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { setUserData } from "../../../store/slices/orderSlice.ts";
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

const useMainHook = () => {
  const user = useAppSelector((state) => state.user);
  const main = useAppSelector((state) => state.main);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorType, setErrorType] = useState<
    "internet" | "unauthorised" | "server" | "bad request" | null
  >(null);

  const updateLoginTime = () => {
    // const lastLogin = main.lastLogin;
    // const now = new Date();
    // const diffInMilliseconds = Math.abs(
    //   now.getTime() - new Date(lastLogin).getTime(),
    // );
    // if (Math.floor(diffInMilliseconds / (1000 * 60)) > 30) {
    //   dispatch(setCart([]));
    // }
    dispatch(setLoginTime(new Date().toISOString()));
  };

  const checkIsNeededToAdd = async (telegram_id: string) => {
    const response = await fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL +
        `service/check-user-id/?user_id=${telegram_id}`,
      {
        method: "GET",
      },
    );
    const data: { exists: boolean } = await response.json();
    return !data.exists;
  };

  const temporaryActionAdd = async (data: UserState) => {
    if (data.promo !== "7pQk4Vx9Lm28NwsB3rZj") {
      console.log("promo is bad");
      return;
    }
    if (!(await checkIsNeededToAdd(data.telegram_id))) return;

    for (const category of main.categories) {
      const product = category.products.find((prod) => prod.id === 1);

      if (product === undefined) continue;

      dispatch(
        setCart([
          {
            product: product,
            active_modifier: null,
            additions: [],
            amount: 1,
            price: 0,
            client_comment: "",
          },
        ]),
      );
    }
  };

  const getUserCompanies = async (user_id: string) => {
    console.log(user_id);
    return [3, 4];
  };

  const updateGeneralData = async (data: UserState) => {
    dispatch(fetchCategories());
    dispatch(setUser(data));
    dispatch(setUserData(data));
    console.log("User: ", data);
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

    if (data.role === "client") {
      updateLoginTime();
      await temporaryActionAdd(data);
      dispatch(fetchCompanies());
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
      const companies = await getUserCompanies(data.telegram_id);
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
    const bot_id = window.Telegram.WebApp?.initDataUnsafe?.user?.id;
    const params_id = searchParams.get("telegram_id");
    const telegram_id = bot_id ? bot_id : params_id;

    if (telegram_id === null) {
      setErrorType("unauthorised");
      return;
    }

    const postData = {
      telegram_id: `${telegram_id}`,
      telegram_fullname: "-|- error -|- error -|-",
      promo: "",
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
    window.Telegram.WebApp?.initDataUnsafe?.user?.id,
  ]);

  return { user, navigate, errorType, fetchData };
};

export default useMainHook;
