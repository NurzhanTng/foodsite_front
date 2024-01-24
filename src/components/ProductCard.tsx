import { Product } from "../Types.ts";
import ProductTag from "./ProductTag.tsx";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../store/hooks.ts";

type ProductCardProps = {
  product: Product;
};

const ProductAddButton = (product: Product) => {
  // const dispatch = useAppDispatch();

  return (
    <div
      className="exclude-click rounded-[6px] bg-button py-2"
    >
      <p className="text-center text-sm text-white">
        {product.price ? product.price : product.sizes[0].price}{" "}
        {product.currency === "KZT" ? "₸" : ""}
      </p>
    </div>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the clicked element or its ancestor has the specific class
    const clickedElement = event.target as HTMLElement;
    const isExcluded = clickedElement.closest('.exclude-click');

    if (isExcluded) {
      console.log('excluded click added')
      // Clicked on the excluded child div or its descendants, do nothing
      return;
    }

    navigate(`/dish/${product.id}`)
  }, [navigate, product.id]);

  return (
    <div onClick={handleClick} className="relative min-h-max w-[calc(50%-10px)] md:w-[calc(33%-20px)]">
      <div className="absolute left-3 top-3 flex flex-col gap-2">
        {product.tags.map((tag, index) => (
          <ProductTag key={index} tag={tag} />
        ))}
      </div>
      <div className="absolute z-[-100] h-full w-full rounded-[10px] bg-transparent shadow-card" />
      <div className="h-full w-full rounded-[10px] bg-bgColor">
        <div
          style={{ backgroundImage: `url(${product.image_url})` }}
          className="h-[120px] rounded-t-[10px] bg-cover sm:h-[200px]"
        ></div>
        <div className="flex h-full max-h-[calc(100%-120px)] flex-col justify-between gap-4 p-3 pt-2 sm:max-h-[calc(100%-200px)]">
          <div>
            <h4 className="mb-3 line-clamp-2 text-sm text-white">
              {product.name}
            </h4>
            <p className="line-clamp-4 text-xs text-fontSecondary md:line-clamp-2">
              {product.name}
            </p>
          </div>

          <ProductAddButton {...product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
