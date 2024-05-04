import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  fetchOrders,
  setStatusOpen,
} from "../../../store/slices/managerSlice.ts";
import ManagerHeader from "../../../features/Headers";
import OrderCategory from "../../../widget/OrderCategory.tsx";
import useManager from "../../../hooks/useManager.ts";
import Notifications from "../../../widget/Notifications";
import { useEffect } from "react";
// import { useEffect } from "react";

const ManagerMainPage = () => {
  const manager = useAppSelector((state) => state.manager);
  const dispatch = useAppDispatch();
  const { statuses, statusesTitles } = useManager();

  useEffect(() => {
    const intervalId = setInterval(() => dispatch(fetchOrders()), 5000);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://back.pizzeria-almaty.kz:8001/ws/new_orders/")
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data).order_data;
  //     const orderData: Orders = { ...data, id: data.order_id }
  //     const findOrder = manager.orders.findIndex((order) => order.id === orderData.id)
  //     console.log('ws new order:', orderData)
  //     if (findOrder !== -1) return;
  //     console.log('dispatch new order: ', [...manager.orders, orderData])
  //     dispatch(setOrders([...manager.orders, orderData]))
  //   }
  //   return () => {
  //     ws.close();
  //   };
  // }, [dispatch, manager.orders]);

  return (
    <>
      <Notifications />
      <ManagerHeader />
      <div className="px-5 pt-[80px]">
        {statuses.map((status) => (
          <OrderCategory
            orders={manager.orders
              .filter((order) => order.status === status)
              .sort((a, b) => {
                return (
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
                );
              })}
            key={status}
            open={manager.statusOpen[status]}
            setOpen={(isOpen) =>
              dispatch(
                setStatusOpen({ ...manager.statusOpen, [status]: isOpen }),
              )
            }
            name={statusesTitles[status]}
          />
        ))}
      </div>
    </>
  );
};

export default ManagerMainPage;
