import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks.ts";
import ManagerHeader from "../../../features/Headers";
import { useEffect } from "react";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";
import OrderOneLine from "./OrderOneLine.tsx";
import useCart from "../../../hooks/useCart.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";

const text = {
  manager_await: "Новый заказ",
  payment_await: "Ожидающий оплаты",
  active: "Активный заказ",
  done: "Приготовленный заказ",
  on_delivery: "Переданный доставщику",
  inactive: "Завершенный заказы",
};

const OrderPage = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const order = useAppSelector((state) =>
    state.manager.orders.find((order) => order.id === Number(order_id)),
  );
  const { handleStatusChange } = useManager();
  const { getProductById } = useCart();

  useEffect(() => {
    // console.log(order);
    if (order_id === undefined || order === undefined) {
      navigate("/orders");
      return;
    }
  }, [navigate, order, order_id]);

  return (
    <div className="px-5">
      <ManagerHeader
        leftIconShow={true}
        iconOnClick={() => navigate("/orders")}
      />

      <div
        className={`my-5 mt-[100px] h-fit w-full text-base font-normal leading-none text-white transition-all`}
      >
        <div
          className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
        >
          <h2 className=" leading-non block text-base font-normal text-white">
            Заказ № {order?.id}
          </h2>
          <p
            className={`my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
          >
            {
              text[
                order?.status === undefined ? "manager_await" : order?.status
              ]
            }
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <OrderOneLine
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
            title="Время готовности"
            description={
              order?.done_time === null || order?.done_time === "00:00"
                ? "Как можно скорее"
                : order?.done_time
            }
          />
          <OrderOneLine title="Номер клиента" description={order?.phone} />
          {order?.is_delivery && (
            <OrderOneLine
              title="Доставка"
              description={`${order?.address?.parsed} ${order?.exact_address}`}
            />
          )}
          <OrderOneLine
            title="Адрес"
            description={
              order?.address?.parsed === undefined
                ? `${order?.address?.lat} ${order?.address?.long}`
                : order?.address?.parsed
            }
          />
          <OrderOneLine title="Доставщик" description={order?.delivery_name} />
          <OrderOneLine
            title="Комментарий"
            description={
              order?.client_comment === null ? "" : order?.client_comment
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
          <OrderOneLine title="Номер каспи" description={order?.phone} />

          <OrderOneLine
            title="Стоимость заказа"
            description={order?.products.reduce((accumulator, currentValue) => {
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
          {order?.products.map((orderProduct) => {
            const product = getProductById(orderProduct.product_id);
            if (product === undefined) return <div></div>;

            return (
              <div
                key={orderProduct.order_id}
                className="mb-3 flex w-[calc(100vw-40px)] flex-row justify-between gap-3 align-middle"
              >
                <div className="flex flex-col gap-1">
                  <p className="w-full text-sm font-normal leading-none text-fontSecondary">
                    {product.name}
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
                  className={`${product.name.length < 30 && orderProduct.additions.length === 0 && orderProduct.active_modifier === null ? "flex-row" : "flex-col"} align-right my-auto flex  gap-3`}
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

      {order?.status !== "inactive" && (
        <Button
          className="mt-5 w-full"
          styleType="outline"
          text="Следующий этап"
          onClick={() => order !== undefined && handleStatusChange(order)}
        />
      )}
    </div>
  );
};

export default OrderPage;
