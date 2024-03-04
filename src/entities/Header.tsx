import React from "react";
import { twMerge } from "tailwind-merge";

type HeaderProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  className?: string;
  myRef?: React.MutableRefObject<HTMLElement | null>;
};

const Header = ({ className, children, myRef }: HeaderProps) => {
  return (
    <header
      ref={myRef}
      className={twMerge(
        "no-scrollbar fixed left-0 top-0 z-10 h-[70px] w-full overflow-x-scroll border-b border-secondary bg-transparent py-auto backdrop-blur backdrop-filter",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
