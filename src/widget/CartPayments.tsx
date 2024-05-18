import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import Input from "../shared/Input.tsx";
import { setBonusUsed, setKaspiPhone } from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";
import { setErrors } from "../store/slices/mainSlice.ts";
import kaspi from "../data/img/kaspi.svg";
import useScroll from "../hooks/useScroll.ts";
import SelectCard from "../entities/SelectCard.tsx";
import Switch from "../shared/Switch.tsx";

type CartPaymentsProps = {
  className?: string;
};

const CartPayments = ({ className = "" }: CartPaymentsProps) => {
  const orderState = useAppSelector((state) => state.order);
  const userBonus = useAppSelector((state) => state.user.bonus);
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.main.errors);
  const { ref, scrollToElement } = useScroll(100);

  return (
    <div className={twMerge("", className)}>
      <div className="mb-[26px] flex flex-row gap-[10px]">
        <img alt={"Kaspi"} src={kaspi} className="w-[30px]" />
        <h3 className="my-auto text-base font-medium text-textSecondary">
          Оплата
        </h3>
      </div>

      <SelectCard
        name={`Использовать бонус (${userBonus})`}
        onClick={() => dispatch(setBonusUsed(!orderState.bonus_used))}
        className="mb-[20px]"
      >
        <Switch checked={orderState.bonus_used} onChange={() => {}} />
      </SelectCard>

      <Input
        id="kaspi_input"
        ref={ref}
        onClick={() => scrollToElement()}
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
