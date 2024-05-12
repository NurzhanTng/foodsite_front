import { OrderProduct } from "../../../utils/Types.ts";
import useCart from "../../../hooks/useCart.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import { useAppDispatch } from "../../../store/hooks/hooks.ts";
import {
  addOneToOrderProduct,
  removeOneToOrderProduct,
} from "../../../store/slices/mainSlice.ts";
import { useNavigate } from "react-router-dom";

interface CartElementProps {
  element: OrderProduct;
  index: number;
}

const CartElementOld = ({ element, index }: CartElementProps) => {
  const { sumOneOrderProduct } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`${index !== 0 ? "border-t-[1px] border-secondary" : ""} mx-3 flex w-[100%-24px] flex-col py-4 sm-s:gap-2`}
    >
      <div className="relative flex flex-row gap-4">
        <div
          style={{ backgroundImage: `url(${element.product?.image_url})` }}
          className="min-h-[80px] min-w-[80px] rounded-[10px] bg-cover"
        />
        <div className="flex w-full flex-col">
          <p className="line-clamp-2 text-base text-white">
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
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div
          onClick={() => navigate(`/cartProduct/${index}`)}
          className="rounded-[6px] px-2 py-[7px] text-button"
        >
          Изменить
        </div>
        <p className="my-auto h-fit flex-1 text-center">
          {currencyFormatter(sumOneOrderProduct(element))}
        </p>
        <div className="my-auto flex w-[150px] flex-1 flex-row justify-between gap-2 text-center text-sm leading-[14px] text-white">
          <div
            className="h-fit min-w-[30px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => dispatch(removeOneToOrderProduct(index))}
          >
            -
          </div>

          <div className="flex-1 px-3 py-3">
            <p>{element.amount}</p>
          </div>

          <div
            className="h-fit min-w-[30px] flex-1 rounded-[6px] bg-button py-3"
            onClick={() => dispatch(addOneToOrderProduct(index))}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartElementOld;
