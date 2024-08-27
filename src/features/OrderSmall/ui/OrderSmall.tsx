import { useMemo, useState } from "react";
import Button from "../../../shared/Button.tsx";
import { Orders } from "../../../store/slices/managerSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";
import useManager from "../../../hooks/useManager.ts";
import OrderOneLine from "../../../pages/OrderPage/ui/OrderOneLine.tsx";
import DeliveryUserPopup from "../../Popups/ui/DeliveryUserPopup.tsx";
import { NotificationTimePopup } from "../../Popups";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import timestampToTime from "../../../utils/timestampToTime.ts";
import { useTimer } from "../../../app/context/TimerContext.tsx";
import RejectedTextPopup from "../../Popups/ui/RejectedTextPopup.tsx";

type OrderSmallProps = {
  order: Orders;
  additionalText?: boolean;
};

const OrderSmall = ({ order, additionalText = false }: OrderSmallProps) => {
  const timers = useAppSelector((state) => state.timer.timers);
  const { stopTimer } = useTimer();
  const { statusesText, handleStatusChange } = useManager();
  const navigate = useNavigate();
  const deliveries = useAppSelector((state) => state.manager.deliveries);
  const [open, setOpen] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showRejectedPopup, setShowRejectedPopup] = useState<{
    isShow: boolean;
    order_id: number | null;
  }>({
    isShow: false,
    order_id: null,
  });
  const location = useLocation();
  const company = useAppSelector((state) =>
    state.companies.companies.find((value) => order.company_id === value.id),
  );

  // console.log("location:", location.pathname);

  const isNotificationExist = useMemo(
    () => timers.find((timer) => timer.id === order.id),
    [timers],
  );

  const onNotificationClick = () => {
    if (isNotificationExist !== undefined) {
      stopTimer(order.id);
    } else {
      setShowNotificationPopup(true);
    }
  };

  return (
    <div
      className={`$ my-5 h-fit w-full rounded-[10px] border border-button p-[20px] text-base font-normal leading-none text-white transition-all`}
    >
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
      {showDeliveryPopup && (
        <DeliveryUserPopup
          show={showDeliveryPopup}
          toggleShow={() => setShowDeliveryPopup(!showDeliveryPopup)}
          order={order}
        />
      )}
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={`${open ? "mb-[10px] border-b border-secondary pb-[5px]" : ""} relative flex w-[calc(100vw-80px)] flex-row`}
      >
        <h2 className=" leading-non block text-base font-normal text-white">
          Заказ № {order.id}
        </h2>
        <p
          className={`${additionalText ? "" : "hidden"} my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
        >
          {statusesText[order.status]}
        </p>
        {/*<div className="right-5 top-5" onClick={() => setOpen(!open)}>*/}
        {/*  <Icon type={open ? "close" : "list"} className="h-4 w-4" />*/}
        {/*</div>*/}
      </div>
      {open && (
        <div
          onClick={() =>
            location.pathname !== "/runner" &&
            navigate(`/orders/${order.id}?back_path=${location.pathname}`)
          }
          className="flex w-full flex-col gap-2"
        >
          {company && (
            <OrderOneLine
              className="w-[calc(100vw-80px)] gap-0"
              title="Точка"
              description={company.name}
            />
          )}

          <OrderOneLine
            className="w-[calc(100vw-80px)] gap-0"
            title="Имя клиента"
            description={order.user_name}
          />

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
                : order?.done_time.split(":").slice(0, 2).join(":")
            }
          />

          <OrderOneLine
            className="w-[calc(100vw-80px)] gap-0"
            title="Номер клиента"
            description={order?.phone}
          />

          <OrderOneLine
            className="w-[calc(100vw-80px)] gap-0"
            title="Номер каспи"
            description={order?.kaspi_phone}
          />

          <OrderOneLine
            className="w-[calc(100vw-80px)] gap-0"
            title="Доставка"
            description={
              order?.is_delivery
                ? `${order?.address?.parsed} ${order?.exact_address}`
                : "Самовывоз"
            }
          />

          {location.pathname === "/runner" && order?.is_delivery && (
            <OrderOneLine
              className="w-[calc(100vw-80px)] gap-0"
              title="Доставщик"
              description={
                deliveries.find(
                  (user) => user.telegram_id === order.delivery_id,
                )?.telegram_fullname
              }
            />
          )}

          {order.rating !== null && order.status === "inactive" && (
            <OrderOneLine
              className="w-[calc(100vw-80px)] gap-0"
              title="Оценка"
              description={order.rating}
            />
          )}
        </div>
      )}
      {order.status !== "inactive" &&
        location.pathname !== "/runner" &&
        open && (
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
      {order.status !== "inactive" && order.status !== "on_runner" && open && (
        <Button
          className="mt-5 w-full"
          styleType="outline"
          text={
            order.rejected_text === null
              ? "Указать проблему"
              : `Отклонить заказ: ${order.rejected_text}`
          }
          onClick={() => {
            if (
              typeof order.rejected_text === "string" &&
              order.rejected_text !== ""
            ) {
              handleStatusChange(order, "rejected");
            } else {
              setShowRejectedPopup({ isShow: true, order_id: order.id });
            }
          }}
        />
      )}
      {order.is_delivery &&
        order.address?.lat &&
        ["manager_await", "payment_await"].includes(order?.status) &&
        open && (
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
            onClick={() => setShowDeliveryPopup(true)}
          />
        )}
      {!["inactive"].includes(order.status) && open && (
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
          text={
            order.status !== "on_runner"
              ? "Следующий этап"
              : order.is_delivery
                ? "Отдан курьеру"
                : "Отдан клиенту"
          }
          onClick={() => handleStatusChange(order)}
        />
      )}
    </div>
  );
};

export default OrderSmall;
