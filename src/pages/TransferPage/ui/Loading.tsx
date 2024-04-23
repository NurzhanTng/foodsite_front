import { twMerge } from "tailwind-merge";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={twMerge(
        "fixed left-[calc(50%-25px)] top-[calc(50%-25px)] h-[50px] w-[50px] animate-spin rounded-full border-4" +
          " border-t-4 border-button border-t-bgColor ease-linear",
        className,
      )}
    />
  );
};

export default Loading;
