import Header from "../../../entities/Header.tsx";

type CartPageHeaderProps = {
  text?: string;
  isMain?: boolean;
  backPage?: string;
  onClear?: () => void;
  elementsInCart?: number;
};

const CartPageHeader = ({ text = "Корзина" }: CartPageHeaderProps) => {
  return (
    <Header className="pt-auto align-center flex flex-row justify-center ">
      {/*<Button*/}
      {/*  onClick={() => navigate(backPage)}*/}
      {/*  className="absolute left-5 top-[15px] h-10 w-10 rounded-full bg-transparent p-2.5 active:bg-transparent"*/}
      {/*  iconClassName="h-5 w-5 active:text-button transition-all"*/}
      {/*  styleType={"secondary"}*/}
      {/*  showText={false}*/}
      {/*  showIcon={true}*/}
      {/*  iconType={"arrowLeft"}*/}
      {/*/>*/}

      <h2 className="my-auto h-fit text-2xl font-medium leading-loose text-white">
        {text}
      </h2>

      {/*<Button*/}
      {/*  onClick={onClear}*/}
      {/*  className={`${isMain ? "" : "hidden"} absolute right-5 top-[15px] h-10 w-10 rounded-full bg-transparent p-2 active:bg-transparent`}*/}
      {/*  iconClassName="h-6 w-6 active:text-button transition-all"*/}
      {/*  styleType={"secondary"}*/}
      {/*  showText={false}*/}
      {/*  showIcon={true}*/}
      {/*  iconType={"trash"}*/}
      {/*>*/}
      {/*  <div className="absolute left-[4px] top-[4px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">*/}
      {/*    {elementsInCart}*/}
      {/*  </div>*/}
      {/*</Button>*/}
    </Header>
  );
};

export default CartPageHeader;
