import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../../hooks/useCart.ts";
import { useCallback, useEffect, useState } from "react";
import { OrderProduct } from "../../../utils/Types.ts";
import { addProductToCart } from "../../../store/slices/mainSlice.ts";

const useMainHook = () => {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { dishId } = useParams();
  const { getProductById, sumOneOrderProduct } = useCart();
  const navigate = useNavigate();

  const product = getProductById(parseInt(dishId !== undefined ? dishId : "0"));
  const [orderProduct, setOrderProduct] = useState<OrderProduct>({
    product: product,
    active_modifier: null,
    additions: [],
    amount: 1,
    client_comment: ""
  });

  useEffect(() => {
    if (state.categories && orderProduct.product === undefined) {
      const timerId = setTimeout(() => {
        const product = getProductById(
          parseInt(dishId !== undefined ? dishId : "0")
        );
        setOrderProduct((oldProduct) => {
          return { ...oldProduct, product: product };
        });
      }, 1000); // Adjust the delay time as needed (in milliseconds)

      return () => clearTimeout(timerId); // Clear the timeout on component unmount or dependency change
    }
  }, [dishId, getProductById, orderProduct.product, state.categories]);

  const handleClick = useCallback(() => {
    if (
      product?.modifiers.length !== 0 &&
      orderProduct.active_modifier === null
    )
      return;
    dispatch(addProductToCart(orderProduct));
    navigate("/menu");
  }, [dispatch, navigate, orderProduct, product?.modifiers.length]);

  return { product, navigate, orderProduct, setOrderProduct, handleClick, sumOneOrderProduct, state };
};

export default useMainHook;
