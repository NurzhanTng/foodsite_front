import React, { useEffect, useRef } from "react";
import { Category } from "../../../utils/Types.ts";
import { useAppSelector } from "../../../store/hooks.ts";


const useHeader = () => {
  const state = useAppSelector((state) => state.main);
  const navigationHeight = 100;
  const mainRef: React.MutableRefObject<HTMLElement | null> = useRef(null);
  const navRef: React.MutableRefObject<HTMLUListElement | null> = useRef(null);

  const scrollToCategory = (category: Category) => {
    const element = document.getElementById(category.name);
    if (element) {
      const offset = element.offsetTop - navigationHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollNavbar = (category: Category) => {
    const link = document.getElementById(`${category.name}-link`);
    if (link && mainRef.current && navRef.current) {
      const linkRect = link.getBoundingClientRect();
      const navRect = navRef.current?.getBoundingClientRect();

      const scrollLeft =
        linkRect.left -
        window.innerWidth / 2 -
        navRect.left +
        linkRect.width / 2;

      mainRef.current?.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    for (const category of state.categories) {
      if (state.activeCategory === category.id) {
        scrollNavbar(category);
      }
    }
  }, [state.activeCategory, state.categories]);

  return { state, scrollToCategory, navRef, mainRef };
};

export default useHeader;