import { Action } from "../../../store/slices/loyaltySlice.ts";
import { OrderProduct } from "../../../utils/Types.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";

type ComboElementProps = {
  element: OrderProduct;
  comboAction: Action;
  index: number;
  setSelectedProducts: (index: number) => void;
};

const ComboElement = ({
  element,
  comboAction,
  index,
  setSelectedProducts,
}: ComboElementProps) => {
  const isOneInComboList = !Array.isArray(
    (comboAction.triggers[0].product_lists || [])[index],
  );
  const handleElementClick = () => {
    setSelectedProducts(index);
  };
  if (comboAction.triggers[0].product_lists === undefined) return;

  return (
    <div
      className={`relative my-5 flex flex-row gap-5 rounded-[10px] bg-bgColor2 p-3 shadow-option`}
      onClick={handleElementClick}
    >
      <div /* Element image */
        style={{ backgroundImage: `url(${element.product?.image_url})` }}
        className=" top-0 h-[80px] min-w-[80px] max-w-[80px] rounded-[10px] bg-cover bg-center"
      />
      <div className="relative flex w-full flex-col justify-between">
        <div>
          <h4 className="line-clamp-2 text-base font-normal text-white">
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
            className="line-clamp-3 text-sm font-medium leading-tight text-textSecondary"
          >
            {element.additions.map((addition) => addition.name).join(", ")}
          </p>

          {element.additions.length !== 0 && (
            <p /* Element cost */ className="w-fit text-base text-button ">
              +
              {currencyFormatter(
                element.additions.reduce(
                  (sum, addition) => sum + addition.price,
                  0,
                ),
              )}
            </p>
          )}
        </div>

        {
          <Button
            onClick={() => {}}
            text={isOneInComboList ? "Изменить состав" : "Заменить"}
            className="mt-4 w-fit px-3 py-2 text-sm"
          />
        }
      </div>
    </div>
  );
};

export default ComboElement;
