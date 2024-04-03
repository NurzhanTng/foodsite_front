import useMainHook from "../hooks/useMainHook.ts";

const TransferPage = () => {
  useMainHook();

  return (
    <div className="flex flex-col gap-5">
      {/*<p>window.Telegram.WebApp.initDataUnsafe: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 10)}</p>*/}
    </div>
  );
};

export default TransferPage;
