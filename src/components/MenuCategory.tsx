import { CategoryRefs } from "../hooks/useScrollEffect.tsx";
import { Category } from "../Types.ts";
import { MutableRefObject } from "react";
import ProductCard from "./ProductCard.tsx";

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
      className="w-full pb-[50px]"
    >
      <h2 className="mb-3 w-fit text-xl font-semibold">{category.name}</h2>
      <p className="mb-[30px] max-w-full overflow-hidden text-sm text-fontSecondary">
        {category.description}
      </p>

      <div className="mx-auto flex flex-row flex-wrap justify-between gap-5 gap-y-[20px] sm:justify-start">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
