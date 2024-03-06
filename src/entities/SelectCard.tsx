import Icon, { iconTypes } from "../shared/Icon";
import React from "react";
import Button from "../shared/Button.tsx";

type SelectCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  description?: string;
  leftIcon?: iconTypes;
  onClick?: () => void;
  borderBottom?: boolean
};

const SelectCard = ({
  name,
  description,
  leftIcon,
  onClick,
  children,
  borderBottom = false
}: SelectCardProps) => {
  return (
    <Button
      className={`${borderBottom ? "border-b border-secondary" : ""} py-3 relative flex w-full flex-row justify-between rounded-none px-0 text-left hover:bg-transparent active:bg-transparent`}
      showText={false}
      styleType="secondary"
      onClick={onClick}
    >
      <div className="flex flex-row gap-2">
        {leftIcon && <Icon className="my-auto h-6 w-6" type={leftIcon} />}
        <div>
          <h3 className="text-base font-normal text-white">{name}</h3>
          {description && (
            <p className="text-sm font-medium leading-tight text-textSecondary">
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
