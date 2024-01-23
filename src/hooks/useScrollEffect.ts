import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { setActiveCategory } from "../store/slices/mainSlice.ts";
// import fetchCategories from "../utils/fetchCategories.ts";
// import { Category } from "../Types.ts";

export type CategoryRefs = {
  [key: string]: HTMLDivElement | null;
};

const useScrollEffect = () => {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  // console.log(1)
  // // dispatch(fetchCategory());
  // const result = fetchCategories;
  // result.then((value) => {
  //   console.log(value)
  // }).catch((err) => {
  //   console.log("Error: ", err)
  // })
  // console.log(2)
  // const =

  const req = () => {
    return fetch(
       "https://913b-213-211-96-139.ngrok-free.app/food/categories/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((data) => {
      // console.log(data.text())
      // return data.json()
      return data.text()
    })
  };

  console.log('1')
  const result = req();
  result.then((data) => {
    console.log(data)
  })
  console.log('1')


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
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return {
    categoryRefs
  };
};

export default useScrollEffect;
