import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type BottomSlideProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  stage: 0 | 1 | 2;
  setStage: (stage: 0 | 1 | 2) => void;
  isAnimating: boolean;
};

const BottomSlide = ({
  className,
  children,
  setStage,
  stage,
  isAnimating,
}: BottomSlideProps) => {
  const [height, setHeight] = useState<number>(getHeight(stage));
  const [active, setActive] = useState(false);
  const [startHeight, setStartHeight] = useState(0);
  const [topMargin, setTopMargin] = useState(0);
  const [startCoords, setStartCoords] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height,
  );

  useEffect(() => {
    console.log(viewportHeight);
    setViewportHeight(window.visualViewport?.height);
  }, [window.visualViewport?.height]);

  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight * 0.9][stage];
  }

  function getMargin(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [windowHeight - 160, windowHeight * 0.5, windowHeight * 0.1][stage];
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // console.log("touch start");
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
    setActive(true);
  };

  const handleTouchEnd = () => {
    // console.log("touch end");
    setStartCoords(0);
    setActive(false);
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
    // console.log(newStage);
    setHeight(getHeight(stage));
    setStage(newStage);
  };

  useEffect(() => {
    // console.log(stage);
    setTopMargin(getMargin(stage));
  }, [stage]);

  useEffect(() => {
    setTopMargin(getMargin(stage));

    let intervalId: NodeJS.Timeout;

    if (isAnimating) {
      intervalId = setInterval(() => {
        console.log("Running function every 50ms...");
        console.log("Height:", getHeight(stage));
        setHeight(getHeight(stage));
      }, 50);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAnimating]);

  useEffect(() => {
    // console.log("height", getHeight(stage));
    setHeight(getHeight(stage));
  }, [window.visualViewport?.height]);

  useEffect(() => {
    setHeight(getHeight(stage));
  }, [stage]);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!active || isAnimating) return;
      const deltaY = event.touches[0].clientY - startCoords;
      const newHeight = startHeight - deltaY;
      setHeight(Math.min(Math.max(newHeight, getHeight(0)), getHeight(2)));
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startCoords, startHeight, isAnimating]);

  return (
    <div
      className={twMerge(
        `${startCoords === 0 ? "duration-300" : ""} transition-height transition-top fixed bottom-0 left-0 z-10 w-full transition ease-in-out`,
        className,
      )}
      style={
        isAnimating
          ? { height: `${height}px`, top: `${topMargin}px` }
          : { height: `${height}px`, bottom: 0 }
      }
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default BottomSlide;
