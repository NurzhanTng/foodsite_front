import Navigation from "../components/Navigation.tsx";
import MenuCategory from "../components/MenuCategory.tsx";
import useScrollEffect from "../hooks/useScrollEffect.ts";
import { useAppSelector } from "../store/hooks.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";
import useCart from "../hooks/useCart.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function MainPage() {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency, updateCartFromParams } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    updateCartFromParams(searchParams.get("cart"));
  }, [searchParams, updateCartFromParams, state.categories]);

  return (
    <>
      <Navigation />
      <div className="mb-[30px] mt-[90px] w-full px-[10px]">
        {state.categories.map((category) => (
          <MenuCategory
            key={category.id}
            category={category}
            categoryRefs={categoryRefs}
          />
        ))}
      </div>

      {/* To cart button */}
      <div
        onClick={() => navigate("/cart")}
        className="align-center fixed bottom-0 flex h-[50px] w-full justify-center bg-button text-center text-base leading-[14px] text-white"
      >
        <p className="my-auto h-fit text-lg font-semibold">
          Корзина: {currencyFormatter(sumCurrency(state.cart))}
        </p>
      </div>
    </>
  );
}

export default MainPage;
