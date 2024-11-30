import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type BottomSlideProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  stage: 0 | 1 | 2;
  setStage: (stage: 0 | 1 | 2) => void;
};

const BottomSlide = ({
  className,
  children,
  setStage,
  stage,
}: BottomSlideProps) => {
  const [height, setHeight] = useState<number>(getHeight(stage));
  const [startCoords, setStartCoords] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
  };

  const handleTouchEnd = () => {
    setStartCoords(0);
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    const scrollPercent = (height / windowHeight) * 100;
    let newStage: 0 | 1 | 2;
    if (scrollPercent >= 30 && scrollPercent < 70) {
      newStage = 1;
    } else if (scrollPercent >= 60) {
      newStage = 2;
    } else {
      newStage = 0;
    }
    setHeight(getHeight(stage));
    setStage(newStage);
  };
  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight - 160][stage];
  }

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const deltaY = event.touches[0].clientY - startCoords;
      const newHeight = startHeight - deltaY;
      setHeight(Math.min(Math.max(newHeight, getHeight(0)), getHeight(2)));
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startCoords, startHeight]);

  return (
    <div
      className={twMerge(
        `transition-height transition-top fixed bottom-0 left-0 z-10 w-full transition duration-300 ease-in-out`,
        className,
      )}
      style={{ height: `${height}px`, bottom: 0 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default BottomSlide;
