import Icon, { iconTypes } from "../shared/Icon";
import React from "react";
import Button from "../shared/Button.tsx";
import { twMerge } from "tailwind-merge";

type SelectCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  description?: string;
  leftIcon?: iconTypes;
  onClick?: () => void;
  borderBottom?: boolean;
  isError?: boolean;
};

const SelectCard = ({
  name,
  description,
  leftIcon,
  onClick,
  children,
  borderBottom = false,
  isError,
  className,
  id,
}: SelectCardProps) => {
  return (
    <Button
      id={id}
      className={twMerge(
        `${borderBottom ? "border-b border-secondary" : ""} ${isError ? "text-error" : ""} relative flex w-full flex-row justify-between rounded-none px-0 py-3 text-left hover:bg-transparent active:bg-transparent`,
        className,
      )}
      showText={false}
      styleType="secondary"
      onClick={onClick}
    >
      <div className="flex flex-row gap-2">
        {leftIcon && <Icon className="my-auto h-6 w-6" type={leftIcon} />}
        <div>
          <h3
            className={`${isError ? "text-error" : "text-white"} text-base font-normal`}
          >
            {name}
          </h3>
          {description && (
            <p
              className={`${isError ? "text-error2" : "text-textSecondary"} text-sm font-medium leading-tight `}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="my-auto">{children}</div>
    </Button>
  );
};

export default SelectCard;
