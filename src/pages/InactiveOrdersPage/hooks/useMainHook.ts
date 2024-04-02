import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Orders } from "../../../store/slices/managerSlice.ts";

function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

const fetchOrders = async (telegram_id: number) => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "food/orders/",
    {
      method: "GET",
    },
  );
  const data: Array<Orders> = await response.json();
  console.log("all orders: ", data);
  return data
    .filter((order) => {
      const value =
        order.status === "inactive" &&
        order.client_id === telegram_id &&
        isToday(order.created_at);
      console.log(
        value,
        order.status !== "inactive",
        order.client_id === telegram_id,
        order,
      );
      return value;
    })
    .sort((a, b) => a.id - b.id)
    .map((order) => {
      return { ...order, delivery_name: "" };
    });
};

const useMainHook = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const bot_id = window.Telegram.WebApp?.initDataUnsafe?.user?.id;
    const params_id = searchParams.get("telegram_id");
    const telegram_id = Number(bot_id ? bot_id : params_id);
    fetchOrders(telegram_id).then((data) => {
      console.log("Orders: ", data);
      console.log("telegram_id: ", telegram_id);
      setOrders(data);
    });
  }, []);

  const getLink = (generalLink: string) => {
    const bot_id = window.Telegram.WebApp?.initDataUnsafe?.user?.id;
    const params_id = searchParams.get("telegram_id");
    return bot_id ? generalLink : `${generalLink}?telegram_id=${params_id}`;
  };

  return { navigate, orders, getLink };
};

export default useMainHook;
