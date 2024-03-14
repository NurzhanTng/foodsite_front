import { Orders } from "../../../pages/ManagerMainPage/mainHook.ts";
import { useState } from "react";
import Button from "../../../shared/Button.tsx";

type OrderSmallProps = {
  order: Orders;
  additionalText?: boolean;
  NextStep: (order: Orders) => void;
};

const text = {
  manager_await: "Новый заказ",
  payment_await: "Ожидающий оплаты",
  active: "Активный заказ",
  done: "Приготовленный заказ",
  on_delivery: "Переданный доставщику",
  inactive: "Завершенный заказы",
};

const OrderSmall = ({ order, additionalText = false, NextStep }: OrderSmallProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`$ mt-5 h-fit w-full rounded-[10px] border border-button p-[20px] text-base font-normal leading-none text-white transition-all`}
    >
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={`${open ? "mb-[10px] border-b border-secondary py-[5px]" : ""} relative flex w-[calc(100vw-80px)] flex-row`}
      >
        <h2 className=" leading-non block text-base font-normal text-white">
          Заказ № {order.id}
        </h2>
        <p
          className={`${additionalText ? "" : "hidden"} my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
        >
          {text[order.status]}
        </p>
        {/*<div className="right-5 top-5" onClick={() => setOpen(!open)}>*/}
        {/*  <Icon type={open ? "close" : "list"} className="h-4 w-4" />*/}
        {/*</div>*/}
      </div>

      {open && (
        <div className="flex w-full flex-col gap-2">
          <div className=" flex w-[calc(100vw-80px)] flex-row  justify-between">
            <p className="w-full text-sm font-normal leading-none text-fontSecondary">
              Время оформления
            </p>
            <p className="text-sm font-normal leading-none text-fontSecondary">
              {order.order_time}
            </p>
          </div>

          <div className=" flex w-[calc(100vw-80px)] flex-row  justify-between">
            <p className="w-full text-sm font-normal leading-none text-fontSecondary">
              Время готовности
            </p>
            <p className="text-sm font-normal leading-none text-fontSecondary">
              {order.done_time}
            </p>
          </div>

          <div className=" flex w-[calc(100vw-80px)] flex-row  justify-between">
            <p className="w-full text-sm font-normal leading-none text-fontSecondary">
              Номер клиента
            </p>
            <p className="text-sm font-normal leading-none text-fontSecondary">
              {order.phone}
            </p>
          </div>

          <div className=" flex w-[calc(100vw-80px)] flex-row  justify-between">
            <p className="w-full text-sm font-normal leading-none text-fontSecondary">
              Доставка
            </p>
            <p className="text-sm font-normal leading-none text-fontSecondary">
              {order.is_delivery ? "Да" : "Нет"}
            </p>
          </div>

          {order.is_delivery && (
            <div className=" flex w-[calc(100vw-80px)] flex-row  justify-between">
              <p className="text-sm font-normal leading-none text-fontSecondary">
                Адрес
              </p>
              <p className="w-full text-right text-sm font-normal leading-none text-fontSecondary">
                {order?.address?.parsed} {order?.exact_address}
              </p>
            </div>
          )}
        </div>
      )}

      {(order.status !== "inactive" && open) && <Button className="mt-5 w-full" styleType="outline" text="Следующий этап" onClick={() => NextStep(order)} />}
    </div>
  );
};

export default OrderSmall;
