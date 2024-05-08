import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useNavigate } from "react-router-dom";
import { setIsDelivery as setDelivery } from "../../../store/slices/orderSlice.ts";

const useMainHook = () => {
  const [errorText, setErrorText] = useState("");
  const isDelivery = useAppSelector((state) => state.order.isDelivery);
  const companyState = useAppSelector((state) => state.companies);
  const orderState = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setIsDelivery = (isDelivery: boolean) => {
    dispatch(setDelivery(isDelivery));
  };

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
