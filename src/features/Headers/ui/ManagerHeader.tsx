import Header from "../../../entities/Header.tsx";
import { iconTypes } from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";

type ManagerHeaderProps = {
  leftIcon?: iconTypes;
  leftIconShow?: boolean;
  iconOnClick?: () => void;
};

const ManagerHeader = ({
  leftIcon = "arrowLeft",
  leftIconShow = false,
  iconOnClick,
}: ManagerHeaderProps) => {
  return (
    <Header>
      {leftIconShow && (
        <Button
          showIcon={true}
          showText ={false}
          iconType={leftIcon}
          styleType="secondary"
          onClick={iconOnClick}
          className="absolute left-5 top-[17px] p-2 rounded-full"
          iconClassName="h-5 w-5"
        />
      )}
      <p className="mt-4 h-max text-center text-xl font-medium leading-loose text-white ">
        Заказы
      </p>
    </Header>
  );
};

export default ManagerHeader;
