import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice.ts";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks.ts";

const TransferPage = () => {
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
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }, [dispatch, navigate, searchParams]);

  useEffect(() => {
    // if (user.role === "client") {
    //   navigate("/menu");
    // } else if (user.role === "manager") {
    //   navigate("/orders");
    // }
  }, [navigate, user]);

  return <div>{JSON.stringify(window.Telegram.WebApp, null, 10)}</div>;
};

export default TransferPage;
