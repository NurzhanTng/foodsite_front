import { twMerge } from "tailwind-merge";

type CashbackProps = {
  amount: number;
  cashback: number;
  className?: string;
};

const Cashback = ({ amount, cashback, className }: CashbackProps) => {
  return (
    <div
      className={twMerge(
        "w-fit rounded-[10px] bg-button px-5 py-[6px]",
        className,
      )}
    >
      <p className="text-base font-normal text-white">
        Еще {amount} тг до кэшбека {cashback}%
      </p>
    </div>
  );
};

export default Cashback;
