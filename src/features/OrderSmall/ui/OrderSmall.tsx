import { useMemo, useState } from "react";
import Button from "../../../shared/Button.tsx";
import { Orders } from "../../../store/slices/managerSlice.ts";
import { useNavigate } from "react-router-dom";
import useManager from "../../../hooks/useManager.ts";
import OrderOneLine from "../../../pages/OrderPage/ui/OrderOneLine.tsx";
import DeliveryUserPopup from "../../Popups/ui/DeliveryUserPopup.tsx";
import { NotificationTimePopup } from "../../Popups";
import { useAppSelector } from "../../../store/hooks.ts";
import timestampToTime from "../../../utils/timestampToTime.ts";
import { useTimer } from "../../../app/context/TimerContext.tsx";

type OrderSmallProps = {
  order: Orders;
  additionalText?: boolean;
};

const OrderSmall = ({ order, additionalText = false }: OrderSmallProps) => {
  const timers = useAppSelector((state) => state.timer.timers);
  const { stopTimer } = useTimer();
  const { statusesText, handleStatusChange } = useManager();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

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
          onClick={() => navigate(`/orders/${order.id}`)}
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
      {order.status !== "inactive" && open && (
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
      {order.address?.lat && order?.status !== "inactive" && open && (
        <Button
          className="mt-5 w-full"
          styleType="outline"
          text="Назначить доставщика"
          onClick={() => setShowDeliveryPopup(true)}
        />
      )}
      {order.status !== "inactive" && open && (
        <Button
          className="mt-5 w-full"
          styleType="outline"
          text="Следующий этап"
          onClick={() => handleStatusChange(order)}
        />
      )}
    </div>
  );
};

export default OrderSmall;
