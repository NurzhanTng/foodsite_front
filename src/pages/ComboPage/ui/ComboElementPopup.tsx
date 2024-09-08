import React, { useRef, useState, useEffect } from "react";
import { OrderProduct, Product, Modifiers } from "../../../utils/Types.ts";
import Popup from "../../../shared/Popup.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";

type ComboElementPopupProps = {
  allProducts: Product[];
  selectedOrderProduct: OrderProduct;
  show: boolean;
  onClick: (orderProduct: OrderProduct) => void;
};

const ComboElementPopup = ({
  allProducts,
  selectedOrderProduct,
  show,
  onClick,
}: ComboElementPopupProps) => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [currentProduct, setCurrentProduct] =
    useState<OrderProduct>(selectedOrderProduct);

  // Таймер для задержки
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [onTouch, setOnTouch] = useState(false);

  // Функция для вычисления ближайшего элемента к центру
  const handleScroll = () => {
    console.log("handleScroll");
    if (!mainRef.current) return;

    // Очистка предыдущего таймера
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Установка нового таймера
    scrollTimeoutRef.current = setTimeout(() => {
      if (!mainRef.current || onTouch) {
        console.log("89 return");
        return;
      }

      const container = mainRef.current;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestElement: Product | null = allProducts[0];
      let closestDistance = Infinity;

      allProducts.forEach((product) => {
        const element = document.getElementById(`prod-${product.id}`);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const elementCenterX = elementRect.left + elementRect.width / 2;

          const distance = Math.abs(centerX - elementCenterX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = product;
          }
        }
      });
      console.log(
        `closestElement: [${closestElement.id}] - [${closestElement.name}]`,
      );

      if (closestElement) {
        scrollToProduct(closestElement);
      }
    }, 100);
  };

  const scrollToProduct = (closestElement: Product) => {
    const updatedOrderProduct: OrderProduct = {
      product: closestElement,
      additions: [],
      price: 0,
      amount: 1,
      active_modifier:
        closestElement.price === null || closestElement.modifiers.length !== 0
          ? closestElement.modifiers[0].id
          : null,
      client_comment: "",
    };
    setCurrentProduct(updatedOrderProduct);
    const container = mainRef.current;
    if (container) {
      const targetElement = document.getElementById(
        `prod-${closestElement?.id}`,
      );
      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        container.scrollTo({
          left:
            container.scrollLeft +
            targetRect.left +
            targetRect.width / 2 -
            window.innerWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  const onTouchStart = () => {
    setOnTouch(true);
  };

  const onTouchEnd = () => {
    setOnTouch(false);
  };

  const getCurrentProductPrice = () => {
    const activeModifier = currentProduct.active_modifier
      ? currentProduct.product?.modifiers.find(
          (modifier) => modifier.id === currentProduct.active_modifier,
        )
      : undefined;
    const productPrice =
      activeModifier && currentProduct.product
        ? getProductModifierPrice(activeModifier, currentProduct.product)
        : 0;
    return (
      productPrice +
      currentProduct.additions.reduce(
        (sum, addition) => sum + addition.price,
        0,
      )
    );
  };

  useEffect(() => {
    const container = mainRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("touchstart", onTouchStart);
      container.addEventListener("touchend", onTouchEnd);
    }
    selectedOrderProduct.product &&
      scrollToProduct(selectedOrderProduct.product);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [allProducts]);

  const getProductModifierPrice = (modifier: Modifiers, product: Product) => {
    let lowestPrice = Infinity;
    for (const productModifier of product.modifiers) {
      if (lowestPrice > productModifier.price)
        lowestPrice = productModifier.price;
    }
    return modifier.price - lowestPrice;
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target: EventTarget | null = event.target;
    while (target !== null) {
      const targetElement = target as HTMLElement;
      if (targetElement.id?.startsWith("prod")) return;
      target = (target as HTMLElement).parentNode;
    }

    onClick(selectedOrderProduct);
  };

  return (
    <Popup
      show={show}
      toggleShow={() => {
        onClick(selectedOrderProduct);
      }}
      // onClick={() => onClick(selectedOrderProduct)}
      className="m-0 bg-transparent p-0 shadow-transparent"
    >
      <div className="flex">
        <div
          ref={mainRef}
          onClick={handleClose}
          className="no-scrollbar flex w-full flex-row gap-10 overflow-x-scroll scroll-smooth py-[30px]"
        >
          {allProducts.map((product) => (
            <div
              key={product.id}
              id={`prod-${product.id}`}
              className={`no-scrollbar mx-[30px] h-[calc(100vh-60px)] min-w-[calc(100vw-60px)] overflow-y-scroll rounded-[20px] bg-bgColor`}
            >
              <div
                style={{ backgroundImage: `url(${product?.image_url})` }}
                className="mb-5 h-[200px] rounded-t-[20px] bg-transparent bg-cover bg-center shadow-image"
              />

              <div className="flex min-h-[calc(100vh-270px)] flex-col justify-between px-3">
                <div>
                  {/* Описание блюда */}
                  <h4 className="mb-3 text-base font-bold text-white">
                    {product?.name}
                  </h4>
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
                                ${currentProduct.active_modifier === modifier.id ? "bg-button" : "bg-bgColor2"} 
                                ${index === 0 ? "rounded-t-[6px]" : ""}
                                ${index === product?.modifiers.length - 1 ? "rounded-b-[6px]" : ""}
                                flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white
                              `}
                              onClick={() => {
                                setCurrentProduct((oldProduct) => {
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
                                    modifier.id ===
                                    currentProduct.active_modifier
                                      ? ""
                                      : "text-button"
                                  }
                                >
                                  {currencyFormatter(
                                    getProductModifierPrice(modifier, product),
                                    modifier.currency,
                                  )}
                                </p>
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
                              className={`${currentProduct.additions.includes(addition) ? "bg-button" : "bg-bgColor2"} ${index === 0 ? "rounded-t-[6px]" : ""} ${index === product?.additions.length - 1 ? "rounded-b-[6px]" : ""} flex flex-row justify-between p-4 text-center text-sm leading-[14px] text-white`}
                              onClick={() => {
                                setCurrentProduct((oldProduct) => {
                                  return {
                                    ...oldProduct,
                                    additions: oldProduct.additions.includes(
                                      addition,
                                    )
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
                                  currentProduct.additions.includes(addition)
                                    ? ""
                                    : "text-button"
                                }
                              >
                                +
                                {currencyFormatter(
                                  addition.price,
                                  addition.currency,
                                )}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <Button
                  text={`Сохранить: ${currencyFormatter(getCurrentProductPrice())}`}
                  className="mb-4 w-full"
                  onClick={() => onClick(currentProduct)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default ComboElementPopup;
