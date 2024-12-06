// import Cashback from "../../../shared/Cashback.tsx";
import CartPageHeader from "./CartPageHeader.tsx";
import CartElements from "../../../widget/CartElements.tsx";
import Button from "../../../shared/Button.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import CartPrice from "../../../widget/CartPrice.tsx";
import { CommentPopup, TimePopup } from "../../../features/Popups";
import useCart from "../../../hooks/useCart.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect } from "react";
import { setCart, setErrors } from "../../../store/slices/mainSlice.ts";
import ErrorPopup from "./ErrorPopup.tsx";
import { useNavigate } from "react-router-dom";
import { Action, setOrderActions } from "../../../store/slices/loyaltySlice.ts";
import { OrderProduct } from "../../../utils/Types.ts";
import CartAdditions from "../../../widget/CartAdditions.tsx";
import Icon from "../../../shared/Icon";
import SelectCard from "../../../entities/SelectCard.tsx";
// import Footer from "./Footer.tsx";

const CartPage = () => {
  const errors = useAppSelector((state) => state.main.errors);
  const state = useAppSelector((state) => state.main);
  const orderState = useAppSelector((state) => state.order);
  const DeliveryActions = useAppSelector((state) =>
    state.loyalty.actions.filter(
      (action) => action.triggers[0].isDelivery !== undefined,
    ),
  );
  const orderActions = useAppSelector((state) => state.loyalty.orderActions);
  const {
    isButtonInactive,
    deleteCartProducts,
    handleOrderClick,
    usePopup,
    sumCurrency,
    sumOneOrderProduct,
  } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPriceByDeliveryAction = (
    action: Action,
    orderProduct: OrderProduct,
  ) => {
    let productPrice = sumOneOrderProduct(orderProduct);

    for (const payload of action.payloads) {
      if (payload.new_price) {
        productPrice = payload.new_price;
      } else if (payload.discount_amount) {
        productPrice =
          Math.max(productPrice, payload.discount_amount) -
          payload.discount_amount;
      } else if (payload.discount_percent) {
        productPrice *= 1 - payload.discount_percent / 100;
      }
    }

    return productPrice;
  };

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

    console.log(DeliveryActions);
    if (DeliveryActions.length === 0) return;
    const action = DeliveryActions[0];

    dispatch(
      setCart(
        state.cart.map((orderProduct) =>
          orderProduct.usedAction === undefined
            ? {
                ...orderProduct,
                price:
                  action.triggers[0].isDelivery === orderState.isDelivery
                    ? getPriceByDeliveryAction(action, orderProduct)
                    : orderProduct.price,
                usedAction:
                  action.triggers[0].isDelivery === orderState.isDelivery
                    ? action.id
                    : undefined,
              }
            : orderProduct.usedAction === action.id
              ? action.triggers[0].isDelivery === orderState.isDelivery
                ? orderProduct
                : {
                    ...orderProduct,
                    price: sumOneOrderProduct(orderProduct),
                    usedAction: undefined,
                  }
              : orderProduct,
        ),
      ),
    );

    const indexOfDelivery = orderActions.findIndex(
      (orAction) => action.id === orAction.id,
    );
    const areUsed = action.triggers[0].isDelivery === orderState.isDelivery;
    if (areUsed && indexOfDelivery === -1)
      dispatch(setOrderActions([...orderActions, action]));
    else if (!areUsed && indexOfDelivery !== -1)
      dispatch(
        setOrderActions(
          orderActions.filter((orderAction) => orderAction.id !== action.id),
        ),
      );

    // else if (areUsed && indexOfDelivery !== -1)
    //   continue
    // else if (!areUsed && indexOfDelivery === -1)
    //   continue
  }, []);

  useEffect(() => {
    console.log("orderActions");
    console.log(orderActions);
  }, [orderActions]);

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
        <CartAdditions />

        <SelectCard
          id="time_input"
          leftIcon="clock"
          name={
            orderState.done_time === null || orderState.done_time === ""
              ? "Время приготовления"
              : orderState.done_time === "00:00"
                ? "Как можно скорее"
                : orderState.done_time
          }
          isError={errors.time}
          description={orderState.done_time ? "Время приготовления" : ""}
          onClick={usePopup.toggleTime}
        >
          <Icon className="my-auto h-5 w-5" type="arrowRight" />
        </SelectCard>

        {/*<CartAdditions />*/}
        {/*<CartAddressAndTime toggleTime={usePopup.toggleTime} />*/}
        {/*<CartPayments />*/}
        <CartPrice />
      </form>
      {/*<Footer />*/}
      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col gap-[2px] bg-bgColor2">
        <Button
          type="submit"
          onClick={() => navigate("/menu")}
          disabled={isButtonInactive}
          styleType={isButtonInactive ? "inactive" : "primary"}
          showIcon={true}
          iconType="arrowLeft"
          className={"h-[50px] w-full rounded-none"}
          text={`Открыть меню`}
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
