import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import Input from "../shared/Input.tsx";
import { setUserName, setUserPhone } from "../store/slices/orderSlice.ts";
import formatPhoneNumber from "../utils/formatPhoneNumber.ts";
import { twMerge } from "tailwind-merge";
import { setErrors } from "../store/slices/mainSlice.ts";
import { useEffect } from "react";
import useScroll from "../hooks/useScroll.ts";

type CartAdditionsProps = {
  className?: string;
};

const CartAdditions = ({ className = "" }: CartAdditionsProps) => {
  // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.main.errors);
  const nameScroll = useScroll(100);
  const phoneScroll = useScroll(100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Дополнительно
      </h3>

      <Input
        id="name_input"
        ref={nameScroll.ref}
        onClick={() => nameScroll.scrollToElement()}
        isCorrect={!errors.name}
        aria-required={true}
        aria-valuemin={3}
        type="text"
        className="mb-2"
        label="Введите ваше имя"
        onChange={(event) => {
          if (errors.name) dispatch(setErrors({ ...errors, name: false }));
          dispatch(setUserName(event.target.value));
        }}
        value={orderState.user_name}
      />

      <Input
        id="phone_input"
        ref={phoneScroll.ref}
        onClick={() => phoneScroll.scrollToElement()}
        isCorrect={!errors.phone}
        aria-required={true}
        aria-valuemin={10}
        inputMode="tel"
        type="tel"
        label="Введите номер для связи"
        onChange={(event) => {
          dispatch(setErrors({ ...errors, phone: false }));
          dispatch(setUserPhone(event.target.value.replace(/\D/g, "")));
          if (event.target.value.replace(/\D/g, "").length < 11) return;

          event.target.setAttribute("readonly", "readonly");
          event.target.setAttribute("disabled", "true");
          setTimeout(function () {
            event.target.blur();
            event.target.removeAttribute("readonly");
            event.target.removeAttribute("disabled");
          }, 100);
        }}
        value={formatPhoneNumber(orderState.phone)}
      />
    </div>
  );
};

export default CartAdditions;
