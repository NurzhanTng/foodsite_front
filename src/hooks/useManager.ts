import {
  Orders,
  OrderStatuses,
  setOrders,
} from "../store/slices/managerSlice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
// import { useNavigate } from "react-router-dom";

const statuses: Array<OrderStatuses> = [
  "manager_await",
  "payment_await",
  "active",
  "on_runner",
  "done",
  "on_delivery",
  "inactive",
];

const statusesText = {
  manager_await: "Новый заказ",
  payment_await: "Ожидающий оплаты",
  active: "Активный заказ",
  on_runner: "Выдача заказа",
  done: "Приготовленный заказ",
  on_delivery: "Переданный доставщику",
  inactive: "Завершенный заказы",
  rejected: "",
};

const statusesTitles: { [key in OrderStatuses]: string } = {
  manager_await: "Новые заказы",
  payment_await: "Ожидающие оплаты",
  active: "Активные заказы",
  on_runner: "Выдача заказа",
  done: "Приготовленные заказы",
  on_delivery: "Переданные доставщику",
  inactive: "Завершенные заказы",
  rejected: "",
};

const useManager = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const managerState = useAppSelector((state) => state.manager);

  const handleStatusChange = async (
    targetOrder: Orders,
    changeStatus: OrderStatuses | undefined = undefined,
  ) => {
    // navigate("/orders/search");
    const newOrders = managerState.orders.map((order) => {
      if (order.id !== targetOrder.id) return order;
      const index = statuses.indexOf(order.status);
      let newStatus;
      if (order.status === "manager_await") {
        newStatus = statuses.at(index + 2);
      } else if (order.status === "active") {
        newStatus = statuses.at(index + 2);
      } else if (order.status === "done") {
        if (order.is_delivery) {
          newStatus = statuses.at(index + 1);
        } else {
          newStatus = statuses.at(index + 2);
        }
      } else {
        newStatus = statuses.at(index + 1);
      }

      if (newStatus === undefined) return order;
      const newOrder = {
        ...order,
        status: changeStatus ? changeStatus : newStatus,
      };

      fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL +
        `food/orders/${order.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: changeStatus ? changeStatus : newStatus,
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

  const changeRejectedText = (text: string, order_id: number) => {
    const newOrders = managerState.orders.map((order) => {
      if (order.id !== order_id) return order;
      return { ...order, rejected_text: text };
    });

    const order = managerState.orders.find((order) => order.id === order_id);
    if (order === undefined) return;

    fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/${order.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: order.status,
          rejected_text: text,
          user_name: order.user_name,
          phone: order.phone,
          client_id: order.client_id,
        }),
      },
    )
      .then((data) => data.json())
      .then(console.log)
      .then(() => dispatch(setOrders(newOrders)))
      .catch((e) => console.log("error", e));
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
    changeRejectedText,
    statuses,
    statusesText,
    statusesTitles,
  };
};

export default useManager;
