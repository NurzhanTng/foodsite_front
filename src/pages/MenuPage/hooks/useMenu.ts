import { useAppSelector } from "../../../store/hooks.ts";
import useScrollEffect from "../../../hooks/useScrollEffect.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useCart from "../../../hooks/useCart.ts";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/slices/orderSlice.ts";


// {"telegram_id": 921564968,"telegram_fullname": "Jessyca Wiza","phone": "","promo": null,"address": null,"exact_address": null,"bonus": 1000,"role": "client","blocked": false,"updated_at": "2024-03-14T00:53:29.535683Z","created_at": "2024-03-14T00:53:29.535695Z","jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwMzc4MDI5LCJpYXQiOjE3MTAzNzc2MDksImp0aSI6ImNiODcxZTQ4MjY4NjQ4NTA4MTZhYzc2MTM3ZjkwZDVlIiwidXNlcl9pZCI6OTIxNTY0OTY4fQ.f5roIOpfBqR2bXX-6wXIZ-u9fzg-Th0oBqBl0N7zrYI","jwt_create_time": "2024-03-14T00:53:29.536645Z"}

type User = {
  telegram_id: number;
  telegram_fullname: string;
  phone: string;
  promo: string | null;
  address: {
    long: number;
    lat: number;
    parsed: string;
  } | null;
  exact_address: string | null;
  bonus: number;
  role: "client" | "manager";
  blocked: boolean;
  jwt_token: string;
};

const useMenu = () => {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  const { sumCurrency, updateCartFromParams } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch()

  useEffect(() => {
    const user = searchParams.get("user");
    if (user === null) return;

    const userObject: User = JSON.parse(user);
    console.log(userObject)
    dispatch(setUserData({
        client_id: userObject.telegram_id,
        jwt_token: userObject.jwt_token,
        user_name: userObject.telegram_fullname,
        phone: userObject.phone,
        kaspi_phone: "",
        max_bonus: userObject.bonus
    }));

    navigate("/")
  }, [searchParams, updateCartFromParams, state.categories, dispatch, navigate]);

  return { state, categoryRefs, sumCurrency, navigate };
};

export default useMenu;
