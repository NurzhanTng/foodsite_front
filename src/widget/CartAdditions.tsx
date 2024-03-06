import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import Input from "../shared/Input.tsx";
import {
  setBonusUsed,
  setUserName,
  setUserPhone,
} from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";
import SelectCard from "../entities/SelectCard.tsx";
import Icon from "../shared/Icon";
import Switch from "../shared/Switch.tsx";

type CartAdditionsProps = {
  className?: string;
};

const CartAdditions = ({ className = "" }: CartAdditionsProps) => {
  // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Дополнительно
      </h3>

      <Input
        className="mb-2"
        label="Введите ваше имя"
        onChange={(event) => dispatch(setUserName(event.target.value))}
        value={orderState.user_name}
      />

      <Input
        label="Введите номер для связи"
        onChange={(event) =>
          dispatch(setUserPhone(event.target.value.replace(/\D/g, "")))
        }
        value={formatPhoneNumber(orderState.phone)}
      />

      <SelectCard borderBottom={true} name="Комментарий к заказу">
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>

      <SelectCard
        name="Использовать бонус"
        onClick={() => dispatch(setBonusUsed(!orderState.bonus_used))}
      >
        <Switch checked={orderState.bonus_used} onChange={() => {}} />
      </SelectCard>
    </div>
  );
};

export default CartAdditions;
