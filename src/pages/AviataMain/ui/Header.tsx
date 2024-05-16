import Icon from "../../../shared/Icon";

const Header = () => {
  return (
    <div className=" bg-green2 z-[-10] inline-flex h-[70px] w-full items-center justify-between px-2.5 pb-5 pt-2.5">
      <Icon type={"list"} className="h-6 w-6 text-white" />
      <div className="flex items-center justify-center">
        {/*<div className="relative h-[30px] w-[30px]"></div>*/}
        <div className="font-['Sen'] text-[28px] font-bold leading-10 text-white">
          aviata.
        </div>
        <div className="text-green1 font-['Sen'] text-[28px] font-bold leading-10">
          kbtu
        </div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center">
        <div className="relative h-6 w-6">
          <Icon type={"user"} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
