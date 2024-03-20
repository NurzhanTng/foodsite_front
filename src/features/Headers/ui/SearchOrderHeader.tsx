import Header from "../../../entities/Header.tsx";
import { iconTypes } from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";
import { FilterState } from "../../../pages/OrderSearchPage";
import Input from "../../../shared/Input.tsx";

type ManagerHeaderProps = {
  leftIcon?: iconTypes;
  leftIconShow?: boolean;
  iconOnClick?: () => void;
  filter: FilterState;
  setTermValue: (value: string) => void;
  onSearchButtonClick: () => void;
};

const ManagerHeader = ({
  leftIcon = "arrowLeft",
  leftIconShow = false,
  iconOnClick,
  filter,
  setTermValue,
  onSearchButtonClick
}: ManagerHeaderProps) => {

  return (
    <Header className="h-[90px] flex flex-row px-5 justify-between gap-3">
      {leftIconShow && (
        <Button
          showIcon={true}
          showText ={false}
          iconType={leftIcon}
          styleType="secondary"
          onClick={iconOnClick}
          className="p-2 rounded-full my-auto"
          iconClassName="h-5 w-5"
        />
      )}

      {filter.searchTerm === "id" &&
        <Input
          aria-required={true}
          type="number"
          className="my-auto w-full max-w-[400px]"
          label="Введите номер заказа"
          onChange={(event) => setTermValue(event.target.value)}
          value={filter.termValue}
        />
      }

      {filter.searchTerm === "phone" &&
        <Input
          aria-required={true}
          type="number"
          className="my-auto w-full max-w-[400px]"
          label="Введите телефон клиента"
          onChange={(event) => {
            setTermValue(event.target.value.replace(/\D/g, ""));
            if (event.target.value.replace(/\D/g, "").length < 11) return;

            event.target.setAttribute("readonly", "readonly");
            event.target.setAttribute("disabled", "true");
            setTimeout(function () {
              event.target.blur();
              event.target.removeAttribute("readonly");
              event.target.removeAttribute("disabled");
            }, 100);
          }}
          value={filter.termValue}
        />
      }

      <Button
        showIcon={true}
        showText ={false}
        iconType="magnifier"
        styleType="secondary"
        onClick={onSearchButtonClick}
        className="p-2 rounded-full my-auto"
        iconClassName="h-6 w-6"
      />
    </Header>
  );
};

export default ManagerHeader;
