import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Action } from "../../../store/slices/loyaltySlice.ts";
import useActions from "../../../hooks/useActions.ts";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import { useAppSelector } from "../../../store/hooks/hooks.ts";

type ComboCardProps = {
  comboAction: Action;
};

const ComboAddButton = ({ comboAction }: ComboCardProps) => {
  console.log(comboAction);
  const productsOnCart = useAppSelector(
    (state) =>
      state.loyalty.orderActions.find((action) => action.id === comboAction.id)
        ?.payloads[0].comboProducts,
  );
  const isInCard = productsOnCart?.length !== 0;
  const price = comboAction.payloads[0].new_price;

  return isInCard ? (
    <div className="exclude-click flex flex-row justify-between gap-2 text-center text-sm leading-[14px] text-white md:gap-5">
      <div className="flex-2 rounded-[6px] bg-bgColor2 px-3 py-3">
        <p>{productsOnCart?.length}</p>
      </div>
    </div>
  ) : (
    <div className="rounded-[6px] bg-button py-3 text-center text-sm leading-[14px] text-white">
      <p>{currencyFormatter(price ? price : 0)}</p>
    </div>
  );
};

const ComboCard = ({ comboAction }: ComboCardProps) => {
  const navigate = useNavigate();
  const {} = useActions();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const clickedElement = event.target as HTMLElement;
      const isExcluded = clickedElement.closest(".exclude-click");
      if (isExcluded) return;
      navigate(`/combo/${comboAction.id}`);
    },
    [navigate, comboAction],
  );

  if (comboAction.image_url === null || comboAction.image_url === "")
    return <div className="hidden" />;

  return (
    <div
      onClick={handleClick}
      className="relative min-h-max w-[calc(50%-10px)] md:w-[calc(33%-20px)]"
    >
      {/* Тень под блюдом */}
      <div className="absolute z-[-100] h-full w-full rounded-[10px] bg-transparent shadow-card" />

      {/* Внутренний контейнер */}
      <div className="h-full w-full rounded-[10px] bg-bgColor">
        {/* Картинка */}
        <div
          style={{ backgroundImage: `url(${comboAction.image_url})` }}
          className="h-[120px] rounded-t-[10px] bg-white bg-cover bg-center sm:h-[200px]"
        />

        {/* Данные блюда */}
        <div className="flex h-full max-h-[calc(100%-120px)] flex-col justify-between gap-4 p-3 pt-2 sm:max-h-[calc(100%-200px)]">
          <div>
            <h4 className="mb-3 line-clamp-2 text-sm text-white">
              {comboAction.name}
            </h4>
            <p className="line-clamp-4 text-xs text-fontSecondary md:line-clamp-2">
              {comboAction.description}
            </p>
          </div>

          <ComboAddButton comboAction={comboAction} />
        </div>
      </div>
    </div>
  );
};

export default ComboCard;
