import { Category, CategoryRefs } from "../pages/MainPage.tsx";
import { MutableRefObject } from "react";

type MenuCategoryProps = {
  category: Category;
  categoryRefs: MutableRefObject<CategoryRefs>;
};

const MenuCategory = ({ category, categoryRefs }: MenuCategoryProps) => {
  return (
    <div
      id={category.name}
      key={category.id}
      ref={(el) => (categoryRefs.current[category.id] = el)}
      className="mx-auto w-full pb-[400px]"
    >
      <h2 className="mb-3 text-xl font-semibold">{category.name}</h2>
      <p className="text-fontSecondary w-fit text-sm">{category.description}</p>
      {category.products.map((product) => {
        return (
          <p key={product.id} className="mb-10 ml-5">
            {product.name}
          </p>
        );
      })}
    </div>
  );
};

export default MenuCategory;
