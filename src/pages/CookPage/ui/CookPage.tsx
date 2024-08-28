import { fetchOrders, Orders } from "../../../store/slices/managerSlice.ts";
import OrderCheck from "./OrderCheck.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect, useState } from "react";
import soundFile from "../../../data/audio/message_sound.mp3";

const CookPage = () => {
  const dispatch = useAppDispatch();
  const orders: Orders[] = useAppSelector((state) => state.manager.orders);
  const companies = useAppSelector((state) => state.user.company_ids);
  const [oldOrders, setOldOrders] = useState(orders);
  const audio = new Audio(soundFile);

  useEffect(() => {
    alert(companies);
    const intervalId = setInterval(
      () =>
        dispatch(
          fetchOrders({
            statuses: ["active"],
            company_ids: companies,
          }),
        ),
      5000,
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (oldOrders.length < orders.length) {
      audio.play();
      setOldOrders(orders);
    } else {
      setOldOrders(orders);
    }
  }, [orders]);

  return (
    <div
      className={
        "flex h-[100vh] max-h-[100vh] flex-col flex-wrap gap-8 overflow-y-hidden p-4"
      }
    >
      {orders.map((order) => {
        return <OrderCheck key={order.id} order={order} />;
      })}
    </div>
  );
};

export default CookPage;
