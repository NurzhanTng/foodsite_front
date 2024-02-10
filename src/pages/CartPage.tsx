import { useAppSelector } from "../store/hooks.ts";
import CartElement from "../components/CartElement.tsx";
import useCart from "../hooks/useCart.ts";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBookOpen,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const state = useAppSelector((state) => state.main);
  const { cartToJson, updateCartFromParams, deleteCartProducts } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    updateCartFromParams(searchParams.get("cart"));
  }, [searchParams, updateCartFromParams, state.categories]);

  const handleOrderClick = () => {
    if (state.cart.length === 0) return;
    const tg = window.Telegram.WebApp;
    tg.sendData(cartToJson());
    tg.close();
    // console.log(cartToJson());

    // fetch(import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: cartToJson(),
    // })
    //   .then((data) => {
    //     console.log(data.status);
    //     console.log(data.json())
    //   })
    //   .catch((err) => console.log("Error: " + err));
  };

  const handleMenuClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    deleteCartProducts();
  };

  return (
    <div className="relative pt-5 pb-[130px]">
      {state.cart.map((cartElement, index) => {
        return <CartElement key={index} element={cartElement} index={index} />;
      })}

      {/* Кнопка оформления заказа */}
      <div className="align-center fixed bottom-0 flex h-[130px] w-full flex-col justify-center  text-center text-sm leading-[14px] text-white">
        <div
          onClick={handleCartClick}
          className="align-center flex h-[40px] mb-[5px] rounded mx-[10px] w-[calc(100%-20px)] justify-center border-b-[1px] border-secondary bg-button text-center text-sm leading-[14px] text-white"
        >
          <p className="my-auto h-fit text-lg">
            <FontAwesomeIcon icon={faTrash} className="pr-2" />
            Очистить корзину
          </p>
        </div>
        <div
          onClick={handleMenuClick}
          className="align-center flex h-[40px] mb-[5px] rounded mx-[10px] w-[calc(100%-20px)] justify-center border-b-[1px] border-secondary bg-button text-center text-sm leading-[14px] text-white"
        >
          <p className="my-auto h-fit text-lg">
            <FontAwesomeIcon icon={faBookOpen} className="pr-2" />
            Вернуться к меню
          </p>
        </div>
        <div
          onClick={handleOrderClick}
          className="align-center flex h-[40px] rounded mx-[10px] w-[calc(100%-20px)] justify-center border-b-[1px] border-secondary bg-button text-center text-sm leading-[14px] text-white"
        >
          <p className="my-auto h-fit text-lg">
            <FontAwesomeIcon icon={faReceipt} className="pr-2" />
            Оформить заказ
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
