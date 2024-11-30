import { useAppSelector } from "../store/hooks/hooks.ts";
import Input from "../shared/Input.tsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import useScroll from "../hooks/useScroll.ts";

type CartAdditionsProps = {
  className?: string;
};

const CartAdditions = ({ className = "" }: CartAdditionsProps) => {
  // const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const errors = useAppSelector((state) => state.main.errors);
  const nameScroll = useScroll(100);
  const phoneScroll = useScroll(100);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(orderState)
  }, []);

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Дополнительно
      </h3>

      <Input
        id="name_input"
        disabled={true}
        ref={nameScroll.ref}
        isCorrect={!errors.name}
        aria-required={true}
        aria-valuemin={3}
        type="text"
        className="mb-2"
        label="Ваше имя"
        value={orderState.user_name}
      />

      <Input
        id="phone_input"
        disabled={true}
        ref={phoneScroll.ref}
        isCorrect={!errors.phone}
        aria-required={true}
        aria-valuemin={10}
        inputMode="tel"
        type="tel"
        label="Ваш номер для связи"
        value={orderState.phone}
      />
    </div>
  );
};

export default CartAdditions;
