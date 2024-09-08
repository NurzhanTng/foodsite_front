import React from "react";
import { CategoryRefs } from "../../../hooks/useScrollEffect.ts";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import ComboCard from "./ComboCard.tsx";

type MenuCategoriesProps = {
  categoryRefs: React.MutableRefObject<CategoryRefs>;
};

const MenuCategories = ({ categoryRefs }: MenuCategoriesProps) => {
  const combos = useAppSelector((state) => state.loyalty.actions).filter(
    (action) =>
      action.triggers.some((trigger) => trigger.product_lists !== undefined) &&
      action.image_url !== null &&
      action.image_url !== "",
  );

  if (combos.length === 0) return;

  return (
    <div
      id={"Комбо"}
      key={-1}
      ref={(el) => (categoryRefs.current[-1] = el)}
      className="w-full pb-[50px]"
    >
      {/* Описание категории */}
      <h2 className="mb-3 w-fit text-xl font-semibold">Комбо</h2>
      {/*<p className="mb-[30px] max-w-full overflow-hidden text-sm text-fontSecondary">*/}
      {/*  {category.description}*/}
      {/*</p>*/}

      {/* Все карточки блюд */}
      <div className="mx-auto flex flex-row flex-wrap justify-between gap-5 gap-y-[20px] sm:justify-start">
        {combos.map((comboAction) => (
          <ComboCard key={comboAction.id} comboAction={comboAction} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
