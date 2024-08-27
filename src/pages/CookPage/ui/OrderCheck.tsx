import { Orders } from "../../../store/slices/managerSlice.ts";
import OrderProduct from "./OrderProduct.tsx";
import { useState } from "react";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";

type OrderCheckProps = {
  order: Orders;
};

const OrderCheck = ({ order }: OrderCheckProps) => {
  const { handleStatusChange } = useManager();
  const [isDone, setIsDone] = useState<{ index: number; value: boolean }[]>(
    order.products.map((_, index) => {
      return { index: index, value: false };
    }),
  );

  const toggleIsDone = (order_id: number) => {
    setIsDone((oldData) =>
      oldData.map((value, index) => {
        return {
          index: index,
          value: index === order_id ? !value.value : value.value,
        };
      }),
    );
  };

  return (
    <div className="mb-8 w-[calc(100vw-40px)] min-w-[280px] max-w-[380px] lg:w-full">
      <h2 className=" leading-non mb-5 block text-base font-normal text-white">
        Заказ № {order.id}
      </h2>

      {order.products.map((product, index) => {
        return (
          <OrderProduct
            {...product}
            value={isDone.find((value) => value.index === index)?.value}
            onClick={() => toggleIsDone(index)}
          />
        );
      })}

      {order.client_comment !== null && order.client_comment !== "" && (
        <div className="rounded-[5px] bg-bgColor2 p-[10px] text-sm font-normal text-textSecondary">
          {order.client_comment}
        </div>
      )}

      <Button
        disabled={!isDone.every((value) => value.value)}
        className="mt-5 w-full"
        styleType={
          isDone.every((value) => value.value) ? "outline" : "inactive"
        }
        text="Следующий этап"
        onClick={() => handleStatusChange(order)}
      />
    </div>
  );
};

export default OrderCheck;
