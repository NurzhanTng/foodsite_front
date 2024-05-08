import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDeliveries, Orders } from "../../../store/slices/managerSlice.ts";
import ManagerHeader from "../../../features/Headers";
import OrderOneLine from "../../OrderPage/ui/OrderOneLine.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import useManager from "../../../hooks/useManager.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import useCart from "../../../hooks/useCart.ts";
import { fetchCategories } from "../../../store/slices/mainSlice.ts";

const DeliveryOrderPage = () => {
  const { order_id } = useParams();
  const { statusesText } = useManager();
  const [order, setOrder] = useState<Orders>();
  const { getProductById } = useCart();
  const deliveries = useAppSelector((state) => state.manager.deliveries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDeliveries());
    fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/${order_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((data) => data.json())
      .then((data) => setOrder(data));
  }, []);

  if (!order) return <div />;

  return (
    <div className="px-5">
      <ManagerHeader leftIconShow={false} rightButtonShow={false} />

      <div
        className={`my-5 mt-[100px] h-fit w-full text-base font-normal leading-none text-white transition-all`}
      >
        <div
          className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
        >
          <h2 className=" leading-non block text-base font-normal text-white">
            Заказ № {order.id}
          </h2>
          <p
            className={`my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
          >
            {
              statusesText[
                order.status === undefined ? "manager_await" : order.status
              ]
            }
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <OrderOneLine
            title="Время оформления"
            description={
              new Date(order.created_at || "")
                .getHours()
                .toString()
                .padStart(2, "0") +
              ":" +
              new Date(order.created_at || "")
                .getMinutes()
                .toString()
                .padStart(2, "0")
            }
          />
          <OrderOneLine
            title="Время готовности"
            description={
              order.done_time === null || order.done_time === "00:00"
                ? "Как можно скорее"
                : order?.done_time
            }
          />
          <OrderOneLine title="Номер клиента" description={order.phone} />
          {order.is_delivery && (
            <OrderOneLine
              title="Доставка"
              description={`${order.address?.parsed} ${order.exact_address}`}
            />
          )}
          <OrderOneLine
            title="Адрес"
            description={
              (order.address?.parsed === undefined
                ? `${order.address?.lat} ${order.address?.long}`
                : order.address?.parsed) + ""
            }
          />
          <OrderOneLine
            title="Доставщик"
            description={
              deliveries.find((user) => user.telegram_id === order.delivery_id)
                ?.telegram_fullname
            }
          />
          <OrderOneLine
            title="Комментарий"
            description={
              order.client_comment === null ? "" : order.client_comment
            }
          />
        </div>
      </div>

      <div
        className={`my-5 h-fit w-full text-base font-normal leading-none text-white transition-all`}
      >
        <div
          className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
        >
          <h2 className=" leading-non block text-base font-normal text-white">
            Оплата
          </h2>
        </div>

        <div className="flex w-full flex-col gap-2">
          <OrderOneLine title="Номер каспи" description={order.kaspi_phone} />

          <OrderOneLine
            title="Стоимость заказа"
            description={order.products.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                (currentValue.price === null ? 0 : currentValue.price)
              );
            }, 0)}
          />
        </div>
      </div>

      <div
        className={`my-5 h-fit w-full text-base font-normal leading-none text-white transition-all`}
      >
        <div
          className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
        >
          <h2 className=" leading-non block text-base font-normal text-white">
            Список блюд
          </h2>
        </div>
        <div className="flex w-full flex-col gap-2">
          {order.products.map((orderProduct) => {
            const product = getProductById(orderProduct.product_id);

            return (
              <div
                key={orderProduct.order_id}
                className="mb-3 flex w-[calc(100vw-40px)] flex-row justify-between gap-3 align-middle"
              >
                <div className="flex flex-col gap-1">
                  <p className="w-full text-sm font-normal leading-none text-fontSecondary">
                    {product?.name}
                  </p>
                  <p className="w-full text-sm font-normal leading-none text-fontSecondary">
                    {
                      product?.modifiers.find(
                        (modifier) =>
                          modifier.id === orderProduct.active_modifier,
                      )?.name
                    }
                  </p>
                  <p className="w-full text-sm font-normal leading-none text-fontSecondary">
                    {orderProduct.additions
                      .map((additionId) =>
                        product?.additions.find(
                          (addition) => addition.id === additionId,
                        ),
                      )
                      .map((addition) => addition?.name)
                      .join(", ")}
                  </p>
                </div>

                <div
                  className={`${(product?.name?.length || 0) < 30 && orderProduct.additions.length === 0 && orderProduct.active_modifier === null ? "flex-row" : "flex-col"} align-right my-auto flex  gap-3`}
                >
                  <p className="text-right text-sm font-normal leading-none text-fontSecondary">
                    {orderProduct.amount} шт.
                  </p>
                  <p className="text-right text-sm font-normal leading-none text-button">
                    {currencyFormatter(
                      orderProduct.price === null ? 0 : orderProduct.price,
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrderPage;
