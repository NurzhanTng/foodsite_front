import {
  Orders,
  OrderStatuses,
  setOrders,
} from "../store/slices/managerSlice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { useNavigate } from "react-router-dom";

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

const useManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const managerState = useAppSelector((state) => state.manager);

  const handleStatusChange = async (targetOrder: Orders) => {
    navigate("/orders");
    const newOrders = managerState.orders.map((order) => {
      if (order.id !== targetOrder.id) return order;
      const index = statuses.indexOf(order.status);
      const newStatus = statuses.at(index + 1);

      if (newStatus === undefined) return order;
      const newOrder = { ...order, status: newStatus };

      fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL +
          `food/orders/${order.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
    navigate("/orders");
  };

  const changeDeliveryId = async (order: Orders, delivery_id: string) => {
    const currentOrders = managerState.orders;
    const index = currentOrders.findIndex(
      (oldOrder) => oldOrder.id === order.id,
    );
    console.log(index);
    if (index === -1) return;

    fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/${order.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_id: delivery_id,
          user_name: order.user_name,
          phone: order.phone,
          client_id: order.client_id,
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Добавьте здесь код для обработки успешного ответа
      })
      .catch((error) => {
        console.error("Error:", error);
        // Добавьте здесь код для обработки ошибки
      });

    dispatch(
      setOrders(
        currentOrders.map((order, idx) =>
          idx === index
            ? {
                ...order,
                delivery_id: delivery_id,
              }
            : order,
        ),
      ),
    );
  };

  return {
    handleStatusChange,
    changeDeliveryId,
    statuses,
    statusesText,
    statusesTitles,
  };
};

export default useManager;
