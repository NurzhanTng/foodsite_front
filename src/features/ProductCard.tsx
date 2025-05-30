import { Product } from "../utils/Types.ts";
import ProductTag from "../entities/Dish/ui/ProductTag.tsx";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";
import useActions from "../hooks/useActions.ts";

type ProductCardProps = {
  product: Product;
};

const ProductAddButton = (product: Product) => {
  const {
    addOneProductToCart,
    countProductInCart,
    increaseProduct,
    decreaseProduct,
  } = useCart();
  const { getProductPriceByActions, isProductHaveActions } = useActions();

  const getProductPrice = (old_price: boolean = false) => {
    return isProductHaveActions(product) && !old_price
      ? getProductPriceByActions(product)
      : product.price
        ? product.price
        : product.modifiers[0].price;
  };

  const [count, typesCount] = countProductInCart(product.id);

  return (
    <>
      {/* Когда корзина пуста */}
      {typesCount === 0 &&
        (isProductHaveActions(product) ? (
          <div
            className="exclude-click flex flex-row flex-wrap justify-evenly gap-1 rounded-[6px] bg-button py-3 text-center align-middle text-sm leading-[14px] text-white"
            onClick={() => addOneProductToCart(product, getProductPrice())}
          >
            <p className="font-sm relative my-auto inline-block w-fit text-[#FF0000] after:absolute after:left-[-5%] after:top-1/2 after:block after:h-[1px] after:w-[110%] after:origin-center after:rotate-[-7deg] after:bg-current after:content-['']">
              {currencyFormatter(getProductPrice(true), product.currency)}
            </p>

            <p>{currencyFormatter(getProductPrice(), product.currency)}</p>
          </div>
        ) : (
          <div
            className="exclude-click rounded-[6px] bg-button py-3 text-center text-sm leading-[14px] text-white"
            onClick={() => addOneProductToCart(product)}
          >
            <p>{currencyFormatter(getProductPrice(), product.currency)}</p>
          </div>
        ))}

      {/* Когда в корзине 1 тип этого блюда */}
      {typesCount === 1 && (
        <div className="exclude-click flex flex-row justify-between gap-2 text-center text-sm leading-[14px] text-white md:gap-5">
          <div
            className="min-w-[20px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => decreaseProduct(product)}
          >
            -
          </div>

          <div className="flex-2 rounded-[6px] bg-bgColor2 px-3 py-3">
            <p>{count}</p>
          </div>

          <div
            className="min-w-[20px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => increaseProduct(product)}
          >
            +
          </div>
        </div>
      )}

      {/* Когда много разных типов этого блюда в корзине */}
      {typesCount > 1 && (
        <div className="exclude-click  rounded-[6px] bg-bgColor2 py-3 text-center text-sm leading-[14px] text-white">
          <p>{count}</p>
        </div>
      )}
    </>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { getTagTextByAction } = useActions();
  const tagText = getTagTextByAction(product);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const clickedElement = event.target as HTMLElement;
      const isExcluded = clickedElement.closest(".exclude-click");
      if (isExcluded) return;
      navigate(`/dish/${product.id}`);
    },
    [navigate, product.id],
  );

  return (
    <div
      onClick={handleClick}
      className="relative min-h-max w-[calc(50%-10px)] md:w-[calc(33%-20px)]"
    >
      {/* Абсолютно расположенные теги */}
      <div className="absolute left-3 top-3 flex flex-col gap-2">
        {product.tags.map((tag, index) => (
          <ProductTag key={index} tag={tag} />
        ))}
        {tagText && (
          <ProductTag
            key={-1}
            tag={{
              name: tagText,
              tag_color: "#FF0000",
            }}
          />
        )}
      </div>

      {/* Тень под блюдом */}
      <div className="absolute z-[-100] h-full w-full rounded-[10px] bg-transparent shadow-card" />

      {/* Внутренний контейнер */}
      <div className="h-full w-full rounded-[10px] bg-bgColor">
        {/* Картинка */}
        <div
          style={{ backgroundImage: `url(${product.image_url})` }}
          className="h-[120px] rounded-t-[10px] bg-cover bg-center sm:h-[200px]"
        />

        {/* Данные блюда */}
        <div className="flex h-full max-h-[calc(100%-120px)] flex-col justify-between gap-4 p-3 pt-2 sm:max-h-[calc(100%-200px)]">
          <div>
            <h4 className="mb-3 line-clamp-2 text-sm text-white">
              {product.name}
            </h4>
            <p className="line-clamp-4 text-xs text-fontSecondary md:line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Кнопка добавления блюда */}
          <ProductAddButton {...product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
