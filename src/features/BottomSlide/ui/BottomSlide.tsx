import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type BottomSlideProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  stage: 0 | 1 | 2;
  setStage: (stage: 0 | 1 | 2) => void;
  update: boolean;
};

const tg = window.Telegram.WebApp;

const BottomSlide = ({
  className,
  children,
  setStage,
  stage,
  update,
}: BottomSlideProps) => {
  const [height, setHeight] = useState<number>(getHeight(stage));
  const [margin, setMargin] = useState<number>(getTopMargin(stage));
  const [active, setActive] = useState(false);
  const [startHeight, setStartHeight] = useState(0);
  const [startMargin, setStartMargin] = useState(0);
  const [startCoords, setStartCoords] = useState(0);

  useEffect(() => {
    console.log(stage);
  }, [stage]);

  useEffect(() => {
    setHeight(getHeight(stage));
    setMargin(getTopMargin(stage));
  }, [update]);

  useEffect(() => {
    setHeight(getHeight(stage));
  }, [window.visualViewport?.height]);

  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight * 0.9][stage];
  }

  function getTopMargin(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [windowHeight - 160, windowHeight * 0.5, windowHeight * 0.1][stage];
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    console.log("touch start");
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
    setStartMargin(margin);
    setActive(true);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    console.log("mouse down", height, margin);
    setStartCoords(event.clientY);
    setStartHeight(height);
    setStartMargin(margin);
    setActive(true);
  };

  const handleTouchEnd = () => {
    console.log("touch end");
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
    setHeight(getHeight(stage));
    setMargin(getTopMargin(stage));
  }, [stage]);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!active) return;
      if (!tg.isExpanded) tg.expand;
      const deltaY = event.touches[0].clientY - startCoords;
      const newHeight = startHeight - deltaY;
      console.log("move", startMargin + deltaY, newHeight);
      setHeight(Math.min(Math.max(newHeight, getHeight(0)), getHeight(2)));
      setMargin(
        Math.max(
          Math.min(startMargin + deltaY, getTopMargin(0)),
          getTopMargin(2),
        ),
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      // if (!active) return;
      if (!tg.isExpanded) tg.expand;
      const deltaY = event.clientY - startCoords;
      const newHeight = startHeight - deltaY;
      console.log("move", startMargin + deltaY, newHeight);
      setHeight(Math.min(Math.max(newHeight, getHeight(0)), getHeight(2)));
      setMargin(
        Math.max(
          Math.min(startMargin + deltaY, getTopMargin(0)),
          getTopMargin(2),
        ),
      );
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleTouchEnd);
    };
  }, [startCoords, startHeight]);

  return (
    <div
      className={twMerge(
        `${startCoords === 0 ? "duration-300" : ""} transition-height fixed left-0 z-10 w-full transition ease-in-out`,
        className,
      )}
      style={{ height: `${height}px`, top: `${margin}px` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default BottomSlide;
