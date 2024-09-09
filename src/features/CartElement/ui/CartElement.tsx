import React from "react";
import { OrderProduct } from "../../../utils/Types.ts";
import { twMerge } from "tailwind-merge";
import ElementCounter from "./ElementCounter.tsx";
import { useAppDispatch } from "../../../store/hooks/hooks.ts";
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
      if ((target as HTMLElement).id === "click_ignore") {
        return; // Ignore clicks on buttons
      }
      target = (target as HTMLElement).parentNode;
    }

    if (element.price === 0) return;

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
        className="min-h-[100px] min-w-[100px] rounded-[10px] bg-cover bg-center"
      />

      <div
        /* Element main */ className="relative flex min-h-[100px] w-full flex-col justify-between"
      >
        <div>
          <h4 /* Element name */
            className="line-clamp-2 text-base font-normal text-white"
          >
            {element.product?.name +
              (element.price === 0 ? " (акционная)" : "")}
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

        <div className="flex w-fit flex-col-reverse justify-between gap-2 sm-s:w-full sm-s:flex-row">
          {element.price !== 0 && (
            <ElementCounter
              id="click_ignore"
              className="mt-auto"
              onIncrease={() => dispatch(addOneToOrderProduct(index))}
              onDecrease={() => dispatch(removeOneToOrderProduct(index))}
              count={element.amount}
            />
          )}
          <div className="flex flex-col">
            {element.price !== sumOneOrderProduct(element) && (
              <p className="font-sm relative my-auto inline-block w-fit text-[#FF0000] after:absolute after:left-[-5%] after:top-1/2 after:block after:h-[1px] after:w-[110%] after:origin-center after:rotate-[-7deg] after:bg-current after:content-['']">
                {currencyFormatter(sumOneOrderProduct(element))}
              </p>
            )}

            <p /* Element cost */
              className="my-auto w-fit text-base text-button "
            >
              {currencyFormatter(element.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartElement;
