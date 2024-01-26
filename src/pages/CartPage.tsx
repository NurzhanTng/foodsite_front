import { useAppSelector } from "../store/hooks.ts";
import CartElement from "../components/CartElement.tsx";

const CartPage = () => {
  const state = useAppSelector((state) => state.main);

  const handleClick = () => {
    const tg = window.Telegram.WebApp;
    tg.sendData('hello from webApp');
    tg.close()
  }

  return (
    <div className="relative pt-5">
      {state.cart.map((cartElement, index) => {
        return <CartElement key={index} element={cartElement} index={index} />;
      })}

      {/* Кнопка оформления заказа */}
      <div
        onClick={handleClick}
        className="align-center fixed bottom-0 flex h-[50px] w-full justify-center bg-button text-center text-sm leading-[14px] text-white"
      >
        <p className="my-auto h-fit text-lg font-semibold">Оформить заказ</p>
      </div>
    </div>
  );
};

export default CartPage;
