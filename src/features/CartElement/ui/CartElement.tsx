import React from "react";
import { OrderProduct } from "../../../utils/Types.ts";
import { twMerge } from "tailwind-merge";
import ElementCounter from "./ElementCounter.tsx";
import { useAppDispatch } from "../../../store/hooks.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import useCart from "../../../hooks/useCart.ts";
import { useNavigate } from "react-router-dom";
import {
  addOneToOrderProduct,
  removeOneToOrderProduct,
} from "../../../store/slices/mainSlice.ts";

type CartElementProps = {
  className?: string;
  element: OrderProduct;
  index: number;
};

const CartElement = ({ className, element, index }: CartElementProps) => {
  const { sumOneOrderProduct } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleElementClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    let target: EventTarget | null = event.target;
    while (target !== null) {
      if ((target as HTMLElement).id === 'click_ignore') {
        return; // Ignore clicks on buttons
      }
      target = (target as HTMLElement).parentNode;
    }

    navigate(`/cartProduct/${index}`);
  };

  return (
    <div
      className={twMerge(
        "flex flex-row gap-5 border-b border-secondary py-5",
        className,
      )}
      onClick={handleElementClick}
    >
      <div /* Element image */
        style={{ backgroundImage: `url(${element.product?.image_url})` }}
        className="min-h-[100px] min-w-[100px] rounded-[10px] bg-cover"
      />

      <div
        /* Element main */ className="relative flex min-h-[100px] w-full flex-col justify-between"
      >
        <div>
          <h4 /* Element name */
            className="line-clamp-2 text-base font-normal text-white"
          >
            {element.product?.name}
          </h4>

          <p /* Element description */
            className="line-clamp-1 text-sm font-medium leading-tight text-textSecondary"
          >
            {
              element.product?.modifiers.find(
                (modifier) => modifier.id === element.active_modifier,
              )?.name
            }
          </p>

          <p /* Element additions */
            className="mb-4 line-clamp-1 text-sm font-medium leading-tight text-textSecondary"
          >
            {element.additions.map((addition) => addition.name).join(", ")}
          </p>
        </div>

        <div className="flex-col-reverse w-fit flex justify-between gap-2 sm-s:flex-row sm-s:w-full">

        <ElementCounter
          id="click_ignore"
          onIncrease={() => dispatch(addOneToOrderProduct(index))}
          onDecrease={() => dispatch(removeOneToOrderProduct(index))}
          count={element.amount}
        />

        <p /* Element cost */
          className="text-base text-button my-auto w-fit "
        >
          {currencyFormatter(sumOneOrderProduct(element))}
        </p>
        </div>
      </div>
    </div>
  );
};

export default CartElement;
