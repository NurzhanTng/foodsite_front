import { useAppSelector } from "../../../store/hooks.ts";
import useScrollEffect from "../../../hooks/useScrollEffect.ts";
import useCart from "../../../hooks/useCart.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";


const useMenu = () => {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency, updateCartFromParams } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    updateCartFromParams(searchParams.get("cart"));
  }, [searchParams, updateCartFromParams, state.categories]);

  return { state, categoryRefs, sumCurrency, navigate };
};

export default useMenu;
