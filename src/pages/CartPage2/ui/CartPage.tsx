import CartPageHeader from "./CartPageHeader.tsx";
import CartAdditions from "../../../widget/CartAdditions.tsx";
import Button from "../../../shared/Button.tsx";
import CartAddressAndTime from "../../../widget/CartAddressAndTime.tsx";
import { CommentPopup, TimePopup } from "../../../features/Popups";
import useCart from "../../../hooks/useCart.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";
import { setErrors } from "../../../store/slices/mainSlice.ts";
import ErrorPopup from "./ErrorPopup.tsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const state = useAppSelector((state) => state.main);
  const { handleErrors, deleteCartProducts, usePopup } = useCart();
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

  const onNext = () => {
    const errors = handleErrors({ kaspi_phone: true, cart: true });

    if (errors.name || errors.phone || errors.address || errors.time) {
      dispatch(setErrors(errors));
      return;
    }

    navigate("/cart3");
  };

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
        className="mb-[140px] mt-[90px] flex flex-col gap-[70px] px-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        <CartAdditions />
        <CartAddressAndTime toggleTime={usePopup.toggleTime} />
        {/*<CartTime />*/}
      </form>
      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col gap-[2px]">
        <Button
          type="submit"
          onClick={() => navigate("/menu")}
          showIcon={true}
          iconType="arrowLeft"
          styleType={"primary"}
          className={"h-[50px] w-full rounded-none"}
          text={`Перейти к меню`}
        />

        <Button
          type="submit"
          onClick={onNext}
          showIcon={true}
          iconType="arrowRight"
          styleType={"primary"}
          className={"h-[50px] w-full rounded-none"}
          text={`Оформить заказ`}
        />
      </div>
    </>
  );
};

export default CartPage;
