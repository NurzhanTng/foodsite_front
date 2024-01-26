import { OrderProduct } from "../Types.ts";
import useCart from "../hooks/useCart.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { addOneToOrderProduct, removeOneToOrderProduct } from "../store/slices/mainSlice.ts";

interface CartElementProps {
  element: OrderProduct;
  index: number;
}

const CartElement = ({ element, index }: CartElementProps) => {
  const { sumOneOrderProduct } = useCart();
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${index !== 0 ? "border-t-[1px] border-secondary" : ""} mx-3 flex w-[100%-24px] flex-row gap-2 py-4`}
    >
      <div
        style={{ backgroundImage: `url(${element.product?.image_url})` }}
        className="min-h-[100px] min-w-[100px] rounded-[10px] bg-cover"
      />
      <div>
        <p className="line-clamp-1 text-base text-white">
          {element.product?.name}
        </p>
        <p
          className={`${element.active_modifier === null ? "hidden" : ""} line-clamp-1 text-sm text-fontSecondary`}
        >
          {
            element.product?.modifiers.find(
              (modifier) => modifier.id === element.active_modifier,
            )?.name
          }
        </p>
        <p className="line-clamp-1 text-sm text-fontSecondary2">
          {element.additions.map((addition) => addition.name).join(", ")}
        </p>
        <div className='flex mt-4 flex-row justify-between gap-2 text-center text-sm leading-[14px] text-white w-[150px]'>
          <div
            className="min-w-[20px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => dispatch(removeOneToOrderProduct(index))}
          >
            -
          </div>

          <div className="flex-1 px-3 py-3">
            <p>{element.amount}</p>
          </div>

          <div
            className="min-w-[20px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => dispatch(addOneToOrderProduct(index))}
          >
            +
          </div>
        </div>
      </div>
      <p className="ml-auto">
        {currencyFormatter(sumOneOrderProduct(element))}
      </p>
    </div>
  );
};

export default CartElement;
