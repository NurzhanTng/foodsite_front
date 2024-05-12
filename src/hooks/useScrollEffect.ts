import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import { setActiveCategory } from "../store/slices/mainSlice.ts";

export type CategoryRefs = {
  [key: string]: HTMLDivElement | null;
};

const useScrollEffect = () => {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const categoryRefs: React.MutableRefObject<CategoryRefs> = useRef({});

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  const handleScroll = useCallback(() => {
    for (const category of state.categories) {
      const element = categoryRefs.current[category.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 - 100 &&
          rect.bottom >= window.innerHeight / 2 - 100
        ) {
          dispatch(setActiveCategory(category.id));
          // console.log(`New active category ${category.id}`);
          break;
        }
      }
    }
  }, [dispatch, state.categories]);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 30),
    [handleScroll],
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return {
    categoryRefs,
  };
};

export default useScrollEffect;
