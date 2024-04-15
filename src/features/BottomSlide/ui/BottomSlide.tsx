import React, { useState } from "react";
import { twMerge } from "tailwind-merge";


type BottomSlideProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  setStage?: (stage: 0 | 1 | 2) => void;
}

const BottomSlide = ({ className, children, setStage }: BottomSlideProps) => {
  const minimalHeight = 160;
  const maximumHeight = window.innerHeight * 0.9;
  const [height, setHeight] = useState<number>(minimalHeight);
  const [startHeight, setStartHeight] = useState(0);
  const [startCoords, setStartCoords] = useState(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const deltaY = event.touches[0].clientY - startCoords;
    const newHeight = startHeight - deltaY;
    setHeight(Math.min(Math.max(newHeight, minimalHeight), maximumHeight));
    if (setStage) {
      setStage(2);
    }
  };

  const handleTouchEnd = () => {
    setStartCoords(0);
    const scrollPercent = height / window.innerHeight * 100;
    if (scrollPercent >= 30 && scrollPercent < 70) {
      setHeight(window.innerHeight / 2);
      if (setStage) {
        setStage(1);
      }
    } else if (scrollPercent >= 60) {
      setHeight(maximumHeight);
      if (setStage) {
        setStage(2);
      }
    } else {
      setHeight(minimalHeight);
      if (setStage) {
        setStage(0);
      }
    }
  };

  return (
    <div
      className={twMerge(`${startCoords === 0 ? "transition-height duration-300" : ""} fixed bottom-0 left-0 w-full ease-in-out z-10`, className)}
      style={{ height: `${height}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default BottomSlide;
