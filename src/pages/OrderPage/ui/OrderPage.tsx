import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import ManagerHeader from "../../../features/Headers";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";
import OrderOneLine from "./OrderOneLine.tsx";
import useCart from "../../../hooks/useCart.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import DeliveryUserPopup from "../../../features/Popups/ui/DeliveryUserPopup.tsx";
import { NotificationTimePopup } from "../../../features/Popups";
import { useTimer } from "../../../app/context/TimerContext.tsx";
import timestampToTime from "../../../utils/timestampToTime.ts";
import Notifications from "../../../widget/Notifications";
import RejectedTextPopup from "../../../features/Popups/ui/RejectedTextPopup.tsx";
import Loading from "../../TransferPage/ui/Loading.tsx";
import { fetchOrders } from "../../../store/slices/managerSlice.ts";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const { stopTimer } = useTimer();
  const { order_id } = useParams();
  const navigate = useNavigate();
  const timers = useAppSelector((state) => state.timer.timers);
  const deliveries = useAppSelector((state) => state.manager.deliveries);
  const order = useAppSelector((state) =>
    state.manager.orders.find((order) => order.id === Number(order_id)),
  );
  const { handleStatusChange, statusesText } = useManager();
  const { getProductById } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const back_path = searchParams.get("back_path");
  console.log("Order", order);

  const company = useAppSelector((state) =>
    state.companies.companies.find((value) => order?.company_id === value.id),
  );

  const [showRejectedPopup, setShowRejectedPopup] = useState<{
    isShow: boolean;
    order_id: number | null;
  }>({
    isShow: false,
    order_id: null,
  });

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, []);

  useEffect(() => {
    console.log("useEffect", order_id, order);
    let timeout: NodeJS.Timeout | undefined;

    if (!order_id || !order) {
      timeout = setTimeout(() => {
        back_path && navigate(back_path);
      }, 10_000);
    } else if (timeout) {
      clearTimeout(timeout);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [navigate, order, order_id]);

  const isNotificationExist = useMemo(
    () => timers.find((timer) => timer.id === order?.id),
    [timers],
  );

  const onNotificationClick = () => {
    if (isNotificationExist && order) {
      stopTimer(order?.id);
    } else {
      setShowNotificationPopup(true);
    }
  };

  if (!order_id || !order) {
    return <Loading />;
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      {showNotificationPopup && (
        <NotificationTimePopup
          order_id={order.id}
          show={showNotificationPopup}
          toggleShow={() => setShowNotificationPopup(!showNotificationPopup)}
        />
      )}

      {showRejectedPopup.isShow && (
        <RejectedTextPopup
          order_id={showRejectedPopup.order_id}
          show={showRejectedPopup.isShow}
          toggleShow={() =>
            setShowRejectedPopup((value) => {
              return {
                isShow: !value.isShow,
                order_id: value.order_id,
              };
            })
          }
        />
      )}
      <Notifications />
      <div className="mb-[30px] px-5">
        <DeliveryUserPopup
          show={showPopup}
          toggleShow={() => setShowPopup(!showPopup)}
          order={order}
        />

        <ManagerHeader
          leftIconShow={back_path !== null}
          iconOnClick={() => back_path && navigate(back_path)}
        />

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
            {company && (
              <OrderOneLine title="Точка" description={company.name} />
            )}

            <OrderOneLine title="Имя клиента" description={order.user_name} />

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
                  : order.done_time.split(":").slice(0, 2).join(":")
              }
            />
            <OrderOneLine title="Номер клиента" description={order.phone} />
            <OrderOneLine
              title="Доставка"
              description={
                order?.is_delivery
                  ? `${order?.address?.parsed} ${order?.exact_address}`
                  : "Самовывоз"
              }
            />
            {order?.is_delivery && (
              <OrderOneLine
                title="Доставщик"
                description={
                  deliveries.find(
                    (user) => user.telegram_id === order.delivery_id,
                  )?.telegram_fullname
                }
              />
            )}
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
              description={order.products.reduce(
                (accumulator, currentValue) => {
                  return (
                    accumulator +
                    (currentValue.price === null ? 0 : currentValue.price)
                  );
                },
                0,
              )}
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
            {order.products.map((orderProduct, index) => {
              const product = getProductById(orderProduct.product_id);
              // if (product === undefined) return <div key={1}></div>;

              return (
                <div
                  key={index}
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
            <OrderOneLine
              title={"Сумма заказа"}
              description={currencyFormatter(
                order.products.reduce(
                  (accumulatedPrice, product) =>
                    accumulatedPrice +
                    (product.price === null ? 0 : product.price),
                  0,
                ),
              )}
              descriptionClassName="text-button"
            />

            <OrderOneLine
              title={"Бонус"}
              description={
                order.bonus_used && order.bonus_amount !== 0
                  ? currencyFormatter(order.bonus_amount)
                  : "Бонусы не использовались"
              }
              descriptionClassName="text-button"
            />

            {order.is_delivery && (
              <OrderOneLine
                title={"Цена доставки"}
                description={currencyFormatter(order.delivery_price)}
                descriptionClassName="text-button"
              />
            )}

            <OrderOneLine
              title={"Итого к оплате"}
              description={currencyFormatter(
                order.products.reduce(
                  (accumulatedPrice, product) =>
                    accumulatedPrice +
                    (product.price === null ? 0 : product.price),
                  0,
                ) -
                  (order.bonus_used ? order.bonus_amount : 0) +
                  (order.is_delivery ? Number(order.delivery_price) : 0),
              )}
              descriptionClassName="text-button"
            />
          </div>
        </div>

        {order.status !== "inactive" && (
          <Button
            className="mt-5 w-full"
            styleType="outline"
            text={
              isNotificationExist === undefined
                ? "Создать напоминание"
                : `Удалить напоминание в ${timestampToTime(isNotificationExist.endTimestamp)}`
            }
            onClick={onNotificationClick}
          />
        )}

        {order.status !== "inactive" && (
          <Button
            className="mt-5 w-full"
            styleType="outline"
            text={
              order.rejected_text === null
                ? "Указать проблему"
                : `Отклонить заказ: ${order.rejected_text}`
            }
            onClick={async () => {
              if (
                typeof order.rejected_text === "string" &&
                order.rejected_text !== ""
              ) {
                await handleStatusChange(order, "rejected");
                back_path && navigate(back_path);
              } else {
                setShowRejectedPopup({ isShow: true, order_id: order.id });
              }
            }}
          />
        )}

        {order.is_delivery &&
          order.address?.lat &&
          ["manager_await", "payment_await"].includes(order?.status) && (
            <Button
              className="mt-5 w-full"
              styleType="outline"
              text={
                order.delivery_id === null
                  ? "Назначить доставщика"
                  : `Изменить доставщика (${
                      deliveries.find(
                        (user) => user.telegram_id === order.delivery_id,
                      )?.telegram_fullname
                    })`
              }
              onClick={() => setShowPopup(true)}
            />
          )}

        {!["inactive"].includes(order.status) && (
          <Button
            disabled={
              order.is_delivery &&
              order.delivery_id === null &&
              order.status === "payment_await"
            }
            className="mt-5 w-full"
            styleType={
              order.is_delivery &&
              order.delivery_id === null &&
              order.status === "payment_await"
                ? "inactive"
                : "outline"
            }
            text="Следующий этап"
            onClick={async () => {
              await handleStatusChange(order);
              if (back_path) {
                navigate(back_path);
              } else {
                const tg = window.Telegram.WebApp;
                tg.close();
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default OrderPage;
