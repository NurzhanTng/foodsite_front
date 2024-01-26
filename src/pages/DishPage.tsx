import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart.ts";
import { useCallback, useEffect, useState } from "react";
import ProductTag from "../components/ProductTag.tsx";
import { OrderProduct } from "../Types.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { addProductToCart } from "../store/slices/mainSlice.ts";

function DishPage() {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { dishId } = useParams();
  const { getProductById, sumOneOrderProduct } = useCart();
  const navigate = useNavigate();

  const product = getProductById(parseInt(dishId !== undefined ? dishId : "0"));
  const [orderProduct, setOrderProduct] = useState<OrderProduct>({
    product: product,
    active_modifier: null,
    additions: [],
    amount: 1,
    client_comment: "",
  });

  useEffect(() => {
    if (state.categories && orderProduct.product === undefined) {
      const product = getProductById(parseInt(dishId !== undefined ? dishId : "0"));
      console.log('State update product:')
      console.log(product)
      setOrderProduct((oldProduct) => { return {...oldProduct, product: product} })
    }
  }, [dishId, getProductById, orderProduct.product, state.categories]);

  const handleClick = useCallback(() => {
    if (
      product?.modifiers.length !== 0 &&
      orderProduct.active_modifier === null
    )
      return;
    dispatch(addProductToCart(orderProduct));
    navigate("/");
  }, [dispatch, navigate, orderProduct, product?.modifiers.length]);

  return (
    <div className="relative mb-[70px] min-h-[100vh]">
      {/* Абсолютные расположенные теги */}
      <div className="absolute left-3 top-3 flex flex-col gap-2">
        {product?.tags.map((tag, index) => (
          <ProductTag className={"px-2"} key={index} tag={tag} />
        ))}
      </div>

      {/* Картинка блюда */}
      <div
        style={{ backgroundImage: `url(${product?.image_url})` }}
        className="shadow-image mb-5 h-[200px] bg-transparent bg-cover"
      ></div>

      {/* Внешний контейнер */}
      <div className="px-3">
        {/* Описание блюда */}
        <h4 className="mb-3 text-base font-bold text-white">{product?.name}</h4>
        <p className="mb-6 text-xs text-fontSecondary">{product?.name}</p>

        {/* Выбрать тип блюда */}
        {product?.modifiers.length !== 0 && (
          <>
            <p className="text-fontSecondary2 mb-1 ml-3 text-xs font-semibold">
              Выберите вариант блюда
            </p>
            <div className="shadow-option mb-6 rounded-[6px]">
              {product?.modifiers.map((modifier, index) => {
                return (
                  <div
                    key={index}
                    className={`
                    ${orderProduct.active_modifier === modifier.id ? "bg-button" : "bg-bgColor2"} 
                    ${index === 0 ? "rounded-t-[6px]" : ""}
                    ${index === product?.modifiers.length - 1 ? "rounded-b-[6px]" : ""}
                    flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white
                  `}
                    onClick={() => {
                      setOrderProduct((oldProduct) => {
                        return {
                          ...oldProduct,
                          active_modifier:
                            oldProduct.active_modifier === modifier.id
                              ? null
                              : modifier.id,
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
        {product?.additions.length !== 0 && (
          <>
            <p className="text-fontSecondary2 mb-1 ml-3 text-xs font-semibold">
              Дополнительно
            </p>
            <div className="shadow-option mb-6 rounded-[6px]">
              {product?.additions.map((addition, index) => {
                return (
                  <div
                    key={index}
                    className={`
                    ${orderProduct.additions.includes(addition) ? "bg-button" : "bg-bgColor2"} 
                    ${index === 0 ? "rounded-t-[6px]" : ""}
                    ${index === product?.modifiers.length - 1 ? "rounded-b-[6px]" : ""}
                    flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white
                  `}
                    onClick={() => {
                      setOrderProduct((oldProduct) => {
                        return {
                          ...oldProduct,
                          additions: oldProduct.additions.includes(addition)
                            ? [
                                ...oldProduct.additions.filter(
                                  (item) => item !== addition,
                                ),
                              ]
                            : [...oldProduct.additions, addition],
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

        {/* Часть корзины с этими блюдами */}
        {product?.modifiers.length !== 0 &&
          state.cart.filter((_product) => _product.product?.id === product?.id)
            .length > 0 && (
            <div className="shadow-option rounded-[6px] bg-bgColor2 px-3 pb-2 pt-3">
              <p className="mb-1 text-xs font-semibold text-fontSecondary">
                В корзине
              </p>
              {state.cart
                .filter((_product) => _product.product?.id === product?.id)
                .map((order, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index !== 0 ? "border-t-[1px] border-secondary" : ""} flex flex-row justify-between bg-bgColor2 py-2 text-xs leading-[14px] text-white`}
                    >
                      <div>
                        <p>{order.product?.name}</p>
                        <p className="mt-1 text-fontSecondary">
                          {
                            order.product?.modifiers.find(
                              (modifier) =>
                                modifier.id == order.active_modifier,
                            )?.name
                          }
                        </p>
                      </div>
                      <p className="my-auto h-fit font-semibold">
                        {order.amount} шт
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
      </div>

      {/* Абсолютное меню добавления */}
      <div className="fixed bottom-0 flex w-full flex-row justify-between gap-6 border-t-[1px] border-secondary bg-bgColor2 px-3 py-2">
        <div className="flex flex-1 flex-row gap-3">
          <div
            className="flex-1 rounded-[6px] bg-button p-3 text-center text-xl font-bold leading-[14px] text-white"
            onClick={() =>
              setOrderProduct((oldProduct) => {
                return {
                  ...oldProduct,
                  amount: oldProduct.amount > 1 ? oldProduct.amount - 1 : 1,
                };
              })
            }
          >
            -
          </div>
          <p className="my-auto h-fit flex-1 text-center">
            {orderProduct.amount}
          </p>
          <div
            className="flex-1 rounded-[6px] bg-button p-3 text-center text-xl  font-bold leading-[14px] text-white"
            onClick={() =>
              setOrderProduct((oldProduct) => {
                return { ...oldProduct, amount: oldProduct.amount + 1 };
              })
            }
          >
            +
          </div>
        </div>
        <div
          className="flex-1 rounded-[6px] bg-button p-3 text-center text-sm leading-[14px] text-white"
          onClick={handleClick}
        >
          Добавить {currencyFormatter(sumOneOrderProduct(orderProduct))}
        </div>
      </div>
    </div>
  );
}

export default DishPage;
