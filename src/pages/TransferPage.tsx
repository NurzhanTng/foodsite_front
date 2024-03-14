import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setUser, UserState } from "../store/slices/userSlice.ts";
import { useEffect } from "react";

const TransferPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.Telegram.WebApp)
  }, [dispatch, navigate, searchParams]);


  return (
    <div>
      {window.Telegram.WebApp}
    </div>
  );
};

export default TransferPage;