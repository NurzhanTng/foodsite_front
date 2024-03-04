import Cashback from "../../../shared/Cashback.tsx";
import CartPageHeader from "./CartPageHeader.tsx";


const CartPage = () => {

  return (
    <div className="mt-[90px] px-5 h-[1400px]">
      <CartPageHeader />
      <Cashback className="mb-4" amount={10000} cashback={7} />
    </div>
  );
};

export default CartPage;
