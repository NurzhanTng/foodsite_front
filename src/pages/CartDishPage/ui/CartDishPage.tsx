import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../../hooks/useCart.ts";
import { useCallback, useState } from "react";
import ProductTag from "../../../entities/Dish/ui/ProductTag.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { OrderProduct } from "../../../utils/Types.ts";
import { setCart } from "../../../store/slices/mainSlice.ts";
import isArraysEqual from "../../../utils/isArraysEqual.ts";
import useActions from "../../../hooks/useActions.ts";

function CartDishPage() {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { product_index } = useParams();
  const { sumOneOrderProduct } = useCart();
  const navigate = useNavigate();
  const {
    getTagTextByAction,
    isProductHaveActions,
    getProductModifierPriceByActions,
    getProductPriceByActions,
  } = useActions();

  const orderProductIndex = parseInt(
    product_index === undefined ? "0" : product_index,
  );
  const [orderProduct, setOrderProduct] = useState<OrderProduct>({
    ...state.cart[orderProductIndex],
  });

  const handleClick = useCallback(
    (price: number | null = null) => {
      console.log(orderProduct);
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

      dispatch(
        setCart(
          state.cart
            .map((oldOrderProduct, index) => {
              if (index !== orderProductIndex) {
                return {
                  ...oldOrderProduct,
                  price: sumOneOrderProduct({
                    ...oldOrderProduct,
                    amount:
                      same_product === -1
                        ? oldOrderProduct.amount
                        : oldOrderProduct.amount + orderProduct.amount,
                  }),
                  amount:
                    same_product === -1
                      ? oldOrderProduct.amount
                      : oldOrderProduct.amount + orderProduct.amount,
                };
              } else {
                return {
                  ...orderProduct,
                  price: price
                    ? price
                    : sumOneOrderProduct({
                        ...orderProduct,
                        amount: same_product === -1 ? orderProduct.amount : 0,
                      }),
                  amount: same_product === -1 ? orderProduct.amount : 0,
                };
              }
            })
            .filter((orderProduct) => orderProduct.amount !== 0),
        ),
      );
      navigate("/cart");
    },
    [dispatch, navigate, orderProduct, orderProductIndex, state.cart],
  );

  const getOrderPrice = () => {
    if (isProductOnAction && orderProduct.product) {
      const additionsPrice = orderProduct.additions.reduce(
        (sum, addition) => sum + addition.price,
        0,
      );
      const price =
        orderProduct.product.modifiers.length === 0
          ? getProductPriceByActions(orderProduct.product)
          : orderProduct.active_modifier === null
            ? 0
            : getProductPriceByActions(orderProduct.product);
      return (price + additionsPrice) * orderProduct.amount;
    } else {
      return sumOneOrderProduct(orderProduct);
    }
  };

  if (orderProduct.product === undefined) {
    navigate("/cart3");
    return;
  }

  const isProductOnAction = isProductHaveActions(orderProduct.product);
  const tagText = getTagTextByAction(orderProduct.product);
  let tags = orderProduct.product.tags;
  if (tagText) {
    tags = [
      ...tags,
      {
        name: tagText,
        tag_color: "#FF0000",
      },
    ];
  }

  return (
    <div className="relative mb-[90px] min-h-[calc(100vh-90px)]">
      {/* Абсолютные расположенные теги */}
      <div className="absolute right-5 top-5 flex flex-col gap-2">
        {tags.map((tag, index) => (
          <ProductTag
            className={"ml-auto px-2 text-sm"}
            key={index}
            tag={tag}
          />
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
        className="mb-5 h-[300px] bg-transparent bg-cover bg-center shadow-image"
      />

      {/* Внешний контейнер */}
      <div className="px-3">
        {/* Описание блюда */}
        <h4 className="mb-3 text-base font-bold text-white">
          {orderProduct.product?.name}
        </h4>
        <p className="mb-6 text-xs text-fontSecondary">
          {orderProduct.product?.description}
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
                    <div>
                      {orderProduct.product && (
                        <p
                          className={
                            modifier.id === orderProduct.active_modifier
                              ? ""
                              : "text-button"
                          }
                        >
                          {currencyFormatter(
                            getProductModifierPriceByActions(
                              modifier,
                              orderProduct.product,
                            ),
                            modifier.currency,
                          )}
                        </p>
                      )}
                      {isProductOnAction && (
                        <p className="relative my-auto inline-block w-fit text-xs text-[#FF0000] after:absolute after:left-[-5%] after:top-1/2 after:block after:h-[1px] after:w-[110%] after:origin-center after:rotate-[-7deg] after:bg-current after:content-['']">
                          {currencyFormatter(modifier.price, modifier.currency)}
                        </p>
                      )}
                    </div>
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
                    ${index === (orderProduct.product?.additions.length !== undefined && orderProduct.product?.modifiers.length - 1) ? "rounded-b-[6px]" : ""}
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
          onClick={() => handleClick(getOrderPrice())}
        >
          Сохранить {currencyFormatter(getOrderPrice())}
        </div>
      </div>
    </div>
  );
}

export default CartDishPage;
