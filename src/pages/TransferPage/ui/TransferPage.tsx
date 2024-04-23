import useMainHook from "../hooks/useMainHook.ts";
import Loading from "./Loading.tsx";

const TransferPage = () => {
  useMainHook();

  return <Loading />;
};

export default TransferPage;
