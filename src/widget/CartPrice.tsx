import { useAppSelector } from "../store/hooks.ts";
import { twMerge } from "tailwind-merge";
import SelectCard from "../entities/SelectCard.tsx";
import useMenu from "../pages/MenuPage/hooks/useMenu.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";

type CartPriceProps = {
  className?: string;
};

const CartPrice = ({ className = "" }: CartPriceProps) => {
  const { state, sumCurrency } = useMenu();
  const orderState = useAppSelector((state) => state.order);

  return (
    <div className={twMerge("", className)}>
      <h3 className="mb-[10px] text-base font-medium text-textSecondary">
        Сумма заказа
      </h3>

      <SelectCard borderBottom={true} name="Ваш заказ">
        {currencyFormatter(sumCurrency(state.cart))}
      </SelectCard>

      {orderState.bonus_used && (
        <SelectCard borderBottom={true} name="Бонус">
          {currencyFormatter(-1000)}
        </SelectCard>
      )}

      <SelectCard name="Сумма оплаты">
        {currencyFormatter(
          sumCurrency(state.cart) + (orderState.bonus_used ? -1000 : 0),
        )}
      </SelectCard>
    </div>
  );
};

export default CartPrice;
