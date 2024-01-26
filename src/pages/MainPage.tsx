import Navigation from "../components/Navigation.tsx";
import MenuCategory from "../components/MenuCategory.tsx";
import useScrollEffect from "../hooks/useScrollEffect.ts";
import { useAppSelector } from "../store/hooks.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";
import useCart from "../hooks/useCart.ts";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency } = useCart();
  const navigate = useNavigate();

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
        onClick={() => navigate('/cart')}
        className="flex align-center justify-center fixed bottom-0 h-[50px] w-full bg-button text-center text-sm leading-[14px] text-white">
        <p className='h-fit my-auto text-sm font-semibold'>Корзина: {currencyFormatter(sumCurrency(state.cart))}</p>
      </div>
    </>
  );
}

export default MainPage;
