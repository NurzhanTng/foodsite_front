import { useState } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import { useNavigate } from "react-router-dom";

const useMainHook = () => {
  const [errorText, setErrorText] = useState("");
  const [isDelivery, setIsDelivery] = useState(true);
  const companyState = useAppSelector((state) => state.companies);
  const orderState = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  const onClose = () => navigate("/cart");

  return {
    errorText,
    setErrorText,
    isDelivery,
    setIsDelivery,
    companyState,
    orderState,
    onClose,
  };
};

export default useMainHook;
