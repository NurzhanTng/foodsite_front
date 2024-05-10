import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type BottomSlideProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  stage: 0 | 1 | 2;
  setStage: (stage: 0 | 1 | 2) => void;
};

const tg = window.Telegram.WebApp;

const BottomSlide = ({
  className,
  children,
  setStage,
  stage,
}: BottomSlideProps) => {
  const [height, setHeight] = useState<number>(getHeight(stage));
  const [active, setActive] = useState(false);
  const [startHeight, setStartHeight] = useState(0);
  const [startCoords, setStartCoords] = useState(0);

  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight * 0.9][stage];
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
    setActive(true);
  };

  useEffect(() => {
    setHeight(getHeight(stage));
  }, [stage]);

  const handleTouchEnd = () => {
    setStartCoords(0);
    setActive(false);
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    const scrollPercent = (height / windowHeight) * 100;
    let newStage: 0 | 1 | 2 = 0;
    if (scrollPercent >= 30 && scrollPercent < 70) {
      newStage = 1;
    } else if (scrollPercent >= 60) {
      newStage = 2;
    } else {
      newStage = 0;
    }
    // setHeight(stageHeights[stage]);
    setStage(newStage);
  };

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!active) return;
      if (!tg.isExpanded) tg.expand;
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
        `${startCoords === 0 ? "duration-300" : ""} transition-height fixed bottom-0 left-0 z-10 w-full ease-in-out`,
        className,
      )}
      style={{ height: `${height}px` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default BottomSlide;
