import React from "react";
import { twMerge } from "tailwind-merge";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, className }) => {
  return (
    <div
      className={twMerge(
        `relative inline-flex h-[30px] w-[60px] flex-col items-start justify-center gap-2.5 rounded-[20px] border border-button  px-[5px] py-2.5 transition-all duration-300 ${checked ? "bg-button" : "bg-buttonSecondary2"}`,
        className,
      )}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute left-1 top-1 h-5 w-5 transform rounded-[100px] shadow-md transition-transform duration-300 ${checked ? "bg-buttonSecondary2 translate-x-[150%]" : "bg-button"}`}
      />
    </div>
  );
};

export default Switch;
