import { useState } from "react";
import { useAppSelector } from "../../../store/hooks.ts";

const useMainHook = () => {
  const [errorText, setErrorText] = useState("");
  const [isDelivery, setIsDelivery] = useState(true);
  const companyState = useAppSelector((state) => state.companies);
  const orderState = useAppSelector((state) => state.order);

  return {
    errorText,
    setErrorText,
    isDelivery,
    setIsDelivery,
    companyState,
    orderState,
  };
};

export default useMainHook;
