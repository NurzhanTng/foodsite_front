import useMainHook from "../hooks/useMainHook.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { fetchCategories } from "../../../store/slices/mainSlice.ts";
import { fetchCompanies } from "../../../store/slices/companySlice.ts";
import {
  fetchDeliveries,
  fetchOrders,
} from "../../../store/slices/managerSlice.ts";

const TransferPage = () => {
  const { user, navigate } = useMainHook();
  const orders = useAppSelector((state) => state.manager.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
    console.log("User Role: ", user.role);
    if (user.role === "client") {
      navigate("/menu");
    } else if (user.role === "manager") {
      dispatch(fetchOrders());
      dispatch(fetchDeliveries());
      navigate("/orders");
    }
  }, [dispatch, navigate, orders, user]);

  return (
    <div className="flex flex-col gap-5">
      {/*<p>window.Telegram.WebApp.initDataUnsafe: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</p>*/}
    </div>
  );
};

export default TransferPage;
