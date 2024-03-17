// import useMainHook from "../hooks/useMainHook.ts";
// import { useEffect } from "react";

import { useAppSelector } from "../../../store/hooks.ts";

const TransferPage = () => {
  const state = useAppSelector((state) => state);
  // const { user, navigate } = useMainHook();

  // useEffect(() => {
  //   if (user.role === "client") {
  //     navigate("/menu");
  //   } else if (user.role === "manager") {
  //     navigate("/orders");
  //   }
  // }, [navigate, user]);

  return (<div className="flex flex-col gap-5">
    <p>window.Telegram.WebApp.initDataUnsafe: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</p>
    <p>User: {JSON.stringify(state.user)}</p>
    <p>Cart: {JSON.stringify(state.main.cart)}</p>
    {/*<p>User: {JSON.stringify(state.user)}</p>*/}
  </div>);
};

export default TransferPage;
