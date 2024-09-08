import { TagContainer } from "../../../entities/Dish";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useMainHook from "../hooks/useMainHook.ts";
import useActions from "../../../hooks/useActions.ts";
import Button from "../../../shared/Button.tsx";

function DishPage() {
  const {
    product,
    navigate,
    orderProduct,
    setOrderProduct,
    handleClick,
    sumOneOrderProduct,
    state,
  } = useMainHook();
  const {
    getTagTextByAction,
    isProductHaveActions,
    getProductModifierPriceByActions,
    getProductPriceByActions,
  } = useActions();

  if (product === undefined) return <div />;

  const isProductOnAction = isProductHaveActions(product);
  const tagText = getTagTextByAction(product);
  let tags = product.tags;
  if (tagText) {
    tags = [
      ...tags,
      {
        name: tagText,
        tag_color: "#FF0000",
      },
    ];
  }

  const getOrderPrice = () => {
    if (isProductOnAction) {
      const additionsPrice = orderProduct.additions.reduce(
        (sum, addition) => sum + addition.price,
        0,
      );
      const price =
        product.modifiers.length === 0
          ? getProductPriceByActions(product)
          : orderProduct.active_modifier === null
            ? 0
            : getProductPriceByActions(product);
      return (price + additionsPrice) * orderProduct.amount;
    } else {
      return sumOneOrderProduct(orderProduct);
    }
  };

  return (
    <div className="relative mb-[90px] min-h-[calc(100vh-90px)]">
      {/* Абсолютные расположенные теги */}
      <TagContainer tags={tags} className="absolute right-5 top-5" />

      {/* Кнопка назад */}
      <div
        onClick={() => navigate("/menu")}
        className="fixed left-[20px] top-[15px] rounded-full px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      {/* Картинка блюда */}
      <div
        style={{ backgroundImage: `url(${product?.image_url})` }}
        className="mb-5 h-[300px] bg-transparent bg-cover bg-center shadow-image"
      />

      {/* Внешний контейнер */}
      <div className="px-3">
        {/* Описание блюда */}
        <h4 className="mb-3 text-base font-bold text-white">{product?.name}</h4>
        <p className="mb-6 text-xs text-fontSecondary">
          {product?.description}
        </p>

        {/* Выбрать тип блюда */}
        {product?.modifiers.length !== 0 && (
          <>
            <p className="mb-1 ml-3 text-xs font-semibold text-fontSecondary2">
              Выберите вариант блюда
            </p>
            <div className="mb-6 rounded-[6px] shadow-option">
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
                    <div>
                      <p
                        className={
                          modifier.id === orderProduct.active_modifier
                            ? ""
                            : "text-button"
                        }
                      >
                        {currencyFormatter(
                          getProductModifierPriceByActions(modifier, product),
                          modifier.currency,
                        )}
                      </p>
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
        {product?.additions.length !== 0 && (
          <>
            <p className="mb-1 ml-3 text-xs font-semibold text-fontSecondary2">
              Дополнительно
            </p>
            <div className="mb-6 rounded-[6px] shadow-option">
              {product?.additions.map((addition, index) => {
                return (
                  <div
                    key={index}
                    className={`
                    ${orderProduct.additions.includes(addition) ? "bg-button" : "bg-bgColor2"} 
                    ${index === 0 ? "rounded-t-[6px]" : ""}
                    ${index === product?.additions.length - 1 ? "rounded-b-[6px]" : ""}
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
        {state.cart.filter((_product) => _product.product?.id === product?.id)
          .length > 0 && (
          <div className="rounded-[6px] bg-bgColor2 px-3 pb-2 pt-3 shadow-option">
            <p className="mb-2 text-xs font-semibold text-fontSecondary">
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
                            (modifier) => modifier.id == order.active_modifier,
                          )?.name
                        }
                      </p>
                      <div>
                        {order.additions.map((addition) => {
                          return (
                            <p className="mt-1 text-fontSecondary">
                              {addition.name}
                            </p>
                          );
                        })}
                      </div>
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
          <Button
            onClick={() =>
              setOrderProduct((oldProduct) => {
                return {
                  ...oldProduct,
                  amount: oldProduct.amount > 1 ? oldProduct.amount - 1 : 1,
                };
              })
            }
            className="my-auto p-3"
            showText={false}
            showIcon={true}
            iconType="minus"
          />
          <p className="my-auto h-fit flex-1 text-center">
            {orderProduct.amount}
          </p>
          <Button
            onClick={() =>
              setOrderProduct((oldProduct) => {
                return { ...oldProduct, amount: oldProduct.amount + 1 };
              })
            }
            className="my-auto p-3"
            showText={false}
            showIcon={true}
            iconType="plus"
          />
        </div>
        <Button
          className="py-[9px] text-sm"
          onClick={() => handleClick(isProductOnAction, getOrderPrice())}
          text={`Добавить ${currencyFormatter(getOrderPrice())}`}
        />
      </div>
    </div>
  );
}

export default DishPage;
