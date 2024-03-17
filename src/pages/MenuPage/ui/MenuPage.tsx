import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";
import MenuPageHeader from "../../../features/MenuPageHeader";
import MenuCategories from "../../../widget/MenuCategories.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import useScrollEffect from "../../../hooks/useScrollEffect.ts";
import useCart from "../../../hooks/useCart.ts";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <MenuPageHeader />
      <MenuCategories
        categories={state.categories}
        categoryRefs={categoryRefs}
      />
      <p>Categories: {JSON.stringify(state.categories)}</p>
      <p>User Id: {window.Telegram.WebApp?.initDataUnsafe?.user?.id}</p>
      <Button
        className={"fixed bottom-0 h-[50px] w-full rounded-none"}
        onClick={() => navigate("/cart")}
        text={`Корзина: ${currencyFormatter(sumCurrency(state.cart))}`}
      />
    </>
  );
}

export default MenuPage;
