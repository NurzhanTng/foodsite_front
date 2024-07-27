import React from "react";
import { twMerge } from "tailwind-merge";
import Icon, { iconTypes } from "./Icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: "primary" | "secondary" | "inactive" | "outline";
  className?: string;
  showText?: boolean;
  text?: string;
  textClassName?: string;
  showIcon?: boolean;
  iconType?: iconTypes;
  iconClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
  id,
  styleType = "primary",
  className = "",
  showText = true,
  showIcon = false,
  text = "",
  iconType,
  textClassName = "",
  iconClassName = "",
  children,
  ...rest
}) => {
  let buttonStyle = `${showIcon && showText ? "justify-center items-center gap-[10px] inline-flex" : ""} transition-all h-fit rounded-[10px] px-[30px] py-3.5 text-base font-normal leading-none text-white box-border`;
  switch (styleType) {
    case "primary":
      buttonStyle += " bg-button md:hover:bg-buttonHover active:bg-buttonHover";
      break;
    case "secondary":
      buttonStyle +=
        " bg-buttonSecondary1 md:hover:bg-buttonHover active:bg-buttonHover";
      break;
    case "inactive":
      buttonStyle +=
        " border border-buttonInactive  bg-buttonInactive md:hover:bg-buttonInactive active:bg-buttonInactive";
      break;
    case "outline":
      buttonStyle +=
        " bg-buttonSecondary2 border border-button md:hover:bg-buttonHover active:bg-buttonHover";
      break;
  }

  return (
    <button id={id} className={twMerge(buttonStyle, className)} {...rest}>
      {showText && <p className={textClassName}>{text}</p>}
      {showIcon && !(iconType === undefined) && (
        <Icon
          className={twMerge("h-4 w-4 transition-all", iconClassName)}
          type={iconType}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
