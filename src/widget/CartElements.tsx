import { useAppSelector } from "../store/hooks.ts";
import CartElement from "../features/CartElement";

const CartElements = () => {
  const state = useAppSelector((state) => state.main);

  return (
    <div>
      <h3 className="text-base font-medium text-textSecondary">Ваш заказ</h3>

      {state.cart.map((cartElement, index) => {
        return (
          <CartElement
            className={index == state.cart.length - 1 ? "border-0" : ""}
            key={index}
            element={cartElement}
            index={index}
          />
        );
      })}

      {state.cart.length === 0 && <p className="text-white text-base font-normal pt-3">Пусто</p>}
    </div>
  );
};

export default CartElements;
