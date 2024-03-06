import { twMerge } from "tailwind-merge";
import SelectCard from "../entities/SelectCard.tsx";
import Icon from "../shared/Icon";
import { useAppSelector } from "../store/hooks.ts";

type CartAddressAndTimeProps = {
  className?: string;
};

const CartAddressAndTime = ({ className = "" }: CartAddressAndTimeProps) => {
  const orderState = useAppSelector((state) => state.order);

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <h3 className="mb-4 text-base font-medium text-textSecondary">
        Адрес и время заказа
      </h3>

      <SelectCard
        leftIcon="delivery"
        borderBottom={true}
        name={
          orderState.address.parsed ? orderState.address.parsed : "Ваш адрес"
        }
        description={orderState.address.parsed ? "Ваш адрес" : ""}
      >
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>

      <SelectCard leftIcon="clock" name="Время приготовления">
        <Icon className="my-auto h-5 w-5" type="arrowRight" />
      </SelectCard>
    </div>
  );
};

export default CartAddressAndTime;
