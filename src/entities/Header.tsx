import React from "react";
import { twMerge } from "tailwind-merge";

type NavigationProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  className?: string;
  myRef?: React.MutableRefObject<HTMLElement | null>
};

const Navigation = ({ className, children, myRef }: NavigationProps) => {
  return (
    <header
      ref={myRef}
      className={twMerge(
        "no-scrollbar fixed top-0 z-10 w-full overflow-x-scroll border-b border-secondary bg-transparent backdrop-blur backdrop-filter",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Navigation;
