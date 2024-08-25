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

  const checkIsNeededToAdd = async () => {
    return true;
  };

  const temporaryActionAdd = async (data: UserState) => {
    if (data.promo !== "7pQk4Vx9Lm28NwsB3rZj") {
      console.log("promo is bad");
      return;
    }
    if (!(await checkIsNeededToAdd())) return;

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

  const updateGeneralData = async (data: UserState) => {
    dispatch(fetchCategories());
    dispatch(setUser(data));
    dispatch(setUserData(data));
    console.log("User: ", data);

    if (data.role === "client") {
      updateLoginTime();
      await temporaryActionAdd(data);
      dispatch(fetchCompanies());
      navigate("/menu");
    } else if (data.role === "manager") {
      dispatch(fetchOrders({}));
      dispatch(fetchDeliveries());
      navigate("/orders/search");
    } else if (data.role === "cook") {
      dispatch(fetchOrders({}));
      dispatch(fetchDeliveries());
      navigate("/cook");
    } else if (data.role === "runner") {
      dispatch(fetchOrders({}));
      dispatch(fetchDeliveries());
      navigate("/runner");
    } else if (data.role === "admin") {
      dispatch(fetchOrders({}));
      dispatch(fetchDeliveries());
      navigate("/orders");
    } else {
      setErrorType("bad request");
    }
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
