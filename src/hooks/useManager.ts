import { Orders, OrderStatuses, setOrders } from "../store/slices/managerSlice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";


const useManager = () => {
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

  const statusesText = {
    manager_await: "Новый заказ",
    payment_await: "Ожидающий оплаты",
    active: "Активный заказ",
    done: "Приготовленный заказ",
    on_delivery: "Переданный доставщику",
    inactive: "Завершенный заказы",
  };

  const statusesTitles: { [key in OrderStatuses]: string } = {
    manager_await: "Новые заказы",
    payment_await: "Ожидающие оплаты",
    active: "Активные заказы",
    done: "Приготовленные заказы",
    on_delivery: "Переданные доставщику",
    inactive: "Завершенные заказы",
  };

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

  return {
    handleStatusChange,
    statuses,
    statusesText,
    statusesTitles
  }
}

export  default useManager;
