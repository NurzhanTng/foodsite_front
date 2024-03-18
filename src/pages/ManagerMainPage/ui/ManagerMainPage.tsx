import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  OrderStatuses,
  Orders,
  setOrders,
} from "../../../store/slices/managerSlice.ts";
import ManagerHeader from "../../../features/Headers";
import OrderCategory from "../../../widget/OrderCategory.tsx";

const ManagerMainPage = () => {
  const manager = useAppSelector((state) => state.manager);
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.manager.orders);

  const statuses: Array<OrderStatuses> = [
    "manager_await",
    "payment_await",
    "active",
    "done",
    "on_delivery",
    "inactive",
  ];

  const statusNames: { [key in OrderStatuses]: string } = {
    manager_await: "Новые заказы",
    payment_await: "Ожидающие оплаты",
    active: "Активные заказы",
    done: "Приготовленные заказы",
    on_delivery: "Переданные доставщику",
    inactive: "Завершенные заказы",
  };

  const [statusOpen, setStatusOpen] = useState<{
    [key in OrderStatuses]: boolean;
  }>({
    manager_await: false,
    payment_await: false,
    active: false,
    done: false,
    on_delivery: false,
    inactive: false,
  });

  const handleStatusChange = async (targetOrder: Orders) => {
    const newOrders = orders.map((order) => {
      if (order.id !== targetOrder.id) return order;
      const index = statuses.indexOf(order.status);
      const newStatus = statuses.at(index + 1);
      if (newStatus === undefined) return order;
      const newOrder = { ...order, status: newStatus };
      fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL +
          `food/orders/${order.id}/`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json", // Indicates JSON content in the request body
          },
          body: JSON.stringify({
            status: statuses[index + 1],
            user_name: order.user_name,
            phone: order.phone,
            client_id: order.client_id,
          }),
        },
      );
      return newOrder;
    });

    dispatch(setOrders(newOrders));
  };

  return (
    <div className="px-5 pt-[80px]">
      <ManagerHeader />

      {statuses.map((status) => (
        <OrderCategory
          orders={manager.orders.filter((order) => order.status === status)}
          key={status}
          open={statusOpen[status]}
          setOpen={(isOpen) =>
            setStatusOpen({ ...statusOpen, [status]: isOpen })
          }
          nextStep={handleStatusChange}
          name={statusNames[status]}
        />
      ))}
    </div>
  );
};

export default ManagerMainPage;
