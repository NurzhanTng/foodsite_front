import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";
import { fetchOrders } from "../../../store/slices/managerSlice.ts";
import OrderSmall from "../../../features/OrderSmall";

const RunnerMainPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.manager.orders).filter(
    (order) => order.status === "on_runner",
  );

  useEffect(() => {
    const intervalId = setInterval(() => dispatch(fetchOrders()), 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-[20px] px-[20px]">
      {orders.map((order) => (
        <OrderSmall additionalText={true} key={order.id} order={order} />
      ))}
    </div>
  );
};

export default RunnerMainPage;
