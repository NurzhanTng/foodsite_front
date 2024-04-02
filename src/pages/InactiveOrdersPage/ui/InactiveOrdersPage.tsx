import useMainHook from "../hooks/useMainHook.ts";
import Header from "../../../entities/Header.tsx";
import OrderOneLine from "../../OrderPage/ui/OrderOneLine.tsx";
import { useEffect, useState } from "react";
import useManager from "../../../hooks/useManager.ts";
import Button from "../../../shared/Button.tsx";
import { Orders } from "../../../store/slices/managerSlice.ts";
import { useAppDispatch } from "../../../store/hooks.ts";
import { fetchCategories, setCart } from "../../../store/slices/mainSlice.ts";
import { fetchCompanies } from "../../../store/slices/companySlice.ts";
import useCart from "../../../hooks/useCart.ts";
import { setUserData } from "../../../store/slices/orderSlice.ts";
import { setClientOrder } from "../../../store/slices/clientOrderSlice.ts";

const InactiveOrdersPage = () => {
  const { orders, navigate, getLink } = useMainHook();
  const {getProductById} = useCart();
  const { statusesText } = useManager();
  const [ordersVisible, setOrdersVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
    setOrdersVisible(
      orders.reduce(
        (
          acc: {
            [key: number]: boolean;
          },
          order,
        ) => {
          acc[order.id] = false;
          return acc;
        },
        {},
      ),
    );
  }, [orders]);

  const handleRepeatButton = (order: Orders) => {
    console.log("handleRepeatButton", order)
    dispatch(setCart(order.products.map(order => {
      const product = getProductById(order.product_id);
      const additions = product?.additions.filter((addition => order.additions.includes(addition.id) ))
      console.log({
        product: product,
        active_modifier: order.active_modifier,
        additions: additions === undefined ? [] : additions,
        amount: order.amount,
        client_comment: order.client_comment,
      })

      return {
        product: product,
        active_modifier: order.active_modifier,
        additions: additions === undefined ? [] : additions,
        amount: order.amount,
        client_comment: order.client_comment,
      }
    })))
    dispatch(setUserData({
      telegram_id: order.client_id,
      telegram_fullname: order.user_name,
      phone: order.phone,
      kaspi_phone: order.kaspi_phone,
      bonus: 0,
      address: order.address,
      exact_address: order.exact_address
    }))
    navigate(`/?telegram_id=${order.client_id}`)
  }

  const handleOpenButton = (order: Orders) => {
    dispatch(setClientOrder({ order: order, from: getLink("/history_orders") }))
    navigate('/client_order')
  };

  return (
    <div>
      <Header className="flex h-[50px] flex-row justify-between gap-3 px-5 text-center">
        <p className="mx-auto my-auto h-fit">Pizzeria Almaty</p>
      </Header>
      <div className="mt-[80px] px-[20px]">
        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className={`shadow-card my-5 h-fit w-full rounded-[10px] border border-button p-[20px] text-base font-normal leading-none text-white transition-all`}
            >
              <div
                onClick={() => {
                  const ordersNewVisible = { ...ordersVisible };
                  ordersNewVisible[order.id] = !ordersNewVisible[order.id];
                  console.log(
                    `${order.id} order click ${ordersNewVisible[order.id]}`
                  );
                  setOrdersVisible(ordersNewVisible);
                }}
                className={`${ordersVisible[order.id] ? "mb-[10px] border-b border-secondary pb-[5px]" : ""} relative flex w-[calc(100vw-80px)] flex-row`}
              >
                <h2 className=" leading-non block text-base font-normal text-white">
                  Заказ № {order.id}
                </h2>
                <p
                  className={`my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
                >
                  {statusesText[order.status]}
                </p>
                {/*<div className="right-5 top-5" onClick={() => setOpen(!open)}>*/}
                {/*  <Icon type={open ? "close" : "list"} className="h-4 w-4" />*/}
                {/*</div>*/}
              </div>

              {ordersVisible[order.id] && (
                <div
                  // onClick={() => navigate(`/orders/${order.id}`)}
                  className="flex w-full flex-col gap-2"
                >
                  <OrderOneLine
                    className="w-[calc(100vw-80px)] gap-0"
                    title="Время оформления"
                    description={
                      new Date(order?.created_at || "")
                        .getHours()
                        .toString()
                        .padStart(2, "0") +
                      ":" +
                      new Date(order?.created_at || "")
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")
                    }
                  />

                  <OrderOneLine
                    className="w-[calc(100vw-80px)] gap-0"
                    title="Время готовности"
                    description={
                      order?.done_time === null || order?.done_time === "00:00"
                        ? "Как можно скорее"
                        : order?.done_time
                    }
                  />

                  <OrderOneLine
                    className="w-[calc(100vw-80px)] gap-0"
                    title="Номер клиента"
                    description={order?.phone}
                  />

                  {order?.is_delivery && (
                    <OrderOneLine
                      className="w-[calc(100vw-80px)] gap-0"
                      title="Доставка"
                      description={`${order?.address?.parsed} ${order?.exact_address}`}
                    />
                  )}

                  <OrderOneLine
                    className="w-[calc(100vw-80px)] gap-0"
                    title="Адрес"
                    description={
                      order?.address?.parsed === undefined
                        ? `${order?.address?.lat} ${order?.address?.long}`
                        : order?.address?.parsed
                    }
                  />
                </div>
              )}

              {ordersVisible[order.id] && (
                <Button
                  className="mt-5 w-full"
                  styleType="outline"
                  text="Повторить"
                  onClick={() => handleRepeatButton(order)}
                />
              )}

              {ordersVisible[order.id] && (
                <Button
                  className="mt-5 w-full"
                  styleType="outline"
                  text="Открыть"
                  onClick={() => handleOpenButton(order)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InactiveOrdersPage;
