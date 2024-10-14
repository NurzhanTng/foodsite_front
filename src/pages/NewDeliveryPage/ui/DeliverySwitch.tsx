import Button from "../../../shared/Button.tsx";
import { twMerge } from "tailwind-merge";

type DeliverySwitchProps = {
  className?: string;
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
}

const DeliverySwitch = ({ isDelivery, setIsDelivery, className }: DeliverySwitchProps) => {
  return (
    <div className={twMerge("flex flex-row justify-between rounded-full border-2 border-button", className)}>
      <Button
        className="py-auto h-10 rounded-full px-5"
        text="Доставка"
        showIcon={true}
        iconType="delivery"
        styleType={isDelivery ? "primary" : "secondary"}
        onClick={() => setIsDelivery(true)}
      />

      <Button
        className="py-auto h-10 rounded-full px-5"
        text="В заведении / с собой"
        showIcon={true}
        iconType="humanWalk"
        styleType={!isDelivery ? "primary" : "secondary"}
        onClick={() => setIsDelivery(false)}
      />
    </div>
  );
};

export default DeliverySwitch;