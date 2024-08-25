// import Cashback from "../../../shared/Cashback.tsx";
import CartPageHeader from "./CartPageHeader.tsx";
import CartElements from "../../../widget/CartElements.tsx";
import CartPayments from "../../../widget/CartPayments.tsx";
import Button from "../../../shared/Button.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import CartPrice from "../../../widget/CartPrice.tsx";
import { CommentPopup, TimePopup } from "../../../features/Popups";
import useCart from "../../../hooks/useCart.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";
import { setErrors } from "../../../store/slices/mainSlice.ts";
import ErrorPopup from "./ErrorPopup.tsx";
import { useNavigate } from "react-router-dom";
// import Footer from "./Footer.tsx";

const CartPage = () => {
  const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const {
    isButtonInactive,
    deleteCartProducts,
    handleOrderClick,
    usePopup,
    sumCurrency,
  } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setErrors({
        cart: false,
        name: false,
        phone: false,
        kaspi_phone: false,
        address: false,
        time: false,
        cost: false,
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
        className="mb-[180px] mt-[90px] flex flex-col gap-[70px] px-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        {/*<Cashback amount={10000} cashback={7} />*/}
        <CartElements toggleComment={usePopup.toggleComment} />
        {/*<CartAdditions />*/}
        {/*<CartAddressAndTime toggleTime={usePopup.toggleTime} />*/}
        <CartPayments />
        <CartPrice />
      </form>
      {/*<Footer />*/}
      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col gap-[2px] bg-bgColor2">
        <Button
          type="submit"
          onClick={() => navigate("/cart2")}
          disabled={isButtonInactive}
          styleType={isButtonInactive ? "inactive" : "primary"}
          showIcon={true}
          iconType="arrowLeft"
          className={"h-[50px] w-full rounded-none"}
          text={`Данные заказа`}
        />

        <Button
          type="submit"
          onClick={handleOrderClick}
          disabled={isButtonInactive}
          styleType={isButtonInactive ? "inactive" : "primary"}
          className={"h-[50px] w-full rounded-none"}
          text={`Оплатить ${currencyFormatter(
            sumCurrency(state.cart) -
              (orderState.bonus_used
                ? Math.min(
                    sumCurrency(state.cart) +
                      (orderState.isDelivery
                        ? Number(orderState.delivery_amount)
                        : 0),
                    orderState.max_bonus,
                  )
                : 0) +
              (orderState.isDelivery ? Number(orderState.delivery_amount) : 0),
          )}`}
        />
      </div>
    </>
  );
};

export default CartPage;
