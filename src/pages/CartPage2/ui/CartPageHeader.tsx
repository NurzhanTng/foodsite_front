import Header from "../../../entities/Header.tsx";

type CartPageHeaderProps = {
  text?: string;
  isMain?: boolean;
  backPage?: string;
  onClear?: () => void;
  elementsInCart?: number;
};

const CartPageHeader = ({ text = "Данные заказа" }: CartPageHeaderProps) => {
  return (
    <Header className="pt-auto align-center flex flex-row justify-center ">
      <h2 className="my-auto h-fit text-2xl font-medium leading-loose text-white">
        {text}
      </h2>
    </Header>
  );
};

export default CartPageHeader;
