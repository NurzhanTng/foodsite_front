import { Action, setOrderActions } from "../store/slices/loyaltySlice.ts";
// import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import React from "react";
// import ElementCounter from "../features/CartElement/ui/ElementCounter.tsx";
import currencyFormatter from "../utils/currencyFormatter.ts";
// import { OrderProduct } from "../utils/Types.ts";
import Button from "../shared/Button.tsx";

type ComboElementProps = {
  className?: string;
  action: Action;
  index: number;
};

const ComboElement = ({ className, action }: ComboElementProps) => {
  const dispatch = useAppDispatch();
  const orderActions = useAppSelector((state) => state.loyalty.orderActions);
  // const navigate = useNavigate();

  const handleElementClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // groupId: number,
  ) => {
    let target: EventTarget | null = event.target;
    while (target !== null) {
      if ((target as HTMLElement).id === "click_ignore") {
        return; // Ignore clicks on buttons
      }
      target = (target as HTMLElement).parentNode;
    }

    // if (action.price === 0) return;

    // navigate(`/cartCombo?action_id=${action.id}&group_id=${groupId}`);
  };

  // const comboGroups: OrderProduct[][] = [];
  // const groupAmount: number[] = [];
  // for (const orderProducts of action.payloads[0].comboProducts || []) {
  //   let isTheSame = false
  //   if (comboGroups.length === 0) {
  //     comboGroups.push(orderProducts);
  //     groupAmount.push(1);
  //     continue
  //   }
  //
  //   for (let index = 0; index < comboGroups.length; index + 1 ) {
  //
  //   }
  // }
  const comboGroups = action.payloads[0].comboProducts || [];
  // const groupAmount = comboGroups.map(() => 1);

  return comboGroups.map((group, groupIndex) => {
    return (
      <div
        className={twMerge(
          "flex flex-row gap-5 border-b border-secondary py-5",
          className,
        )}
        onClick={(e) => handleElementClick(e)}
      >
        <div
          style={{ backgroundImage: `url(${action.image})` }}
          className="h-[100px] min-w-[100px] rounded-[10px] bg-cover bg-center"
        />

        <div className="relative flex min-h-[100px] w-full flex-col justify-between">
          <h4 /* Element name */
            className="mb-3 line-clamp-2 text-base font-normal text-white"
          >
            {action.name}
          </h4>
          {group.map((element) => {
            return (
              <div>
                <h4 /* Element name */
                  className="line-clamp-1 text-sm font-medium  text-textSecondary"
                >
                  {element.product?.name}
                </h4>

                <p /* Element description */
                  className="line-clamp-1 text-xs font-medium text-textSecondary"
                >
                  {element.active_modifier && "+ "}
                  {
                    element.product?.modifiers.find(
                      (modifier) => modifier.id === element.active_modifier,
                    )?.name
                  }
                </p>

                <p /* Element additions */
                  className="mb-2 line-clamp-1 text-xs font-medium text-textSecondary"
                >
                  {element.additions.length !== 0 && "+ "}
                  {element.additions
                    .map((addition) => addition.name)
                    .join(", ")}
                </p>
              </div>
            );
          })}

          <div className="mt-4 flex w-fit flex-col-reverse justify-between gap-2 sm-s:w-full sm-s:flex-row">
            {/*{*/}
            {/*  <ElementCounter*/}
            {/*    id="click_ignore"*/}
            {/*    onIncrease={() => {}}*/}
            {/*    onDecrease={() => {}}*/}
            {/*    count={groupAmount[index]}*/}
            {/*  />*/}
            {/*}*/}
            <Button
              text="Удалить"
              onClick={() => {
                dispatch(
                  setOrderActions(
                    orderActions.map((orderAction) =>
                      action.id === orderAction.id
                        ? {
                            ...action,
                            payloads: action.payloads.map((payload, index) =>
                              index === 0
                                ? {
                                    ...payload,
                                    comboProducts:
                                      payload.comboProducts?.filter(
                                        (_, index) => index !== groupIndex,
                                      ),
                                  }
                                : payload,
                            ),
                          }
                        : orderAction,
                    ),
                  ),
                );
              }}
            />

            <p /* Element cost */
              className="my-auto w-fit text-base text-button "
            >
              {currencyFormatter(
                (action.payloads[0].new_price || 0) +
                  group.reduce(
                    (sum, product) =>
                      sum +
                      product.additions.reduce(
                        (addSum, add) => addSum + add.price,
                        0,
                      ),
                    0,
                  ),
              )}
            </p>
          </div>
        </div>
      </div>
    );
  });
};

export default ComboElement;
