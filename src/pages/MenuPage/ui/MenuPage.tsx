import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";
import MenuPageHeader from "../../../features/MenuPageHeader";
import MenuCategories from "../../../widget/MenuCategories.tsx";
import useMenu from "../hooks/useMenu.ts";

function MenuPage() {
  const { state, categoryRefs, navigate, sumCurrency } = useMenu();

  return (
    <>
      <MenuPageHeader />
      <MenuCategories
        categories={state.categories}
        categoryRefs={categoryRefs}
      />
      <Button
        className={"fixed bottom-0 h-[50px] w-full rounded-none"}
        onClick={() => navigate("/cart")}
        text={`Корзина: ${currencyFormatter(sumCurrency(state.cart))}`}
      />
    </>
  );
}

export default MenuPage;
