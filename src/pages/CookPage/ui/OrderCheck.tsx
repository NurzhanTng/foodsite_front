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
  const [isDone, setIsDone] = useState<
    { product_id: number; value: boolean }[]
  >(
    order.products.map((product) => {
      return { product_id: product.product_id, value: false };
    }),
  );

  const toggleIsDone = (order_id: number) => {
    setIsDone((oldData) =>
      oldData.map((value) => {
        return {
          product_id: value.product_id,
          value: value.product_id === order_id ? !value.value : value.value,
        };
      }),
    );
  };

  const onOrderDone = async (order: Orders) => {
    console.log("fetch");
    await handleStatusChange(order);
  };

  return (
    <div className="mb-8 w-[calc(100vw-40px)] min-w-[280px] max-w-[380px] lg:w-full">
      <h2 className=" leading-non mb-5 block text-base font-normal text-white">
        Заказ № {order.id}
      </h2>

      {order.products.map((product) => {
        return (
          <OrderProduct
            {...product}
            value={
              isDone.find((value) => value.product_id === product.product_id)
                ?.value
            }
            onClick={() => toggleIsDone(product.product_id)}
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
        onClick={() => onOrderDone(order)}
      />
    </div>
  );
};

export default OrderCheck;
