import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../../hooks/useCart.ts";
import { useCallback, useEffect, useState } from "react";
import { OrderProduct } from "../../../utils/Types.ts";
import { addProductToCart } from "../../../store/slices/mainSlice.ts";
import { setOrderActions } from "../../../store/slices/loyaltySlice.ts";

const useMainHook = () => {
  const state = useAppSelector((state) => state.main);
  const loyaltyState = useAppSelector((state) => state.loyalty);
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
    price: sumOneOrderProduct({
      product: product,
      active_modifier: null,
      additions: [],
      amount: 1,
      price: 0,
      client_comment: "",
    }),
    client_comment: "",
  });

  useEffect(() => {
    if (state.categories && orderProduct.product === undefined) {
      const timerId = setTimeout(() => {
        const product = getProductById(
          parseInt(dishId !== undefined ? dishId : "0"),
        );
        setOrderProduct((oldProduct) => {
          return { ...oldProduct, product: product };
        });
      }, 1000); // Adjust the delay time as needed (in milliseconds)

      return () => clearTimeout(timerId); // Clear the timeout on component unmount or dependency change
    }
  }, [dishId, getProductById, orderProduct.product, state.categories]);

  const handleClick = useCallback(
    (isProductOnAction: boolean, price: number) => {
      if (
        product?.modifiers.length !== 0 &&
        orderProduct.active_modifier === null
      )
        return;
      orderProduct.price = price;
      const usedAction = product?.id
        ? loyaltyState.productActions[product?.id][0]
        : undefined;
      if (isProductOnAction && usedAction !== undefined) {
        orderProduct.usedAction = usedAction.id;
        const isActionUsedBefore =
          loyaltyState.orderActions.find(
            (action) => action.id === usedAction.id,
          ) !== undefined;
        isActionUsedBefore &&
          dispatch(setOrderActions([...loyaltyState.orderActions, usedAction]));
      }
      dispatch(addProductToCart(orderProduct));
      navigate("/menu");
    },
    [dispatch, navigate, orderProduct, product?.modifiers.length],
  );

  return {
    product,
    navigate,
    orderProduct,
    setOrderProduct,
    handleClick,
    sumOneOrderProduct,
    state,
  };
};

export default useMainHook;
