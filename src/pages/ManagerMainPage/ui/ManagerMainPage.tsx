import useMainHook, { Orders, OrderStatuses } from "../mainHook.ts";
import Header from "../../../entities/Header.tsx";
import SelectCard from "../../../entities/SelectCard.tsx";
import Icon from "../../../shared/Icon";
import { useState } from "react";
import OrderSmall from "../../../features/OrderSmall/ui/OrderSmall.tsx";

const ManagerMainPage = () => {
  const { orders, setOrders } = useMainHook();
  const [showManagerAwait, setShowManagerAwait] = useState(false);
  const [showPaymentAwait, setShowPaymentAwait] = useState(false);
  const [showActive, setActive] = useState(false);
  const [showDone, setDone] = useState(false);
  const [showOnDelivery, setOnDelivery] = useState(false);
  const [showInactive, setInactive] = useState(false);

  const NextStep = (order: Orders) => {
    const statuses: Array<OrderStatuses> = [
      "manager_await",
      "payment_await",
      "active",
      "done",
      "on_delivery",
      "inactive",
    ];

    setOrders((orders) => {
      const oldOrders = orders;
      for (let i = 0; i < oldOrders.length; i++) {
        if (oldOrders[i].id === order.id) {
          const index = statuses.indexOf(oldOrders[i].status)
          oldOrders[i].status = statuses[index + 1]
        }
      }
      return oldOrders;
    });
  };

  return (
    <div className="px-5 pt-[80px]">
      <Header>
        <p className="mt-4 h-max text-center text-xl font-medium leading-loose text-white ">
          Заказы
        </p>
      </Header>

      <SelectCard
        onClick={() => setShowManagerAwait(!showManagerAwait)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Новые заказы"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "manager_await").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showManagerAwait ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showManagerAwait &&
        orders
          .filter((order) => order.status === "manager_await")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}

      <SelectCard
        onClick={() => setShowPaymentAwait(!showPaymentAwait)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Ожидающие оплаты"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "payment_await").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showPaymentAwait ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showPaymentAwait &&
        orders
          .filter((order) => order.status === "payment_await")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}

      <SelectCard
        onClick={() => setActive(!showActive)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Активные заказы"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "active").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showActive ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showActive &&
        orders
          .filter((order) => order.status === "active")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}

      <SelectCard
        onClick={() => setDone(!showDone)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Приготовленные заказы"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "done").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showDone ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showDone &&
        orders
          .filter((order) => order.status === "done")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}

      <SelectCard
        onClick={() => setOnDelivery(!showOnDelivery)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Переданные доставщику"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "on_delivery").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showOnDelivery ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showOnDelivery &&
        orders
          .filter((order) => order.status === "on_delivery")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}

      <SelectCard
        onClick={() => setInactive(!showInactive)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name="Завершенные заказы"
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.filter((order) => order.status === "inactive").length}
        </div>
        <Icon
          className="my-auto h-5 w-5"
          type={showInactive ? "list" : "arrowDown"}
        />
      </SelectCard>
      {showInactive &&
        orders
          .filter((order) => order.status === "inactive")
          .map((order) => <OrderSmall NextStep={NextStep} key={order.id} order={order} />)}
    </div>
  );
};

export default ManagerMainPage;
