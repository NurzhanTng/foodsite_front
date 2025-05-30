import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";
import MenuPageHeader from "../../../features/MenuPageHeader";
import MenuCategories from "../../../widget/MenuCategories.tsx";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import useScrollEffect from "../../../hooks/useScrollEffect.ts";
import useCart from "../../../hooks/useCart.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useActions from "../../../hooks/useActions.ts";
import MenuActions from "./MenuActions.tsx";

function MenuPage() {
  const state = useAppSelector((state) => state.main);
  const actions = useAppSelector((state) => state.loyalty.actions);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency } = useCart();
  const navigate = useNavigate();
  const { updateProductActions } = useActions();

  useEffect(() => {
    window.scrollTo(0, 0);
    updateProductActions();
  }, []);

  return (
    <>
      <MenuPageHeader />
      <MenuActions actions={actions} />
      <MenuCategories
        categories={state.categories}
        categoryRefs={categoryRefs}
      />
      <Button
        className={"fixed bottom-0 h-[50px] w-full rounded-none"}
        onClick={() => navigate("/cart2")}
        text={`Корзина: ${currencyFormatter(sumCurrency(state.cart))}`}
      />
    </>
  );
}

export default MenuPage;
