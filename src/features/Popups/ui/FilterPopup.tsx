import Popup from "../../../shared/Popup.tsx";
import React from "react";
import { FilterState } from "../../../pages/OrderSearchPage";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";
import { Checkbox, FormControlLabel } from "@mui/material";

type FilterPopupProps = React.HTMLProps<HTMLDivElement> & {
  show: boolean;
  toggleShow: () => void;
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
};

const FilterPopup = ({
  show,
  toggleShow,
  filter,
  setFilter,
}: FilterPopupProps) => {
  const { statuses, statusesText } = useManager();

  return (
    <Popup show={show} toggleShow={toggleShow}>
      {/*<Icon type="magnifier" className="mx-auto mb-[10px] h-[90px] w-[90px]" />*/}

      <h2 className="mb-[10px] text-center text-base font-medium text-white">
        Фильтры поиска
      </h2>

      <p className="mb-[20px] text-center font-medium text-fontSecondary">
        Введите параметры для фильтра заказов
      </p>

      <div className="my-[30px] flex flex-row justify-between gap-2 rounded-full border-2 border-button">
        <Button
          className="py-auto rounded-full px-5"
          text="По id заказа"
          styleType={filter.searchTerm === "id" ? "primary" : "secondary"}
          onClick={() => setFilter({ ...filter, searchTerm: "id" })}
        />

        <Button
          className="py-auto rounded-full px-5"
          text="По номеру клиента"
          styleType={filter.searchTerm === "phone" ? "primary" : "secondary"}
          onClick={() => setFilter({ ...filter, searchTerm: "phone" })}
        />
      </div>

      <p className="mb-[20px] text-balance text-center font-medium text-fontSecondary">
        Выберите какие статусы заказов включить в поиск
      </p>

      <div className="mx-auto mb-8 flex w-fit flex-col">
        {statuses.map((status) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                sx={{
                  "& input + *": {
                    color: "#5288C1"
                  },
                }}
                value={filter.searchStatuses.includes(status)}
                defaultChecked
                onClick={() => {
                  if (filter.searchStatuses.includes(status)) {
                    setFilter({
                      ...filter,
                      searchStatuses: filter.searchStatuses.filter(
                        (item) => item !== status,
                      ),
                    });
                  } else {
                    setFilter({
                      ...filter,
                      searchStatuses: [...filter.searchStatuses, status],
                    });
                  }
                }}
              />
            }
            label={statusesText[status]}
          />
        ))}
      </div>

      <div className="flex w-full justify-center">
        <Button text="Закрыть" onClick={toggleShow} />
      </div>
    </Popup>
  );
};

export default FilterPopup;
