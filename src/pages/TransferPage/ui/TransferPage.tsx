import useMainHook from "../hooks/useMainHook.ts";

const TransferPage = () => {
  useMainHook();

  return (
    <div
      className="left-[calc(50%-25px)] fixed top-[calc(50%-25px)] animate-spin ease-linear rounded-full border-4 border-t-4 border-t-bgColor border-button w-[50px] h-[50px]"
    />
  );
};

export default TransferPage;
