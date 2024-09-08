import React from "react";
import { Category } from "../utils/Types.ts";
import MenuCategory from "../features/MenuCategory.tsx";
import { CategoryRefs } from "../hooks/useScrollEffect.ts";
import ComboCategory from "../pages/MenuPage/ui/ComboCategory.tsx";

type MenuCategoriesProps = {
  categories: Category[];
  categoryRefs: React.MutableRefObject<CategoryRefs>;
};

const MenuCategories = ({ categories, categoryRefs }: MenuCategoriesProps) => {
  return (
    <div className="mb-[30px] mt-[90px] w-full px-[10px]">
      {categories.map((category) => (
        <MenuCategory
          key={category.id}
          category={category}
          categoryRefs={categoryRefs}
        />
      ))}
      <ComboCategory categoryRefs={categoryRefs} />
    </div>
  );
};

export default MenuCategories;
