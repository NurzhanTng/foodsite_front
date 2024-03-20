import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import Input from "../shared/Input.tsx";
import { setKaspiPhone } from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";

type CartPaymentsProps = {
  className?: string;
};

const CartPayments = ({ className = "" }: CartPaymentsProps) => {
  // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  return (
    <div className={twMerge("", className)}>
      <h3 className="mb-[26px] text-base font-medium text-textSecondary">
        Оплата
      </h3>

      <Input
        label="Введите номер каспи"
        inputMode="tel"
        type="tel"
        onChange={(event) => {
          dispatch(setKaspiPhone(event.target.value.replace(/\D/g, "")));
          if (event.target.value.replace(/\D/g, "").length < 11) return;

          event.target.setAttribute("readonly", "readonly");
          event.target.setAttribute("disabled", "true");
          setTimeout(function () {
            event.target.blur();
            event.target.removeAttribute("readonly");
            event.target.removeAttribute("disabled");
          }, 100);
        }}
        value={formatPhoneNumber(orderState.kaspi_phone)}
      />
    </div>
  );
};

export default CartPayments;
