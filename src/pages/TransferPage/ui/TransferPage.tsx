import useMainHook from "../hooks/useMainHook.ts";
import Loading from "./Loading.tsx";
import Error from "./Error.tsx";

const TransferPage = () => {
  const data = useMainHook();

  return data.errorType === null ? <Loading /> : <Error {...data} />;
};

export default TransferPage;
