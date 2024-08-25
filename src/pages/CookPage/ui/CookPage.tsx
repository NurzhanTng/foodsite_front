import { fetchOrders, Orders } from "../../../store/slices/managerSlice.ts";
import OrderCheck from "./OrderCheck.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";

const CookPage = () => {
  const dispatch = useAppDispatch();

  const orders: Orders[] = useAppSelector(
    (state) => state.manager.orders,
  ).filter((order) => order.status === "active");

  useEffect(() => {
    const intervalId = setInterval(() => dispatch(fetchOrders({})), 5000);
    return () => clearInterval(intervalId);
  }, []);

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
