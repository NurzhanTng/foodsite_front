import React, { useEffect, useRef } from "react";
import { Category } from "../Types.ts";
import { useAppSelector } from "../store/hooks.ts";

const Navigation = () => {
  const state = useAppSelector((state) => state.main);

  const navigationHeight = 100;
  const myRef: React.MutableRefObject<HTMLElement | null> = useRef(null);
  const ulRef: React.MutableRefObject<HTMLUListElement | null> = useRef(null);

  const scrollToCategory = (category: Category) => {
    const element = document.getElementById(category.name);
    if (element) {
      const offset = element.offsetTop - navigationHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollNavbar = (category: Category) => {
    const link = document.getElementById(`${category.name}-link`);
    if (link && myRef.current && ulRef.current) {
      const linkRect = link.getBoundingClientRect();
      const ulRect = ulRef.current?.getBoundingClientRect();

      const scrollLeft =
        linkRect.left -
        window.innerWidth / 2 -
        ulRect.left +
        linkRect.width / 2;

      myRef.current?.scrollTo({
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

  return (
    <nav
      ref={myRef}
      className="no-scrollbar fixed top-0 z-10 w-full overflow-x-scroll border-b border-secondary bg-transparent backdrop-blur backdrop-filter"
    >
      <ul
        ref={ulRef}
        className="m-0 flex w-max select-none list-none gap-3 p-4"
      >
        {state.categories.map((category) => (
          <li key={category.id}>
            <a
              id={`${category.name}-link`}
              onClick={() => scrollToCategory(category)}
              className={`${state.activeCategory === category.id ? "bg-button" : "bg-bgColor"} block w-max cursor-default rounded-full px-3 py-2 no-underline transition-all lg:hover:bg-buttonHover`}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
