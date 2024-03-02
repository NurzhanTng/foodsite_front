import React from "react";
import { twMerge } from "tailwind-merge";
import { icons, iconsViewBox, iconTypes } from "../constans.ts";


export type IconProps = {
  viewBox?: string
  className?: string;
  pathsClassName?: string;
  type: iconTypes;
};

const Icon: React.FC<IconProps> = ({ viewBox,  className, type, pathsClassName }) => {
  const icon = icons[type] || "";

  const paths = [];
  const pathsStyle = "w-full";
  if (Array.isArray(icon)) {
    for (const parameter of icon) {
      paths.push(
        <path className={twMerge(pathsStyle, pathsClassName)} {...parameter} />,
      );
    }
  } else {
    paths.push(
      <path className={twMerge(pathsStyle, pathsClassName)} {...icon} />,
    );
  }

  return (
    <svg
      viewBox={viewBox === undefined ? iconsViewBox[type] : viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path) => path)}
    </svg>
  );
};

export default Icon;
