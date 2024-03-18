import useMainHook from "../hooks/useMainHook.ts";
import { useEffect } from "react";

const TransferPage = () => {
  const { user, navigate } = useMainHook();

  useEffect(() => {
    console.log("User Role: ", user.role)
    if (user.role === "client") {
      navigate("/menu");
    } else {
      navigate("/orders");
    }
  }, [navigate, user]);

  return (<div className="flex flex-col gap-5">
    {/*<p>window.Telegram.WebApp.initDataUnsafe: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</p>*/}
  </div>);
};

export default TransferPage;
