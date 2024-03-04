import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart.ts";
import { useCallback, useState } from "react";
import ProductTag from "../shared/ProductTag.tsx";
import currencyFormatter from "../utils/currencyFormatter.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { OrderProduct } from "../utils/Types.ts";
import { setCart } from "../store/slices/mainSlice.ts";
import isArraysEqual from "../utils/isArraysEqual.ts";

function DishPage() {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { product_index } = useParams();
  const { sumOneOrderProduct } = useCart();
  const navigate = useNavigate();

  const orderProductIndex = parseInt(
    product_index === undefined ? "0" : product_index,
  );
  const [orderProduct, setOrderProduct] = useState<OrderProduct>({
    ...state.cart[orderProductIndex],
  });

  const handleClick = useCallback(() => {
    const same_product = state.cart.findIndex((oldOrderProduct) => {
      return (
        oldOrderProduct.product?.id === orderProduct.product?.id &&
        oldOrderProduct.active_modifier === orderProduct.active_modifier &&
        isArraysEqual(
          oldOrderProduct.additions.map((addition) => addition.id),
          orderProduct.additions.map((addition) => addition.id),
        ) &&
        oldOrderProduct.product?.price === null
      );
    });
    console.log(same_product)

    dispatch(
      setCart(
        state.cart
          .map((oldOrderProduct, index) => {
            if (index !== orderProductIndex) {
              return {
                ...oldOrderProduct,
                amount:
                  same_product === -1
                    ? oldOrderProduct.amount
                    : oldOrderProduct.amount + orderProduct.amount,
              };
            } else {
              return {
                ...orderProduct,
                amount: same_product === -1 ? orderProduct.amount : 0,
              };
            }
          })
          .filter((orderProduct) => orderProduct.amount !== 0),
      ),
    );
    navigate("/cart");
  }, [dispatch, navigate, orderProduct, orderProductIndex, state.cart]);

  return (
    <div className="relative mb-[70px] min-h-[calc(100vh-70px)]">
      {/* Абсолютные расположенные теги */}
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        {orderProduct.product?.tags.map((tag, index) => (
          <ProductTag className={"ml-auto px-2"} key={index} tag={tag} />
        ))}
      </div>

      {/* Кнопка назад */}
      <div
        onClick={() => navigate("/cart")}
        className="fixed left-[20px] top-[15px] rounded-full px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      {/* Картинка блюда */}
      <div
        style={{ backgroundImage: `url(${orderProduct.product?.image_url})` }}
        className="mb-5 h-[300px] bg-transparent bg-cover shadow-image"
      />

      {/* Внешний контейнер */}
      <div className="px-3">
        {/* Описание блюда */}
        <h4 className="mb-3 text-base font-bold text-white">
          {orderProduct.product?.name}
        </h4>
        <p className="mb-6 text-xs text-fontSecondary">
          {orderProduct.product?.name}
        </p>

        {/* Выбрать тип блюда */}
        {orderProduct.product?.modifiers.length !== 0 && (
          <>
            <p className="mb-1 ml-3 text-xs font-semibold text-fontSecondary2">
              Выберите вариант блюда
            </p>
            <div className="mb-6 rounded-[6px] shadow-option">
              {orderProduct.product?.modifiers.map((modifier, index) => {
                return (
                  <div
                    key={index}
                    className={`
                    ${orderProduct.active_modifier === modifier.id ? "bg-button" : "bg-bgColor2"}
                    ${index === 0 ? "rounded-t-[6px]" : ""}
                    ${index === (orderProduct.product?.modifiers.length !== undefined && orderProduct.product?.modifiers.length) ? "rounded-b-[6px]" : ""}
                    flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white
                  `}
                    onClick={() => {
                      setOrderProduct((orderProduct) => {
                        return {
                          ...orderProduct,
                          active_modifier: modifier.id,
                        };
                      });
                    }}
                  >
                    <p>{modifier.name}</p>
                    <p
                      className={
                        modifier.id === orderProduct.active_modifier
                          ? ""
                          : "text-button"
                      }
                    >
                      {currencyFormatter(modifier.price, modifier.currency)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Дополнительные продукты */}
        {orderProduct.product?.additions.length !== 0 && (
          <>
            <p className="mb-1 ml-3 text-xs font-semibold text-fontSecondary2">
              Дополнительно
            </p>
            <div className="mb-6 rounded-[6px] shadow-option">
              {orderProduct.product?.additions.map((addition, index) => {
                return (
                  <div
                    key={index}
                    className={`
                    ${orderProduct.additions.includes(addition) ? "bg-button" : "bg-bgColor2"}
                    ${index === 0 ? "rounded-t-[6px]" : ""}
                    ${index === (orderProduct.product?.modifiers.length !== undefined && orderProduct.product?.modifiers.length - 1) ? "rounded-b-[6px]" : ""}
                    flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white
                  `}
                    onClick={() => {
                      setOrderProduct((orderProduct) => {
                        return {
                          ...orderProduct,
                          additions: orderProduct.additions.includes(addition)
                            ? [
                                ...orderProduct.additions.filter(
                                  (item) => item !== addition,
                                ),
                              ]
                            : [...orderProduct.additions, addition],
                        };
                      });
                    }}
                  >
                    <p>{addition.name}</p>
                    <p
                      className={
                        orderProduct.additions.includes(addition)
                          ? ""
                          : "text-button"
                      }
                    >
                      +{currencyFormatter(addition.price, addition.currency)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Абсолютное меню добавления */}
      <div className="fixed bottom-0 flex w-full flex-row justify-between gap-6 border-t-[1px] border-secondary bg-bgColor2 px-3 py-2">
        <div className="flex flex-1 flex-row gap-3">
          <div
            className="flex-1 rounded-[6px] bg-button p-3 text-center text-xl font-bold leading-[14px] text-white"
            onClick={() => {
              if (orderProduct.amount > 0) {
                setOrderProduct((orderProduct) => {
                  return { ...orderProduct, amount: orderProduct.amount - 1 };
                });
              }
            }}
          >
            -
          </div>
          <p className="my-auto h-fit flex-1 text-center">
            {orderProduct.amount}
          </p>
          <div
            className="flex-1 rounded-[6px] bg-button p-3 text-center text-xl  font-bold leading-[14px] text-white"
            onClick={() => {
              setOrderProduct((orderProduct) => {
                return { ...orderProduct, amount: orderProduct.amount + 1 };
              });
            }}
          >
            +
          </div>
        </div>
        <div
          className="flex-1 rounded-[6px] bg-button p-3 text-center text-sm leading-[14px] text-white"
          onClick={handleClick}
        >
          Сохранить {currencyFormatter(sumOneOrderProduct(orderProduct))}
        </div>
      </div>
    </div>
  );
}

export default DishPage;
