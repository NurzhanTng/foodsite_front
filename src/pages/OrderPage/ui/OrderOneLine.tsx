import { twMerge } from "tailwind-merge";

type OrderOneLineProps = {
  className?: string;
  title: string;
  description: string | number | undefined;
  descriptionClassName?: string;
};

const OrderOneLine = ({
  className,
  title,
  description,
  descriptionClassName,
}: OrderOneLineProps) => {
  return (
    <div
      className={twMerge(
        "mb-3 flex w-[calc(100vw-40px)] flex-row justify-between gap-3",
        className,
      )}
    >
      <p className="w-full text-sm font-normal leading-none text-fontSecondary">
        {title}
      </p>
      <p
        className={twMerge(
          "min-w-[180px] text-right text-sm font-normal leading-none text-fontSecondary",
          descriptionClassName,
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default OrderOneLine;
