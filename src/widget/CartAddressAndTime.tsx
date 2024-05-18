import { twMerge } from "tailwind-merge";
import SelectCard from "../entities/SelectCard.tsx";
import Icon from "../shared/Icon";
import { useAppSelector } from "../store/hooks/hooks.ts";
import { useNavigate } from "react-router-dom";

type CartAddressAndTimeProps = {
  className?: string;
  toggleTime?: () => void;
};

const CartAddressAndTime = ({
  className = "",
  toggleTime,
}: CartAddressAndTimeProps) => {
  const orderState = useAppSelector((state) => state.order);
  const errors = useAppSelector((state) => state.main.errors);
  const navigate = useNavigate();

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Адрес и время заказа
      </h3>

      <SelectCard
        id="delivery_input"
        isError={errors.address}
        leftIcon="delivery"
        borderBottom={true}
        name={
          orderState.isDelivery
            ? orderState.address.parsed
              ? orderState.address.parsed
              : "Ваш адрес"
            : "С собой"
        }
        description={
          orderState.address.parsed && orderState.isDelivery ? "Ваш адрес" : ""
        }
        onClick={() => navigate("/delivery")}
      >
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>

      <SelectCard
        id="time_input"
        leftIcon="clock"
        name={
          orderState.done_time === null || orderState.done_time === ""
            ? "Время приготовления"
            : orderState.done_time === "00:00"
              ? "Как можно скорее"
              : orderState.done_time
        }
        isError={errors.time}
        description={orderState.done_time ? "Время приготовления" : ""}
        onClick={toggleTime}
      >
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>
    </div>
  );
};

export default CartAddressAndTime;
