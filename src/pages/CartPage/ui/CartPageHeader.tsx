import Header from "../../../entities/Header.tsx";
import Button from "../../../shared/Button.tsx";
import { useNavigate } from "react-router-dom";

type CartPageHeaderProps = {
  text?: string,
  isMain?: boolean,
  backPage?: string
}

const CartPageHeader = ({ text = "Pizzeria Almaty", isMain = true, backPage = '/' }: CartPageHeaderProps) => {
  const navigate = useNavigate()

  return (
    <Header className="pt-auto align-center flex flex-row justify-center ">
      <Button
        onClick={() => navigate(backPage)}
        className="absolute left-5 top-[15px] h-10 w-10 rounded-full bg-transparent p-2.5 active:bg-buttonSecondary2"
        iconClassName="h-5 w-5"
        styleType={"secondary"}
        showText={false}
        showIcon={true}
        iconType={"arrowLeft"}
      />
      <h2 className="text-white text-2xl font-medium leading-loose h-fit my-auto">{text}</h2>
      <Button
        className={
          `${isMain? "" : "hidden"} absolute right-5 top-[15px] h-10 w-10 rounded-full bg-transparent p-2.5 active:bg-buttonSecondary2`
        }
        iconClassName="h-5 w-5"
        styleType={"secondary"}
        showText={false}
        showIcon={true}
        iconType={"trash"}
      />
    </Header>
  );
};

export default CartPageHeader;
