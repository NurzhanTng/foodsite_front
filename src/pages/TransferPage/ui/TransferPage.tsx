import useMainHook from "../hooks/useMainHook.ts";

const TransferPage = () => {
  const {user} = useMainHook();
  // console.log('data/')

  return (
    <div className="flex flex-col gap-5">
      {JSON.stringify(user)}
    </div>
  );
};

export default TransferPage;
