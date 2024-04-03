import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { setUser, UserState } from "../../../store/slices/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { setUserData } from "../../../store/slices/orderSlice.ts";
import { fetchCategories } from "../../../store/slices/mainSlice.ts";
import { fetchCompanies } from "../../../store/slices/companySlice.ts";
import { fetchDeliveries, fetchOrders } from "../../../store/slices/managerSlice.ts";

const useMainHook = () => {
  const user = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("--- useMainHook ---")
    const bot_id = window.Telegram.WebApp?.initDataUnsafe?.user?.id;
    const params_id = searchParams.get("telegram_id");
    const telegram_id = bot_id ? bot_id : params_id;

    const postData = {
      telegram_id: telegram_id,
      telegram_fullname: "",
      promo: "",
    };

    console.log("postData", postData);

    fetch(import.meta.env.VITE_REACT_APP_API_BASE_URL + "auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: UserState) => {
        console.log("User: ", data)
        // data.kaspi_phone = data.phone;
        dispatch(fetchCategories());
        dispatch(fetchCompanies());
        dispatch(setUser(data));
        dispatch(setUserData(data));
        if (data.role === "client") {
          navigate("/menu");
        } else if (data.role === "manager") {
          dispatch(fetchOrders());
          dispatch(fetchDeliveries());
          navigate("/orders");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }, [dispatch, navigate, searchParams]);

  return { user, navigate };
};

export default useMainHook;
