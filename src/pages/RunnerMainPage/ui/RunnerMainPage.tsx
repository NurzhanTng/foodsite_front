import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";
import { fetchOrders } from "../../../store/slices/managerSlice.ts";
import OrderSmall from "../../../features/OrderSmall";

const RunnerMainPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.manager.orders).filter(
    (order) => order.status === "on_runner",
  );
  const companies = useAppSelector((state) => state.user.company_ids);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        dispatch(
          fetchOrders({
            statuses: ["on_runner"],
            company_ids: companies,
          }),
        ),
      5000,
    );
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
