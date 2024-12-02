import { useParams } from "react-router-dom";

const WaRedirectPage = () => {
  const { wa_number } = useParams();

  console.log(wa_number);

  if (wa_number) {
    window.location.href = `https://wa.me/${wa_number}`
  } else {
    window.location.href = import.meta.env.VITE_REACT_APP_API_BOT_URL;
  }

  return <div></div>;
};

export default WaRedirectPage;
