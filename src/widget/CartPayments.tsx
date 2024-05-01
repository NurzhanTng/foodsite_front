import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import Input from "../shared/Input.tsx";
import { setKaspiPhone } from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";
import { setErrors } from "../store/slices/mainSlice.ts";
import kaspi from "../data/img/kaspi.svg";

type CartPaymentsProps = {
  className?: string;
};

const CartPayments = ({ className = "" }: CartPaymentsProps) => {
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.main.errors);

  return (
    <div className={twMerge("", className)}>
      <div className="mb-[26px] flex flex-row gap-[10px]">
        <img alt={"Kaspi"} src={kaspi} className="w-[30px]" />
        <h3 className="my-auto text-base font-medium text-textSecondary">
          Оплата
        </h3>
      </div>

      <Input
        id="kaspi_input"
        isCorrect={!errors.kaspi_phone}
        label="Введите номер каспи"
        inputMode="tel"
        type="tel"
        onChange={(event) => {
          dispatch(setErrors({ ...errors, kaspi_phone: false }));
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
