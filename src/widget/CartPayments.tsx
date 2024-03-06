import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import Input from "../shared/Input.tsx";
import { setKaspiPhone } from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";

type CartPaymentsProps = {
  className?: string
}

const CartPayments = ({ className = "" }: CartPaymentsProps) => {
  // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  return (
    <div className={twMerge("", className)}>
      <h3 className="mb-[26px] text-base font-medium text-textSecondary">Оплата</h3>

      <Input
        label="Введите номер каспи"
        onChange={(event) =>
          dispatch(setKaspiPhone(event.target.value.replace(/\D/g, "")))
        }
        value={formatPhoneNumber(orderState.kaspi_phone)}
      />
    </div>
  );
};

export default CartPayments;
