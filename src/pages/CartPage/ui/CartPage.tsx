import Cashback from "../../../shared/Cashback.tsx";
import CartPageHeader from "./CartPageHeader.tsx";
import CartElements from "../../../widget/CartElements.tsx";
import CartAdditions from "../../../widget/CartAdditions.tsx";
import CartPayments from "../../../widget/CartPayments.tsx";
import Button from "../../../shared/Button.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import useMenu from "../../MenuPage/hooks/useMenu.ts";
import useCart from "../../../hooks/useCart.ts";
import CartPrice from "../../../widget/CartPrice.tsx";
import CartAddressAndTime from "../../../widget/CartAddressAndTime.tsx";


const CartPage = () => {
  const { state, sumCurrency } = useMenu();
  const { deleteCartProducts } = useCart();

  return (
    <div className="my-[90px] px-5 gap-12 flex flex-col">
      <CartPageHeader elementsInCart={state.cart.length} onClear={deleteCartProducts} />
      <Cashback amount={10000} cashback={7} />
      <CartElements />
      <CartAdditions />
      <CartAddressAndTime />
      <CartPayments />
      <CartPrice />
      <Button
        className={"fixed bottom-0 left-0 h-[50px] w-full rounded-none z-10"}
        onClick={() => {}}
        text={`Оплатить ${currencyFormatter(sumCurrency(state.cart))}`}
      />
    </div>
  );
};

export default CartPage;
