import { useAppSelector } from "../store/hooks/hooks.ts";
import CartElement from "../features/CartElement";
import Button from "../shared/Button.tsx";
import { useNavigate } from "react-router-dom";

type CartElementsProps = {
  toggleComment: () => void;
};

const CartElements = ({ toggleComment }: CartElementsProps) => {
  const cart = useAppSelector((state) => state.main.cart);
  const comment = useAppSelector((state) => state.order.client_comment);
  const navigate = useNavigate();

  return (
    <div id="cart_input">
      <h3 className="text-base font-medium text-textSecondary">Ваш заказ</h3>

      {cart.map((cartElement, index) => {
        return (
          <CartElement
            className={index == cart.length - 1 ? "border-0" : ""}
            key={index}
            element={cartElement}
            index={index}
          />
        );
      })}

      {cart.length === 0 && (
        <p className="mb-[20px] pt-3 text-base font-normal text-white">Пусто</p>
      )}

      <Button
        type="submit"
        onClick={() => navigate("/menu")}
        className={"mt-[20px] h-[50px] w-full"}
        styleType="outline"
        text="Перейти к меню"
      />

      <Button
        type="submit"
        onClick={() => toggleComment()}
        className={"mb-[10px] mt-[20px] w-full"}
        styleType="outline"
        text={
          comment === ""
            ? "Комментарий к заказу"
            : `Изменить комментарий: ${comment}`
        }
        textClassName="line-clamp-2"
      />
    </div>
  );
};
export default CartElements;
