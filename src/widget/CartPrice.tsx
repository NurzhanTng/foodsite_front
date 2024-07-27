import { useAppSelector } from "../store/hooks/hooks.ts";
import { twMerge } from "tailwind-merge";
import SelectCard from "../entities/SelectCard.tsx";
import currencyFormatter from "../utils/currencyFormatter.ts";
import useCart from "../hooks/useCart.ts";
// import { useState } from "react";

type CartPriceProps = {
  className?: string;
};

const CartPrice = ({ className = "" }: CartPriceProps) => {
  const { sumCurrency } = useCart();
  const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);

  const cartPrice = sumCurrency(state.cart);
  const bonusAmount = -Math.min(cartPrice, orderState.max_bonus);
  const deliveryAmount = orderState.delivery_amount
    ? orderState.delivery_amount
    : 0;

  // const [cartPrice, setCartPrice] = useState(sumCurrency(state.cart));
  // const [bonusAmount, setBonusAmount] = useState(Math.min(cartPrice, orderState.max_bonus));

  return (
    <div className={twMerge("mb-[40px]", className)}>
      <h3 className="mb-[10px] text-base font-medium text-textSecondary">
        Сумма заказа
      </h3>

      <SelectCard borderBottom={true} name="Ваш заказ">
        {currencyFormatter(cartPrice)}
      </SelectCard>

      {orderState.bonus_used && (
        <SelectCard borderBottom={true} name="Бонус">
          {currencyFormatter(bonusAmount)}
        </SelectCard>
      )}

      {orderState.isDelivery && (
        <SelectCard borderBottom={true} name="Цена доставки">
          {currencyFormatter(deliveryAmount)}
        </SelectCard>
      )}

      <SelectCard name="Сумма оплаты">
        {currencyFormatter(
          cartPrice +
            (orderState.bonus_used ? bonusAmount : 0) +
            (orderState.isDelivery ? deliveryAmount : 0),
        )}
      </SelectCard>
    </div>
  );
};

export default CartPrice;
