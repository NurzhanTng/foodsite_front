import { useAppSelector } from "../store/hooks.ts";
import CartElement from "../features/CartElement";
import Button from "../shared/Button.tsx";
import { useNavigate } from "react-router-dom";

const CartElements = () => {
  const state = useAppSelector((state) => state.main);
  const navigate = useNavigate();

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

      {state.cart.length === 0 && <p className="text-white text-base font-normal pt-3 mb-[20px]">Пусто</p>}

      <Button
        type="submit"
        onClick={() => navigate('/menu')}
        className={"h-[50px] mt-[20px] mb-[50px] w-full"}
        styleType="outline"
        text="Перейти к меню"
      />
    </div>
  );
};

export default CartElements;
