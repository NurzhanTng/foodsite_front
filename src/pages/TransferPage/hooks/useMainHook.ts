import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setUser, UserState } from "../../../store/slices/userSlice.ts";
import { useAppSelector } from "../../../store/hooks.ts";
import { setUserData } from "../../../store/slices/orderSlice.ts";

const useMainHook = () => {
  const user = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const bot_id = window.Telegram.WebApp?.initDataUnsafe?.user?.id;
    const params_id = searchParams.get("telegram_id");
    const telegram_id = bot_id ? bot_id : params_id;

    const postData = {
      telegram_id: Number(telegram_id),
      telegram_fullname: "",
      promo: "",
    };

    fetch("https://back.pizzeria-almaty.kz/auth/register/", {
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
        console.log("user ", data)
        data.kaspi_phone = data.phone;
        dispatch(setUser(data));
        dispatch(setUserData(data));
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }, [dispatch, navigate, searchParams]);

  return { user, navigate };
};

export default useMainHook;
