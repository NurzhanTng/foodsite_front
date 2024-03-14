import React from "react";
import { twMerge } from "tailwind-merge";

type PopupProps = React.HTMLProps<HTMLDivElement> & {
  show: boolean;
  toggleShow: () => void;
};

const Popup: React.FC<PopupProps> = ({
  show,
  toggleShow,
  children,
  className,
  onClick,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target: EventTarget | null = event.target;
    while (target !== null) {
      if ((target as HTMLElement).id === "click_ignore") {
        return; // Ignore clicks on buttons
      }
      target = (target as HTMLElement).parentNode;
    }

    toggleShow();
    if (onClick) onClick(event);
  };

  return (
    <div
      onClick={handleClick}
      {...rest}
      className={`${show ? "fixed" : "hidden"} left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur backdrop-filter`}
    >
      <div
        id="click_ignore"
        className={twMerge(
          "mx-5 w-full rounded-[10px] bg-bgColor p-5 shadow-image",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
