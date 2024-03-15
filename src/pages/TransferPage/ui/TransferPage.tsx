import useMainHook from "../hooks/useMainHook.ts";
import { useEffect } from "react";

const TransferPage = () => {
  const { user, navigate } = useMainHook();

  useEffect(() => {
    if (user.role === "client") {
      navigate("/menu");
    } else if (user.role === "manager") {
      navigate("/orders");
    }
  }, [navigate, user]);

  return <div>{JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</div>;
};

export default TransferPage;
