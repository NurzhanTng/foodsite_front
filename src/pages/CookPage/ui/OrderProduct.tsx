import { OrderProducts } from "../../../store/slices/managerSlice.ts";
import useCart from "../../../hooks/useCart.ts";
import CookSwitch from "./CookSwitch.tsx";

type OrderProductProps = OrderProducts & {
  value: boolean | undefined;
  onClick: () => void;
};

const OrderProduct = ({
  product_id,
  additions,
  active_modifier,
  amount,
  value,
  onClick,
}: OrderProductProps) => {
  const product = useCart().getProductById(product_id);

  return product === undefined || value === undefined ? (
    <div />
  ) : (
    <div
      className="mb-3 flex w-full flex-row justify-between gap-3 align-middle"
      onClick={onClick}
    >
      <div className="my-auto flex flex-col gap-1">
        <p className="w-full text-sm font-normal leading-none text-white">
          {product?.name}
        </p>
        <p className="w-full text-sm font-normal leading-none text-fontSecondary">
          {
            product?.modifiers.find(
              (modifier) => modifier.id === active_modifier,
            )?.name
          }
        </p>
        <p className="w-full text-sm font-normal leading-none text-fontSecondary">
          {additions
            .map((additionId) =>
              product?.additions.find((addition) => addition.id === additionId),
            )
            .map((addition) => addition?.name)
            .join(", ")}
        </p>
      </div>

      <div className={`align-right my-auto flex w-9 flex-col gap-3`}>
        <p className="my-auto w-9 text-right text-sm font-normal leading-none text-fontSecondary">
          {amount} шт.
        </p>

        <div className="ml-auto">
          {" "}
          <CookSwitch value={value} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
