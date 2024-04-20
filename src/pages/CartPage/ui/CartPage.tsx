import Cashback from "../../../shared/Cashback.tsx";
import CartPageHeader from "./CartPageHeader.tsx";
import CartElements from "../../../widget/CartElements.tsx";
import CartAdditions from "../../../widget/CartAdditions.tsx";
import CartPayments from "../../../widget/CartPayments.tsx";
import Button from "../../../shared/Button.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import CartPrice from "../../../widget/CartPrice.tsx";
import CartAddressAndTime from "../../../widget/CartAddressAndTime.tsx";
import { CommentPopup, TimePopup } from "../../../features/Popups";
import useCart from "../../../hooks/useCart.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { setErrors } from "../../../store/slices/mainSlice.ts";
import ErrorPopup from "./ErrorPopup.tsx";

const CartPage = () => {
  const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const { deleteCartProducts, handleOrderClick, usePopup, sumCurrency } =
    useCart();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setErrors({
        cart: false,
        name: false,
        phone: false,
        kaspi_phone: false,
        address: false,
      }),
    );
  }, []);

  if (state.errors === undefined) return <div />;

  return (
    <>
      <ErrorPopup />
      <CommentPopup
        show={usePopup.showComment}
        toggleShow={usePopup.toggleComment}
      />
      <TimePopup show={usePopup.showTime} toggleShow={usePopup.toggleTime} />
      <CartPageHeader
        elementsInCart={state.cart.length}
        onClear={deleteCartProducts}
      />
      <form
        className="my-[90px] flex flex-col gap-12 px-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        <Cashback amount={10000} cashback={7} />
        <CartElements />
        <CartAdditions toggleComment={usePopup.toggleComment} />
        <CartAddressAndTime toggleTime={usePopup.toggleTime} />
        <CartPayments />
        <CartPrice />
      </form>
      <Button
        type="submit"
        onClick={handleOrderClick}
        className={"fixed bottom-0 left-0 z-10 h-[50px] w-full rounded-none"}
        text={`Оплатить ${currencyFormatter(sumCurrency(state.cart) - (orderState.bonus_used ? Math.min(sumCurrency(state.cart), orderState.max_bonus) : 0))}`}
      />
    </>
  );
};

export default CartPage;
