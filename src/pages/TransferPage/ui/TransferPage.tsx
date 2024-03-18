import useMainHook from "../hooks/useMainHook.ts";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks.ts";
import { fetchOrders } from "../../../store/slices/managerSlice.ts";

const TransferPage = () => {
  const { user, navigate } = useMainHook();
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log("User Role: ", user.role)
    if (user.role === "client") {
      navigate("/menu");
    } else if (user.role === "manager") {
      dispatch(fetchOrders());
      navigate("/orders");
    }
  }, [navigate, user]);

  return (<div className="flex flex-col gap-5">
    {/*<p>window.Telegram.WebApp.initDataUnsafe: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</p>*/}
  </div>);
};

export default TransferPage;
