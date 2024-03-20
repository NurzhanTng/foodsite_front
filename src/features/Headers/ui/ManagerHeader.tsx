import Header from "../../../entities/Header.tsx";
import { iconTypes } from "../../../shared/Icon";
import Button from "../../../shared/Button.tsx";
import { useNavigate } from "react-router-dom";

type ManagerHeaderProps = {
  leftIcon?: iconTypes;
  leftIconShow?: boolean;
  iconOnClick?: () => void;
};

const ManagerHeader = ({
  leftIcon = "arrowLeft",
  leftIconShow = false,
  iconOnClick
}: ManagerHeaderProps) => {
  const navigate = useNavigate();

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

      <Button
        showIcon={true}
        showText ={false}
        iconType="magnifier"
        styleType="secondary"
        onClick={() => navigate("/orders/search")}
        className="absolute right-5 top-[15px] p-2 rounded-full"
        iconClassName="h-6 w-6"
      />
    </Header>
  );
};

export default ManagerHeader;
