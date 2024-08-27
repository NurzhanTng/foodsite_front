import { fetchOrders, OrderStatuses } from "../../../store/slices/managerSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import OrderSmall from "../../../features/OrderSmall";
import Notifications from "../../../widget/Notifications";
import { useEffect } from "react";

export type FilterState = {
  searchTerm: "id" | "phone";
  termValue: string;
  searchStatuses: OrderStatuses[];
};

const OrderSearchPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.manager.orders).filter(
    (order) =>
      order.status === "manager_await" || order.status === "payment_await",
  );
  const companies = useAppSelector((state) => state.user.company_ids);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        dispatch(
          fetchOrders({
            statuses: ["manager_await", "payment_await"],
            company_ids: companies,
          }),
        ),
      5000,
    );
    return () => clearInterval(intervalId);
  }, []);

  // const [showPopup, setShowPopup] = useState<boolean>(false);
  //
  // const [filter, setFilter] = useState<FilterState>({
  //   searchTerm: "phone",
  //   termValue: "",
  //   searchStatuses: [
  //     "manager_await",
  //     "payment_await",
  //     "active",
  //     "done",
  //     "on_delivery",
  //     "inactive",
  //   ],
  // });

  // const filteredOrders = useMemo(
  //   () => orders.filter((order) => filterOrder(order, filter)),
  //   [orders, filter],
  // );

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     "ws://back.pizzeria-almaty.kz:8001/ws/new_orders/",
  //   );
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data).order_data;
  //     const orderData: Orders = { ...data, id: data.order_id };
  //     const findOrder = manager.orders.findIndex(
  //       (order) => order.id === orderData.id,
  //     );
  //     console.log("ws new order:", orderData);
  //     if (findOrder !== -1) return;
  //     console.log("dispatch new order: ", [...manager.orders, orderData]);
  //     dispatch(setOrders([...manager.orders, orderData]));
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, [dispatch, manager.orders]);

  return (
    <div>
      <Notifications />
      <div className="mt-[20px] px-[20px]">
        {orders.map((order) => (
          <OrderSmall additionalText={true} key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderSearchPage;
