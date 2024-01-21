import React from "react";
import { Category } from "../pages/MainPage.tsx";

interface NavigationProps {
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (category_id: number | null) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  const navigationHeight = 100;

  const scrollToCategory = (category: Category) => {
    const element = document.getElementById(category.name);
    if (element) {
      const offset = element.offsetTop - navigationHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActiveCategory(category.id);
    }
  };

  return (
    <nav className="fixed left-0 top-0 w-full overflow-x-auto bg-transparent backdrop-blur-md backdrop-filter">
      <ul className="m-0 flex list-none p-0">
        {categories.map((category) => (
          <li key={category.id} className="border-secondary border-b p-4">
            <a
              id={`${category.name}:link`}
              onClick={() => scrollToCategory(category)}
              className={`${activeCategory === category.id ? "bg-button" : ""} hover:bg-buttonHover block w-max cursor-default rounded-full px-3 py-2 no-underline transition-all`}
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
