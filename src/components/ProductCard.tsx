import { Product } from "../Types.ts";
import ProductTag from "./ProductTag.tsx";
import { increment } from "../store/counter/counterSlice.ts";

import { useAppSelector, useAppDispatch } from "../store/hooks.ts";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div className="relative min-h-max w-[calc(50%-10px)] md:w-[calc(33%-20px)]">
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
          <div
            className="rounded-[6px] bg-button py-2"
            onClick={() => {
              console.log(counter);
              dispatch(increment());
            }}
          >
            <p className="text-center text-sm text-white">
              {product.price ? product.price : product.sizes[0].price}{" "}
              {product.currency === "KZT" ? "₸" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
