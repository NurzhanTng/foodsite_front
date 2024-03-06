import { twMerge } from "tailwind-merge";
import Button from "../../../shared/Button.tsx";

type ElementCounterProps = {
  onIncrease: () => void;
  onDecrease: () => void;
  count: number;
  className?: string;
  id?: string;
};

const ElementCounter = ({
  onDecrease,
  onIncrease,
  count,
  className,
  id,
}: ElementCounterProps) => {
  return (
    <div
      id={id}
      className={twMerge(
        "flex h-9 w-fit flex-row justify-center rounded-full bg-button align-middle" +
          " gap-3",
        className,
      )}
    >
      <Button
        onClick={onDecrease}
        className="h-9 w-9 rounded-full px-[10px] py-0"
        showText={false}
        showIcon={true}
        iconType="minus"
      />
      <p className="my-auto h-fit">{count}</p>
      <Button
        onClick={onIncrease}
        className="h-9 w-9 rounded-full px-[10px] py-0"
        showText={false}
        showIcon={true}
        iconType="plus"
      />
    </div>
  );
};

export default ElementCounter;
