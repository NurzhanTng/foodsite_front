import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
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

const initialState: UserState = {
  telegram_id: -1,
  telegram_fullname: "",
  phone: "",
  promo: null,
  address: {
    long: -1,
    lat: -1,
    parsed: "",
  },
  exact_address: null,
  bonus: 0,
  role: "client",
  blocked: false,
  jwt_token: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const data = action.payload;
      state.telegram_id = data.telegram_id;
      state.telegram_fullname = data.telegram_fullname;
      state.phone = data.phone;
      state.promo = data.promo;
      state.address = data.address;
      state.exact_address = data.exact_address;
      state.bonus = data.bonus;
      state.role = data.role;
      state.blocked = data.blocked;
      state.jwt_token = data.jwt_token;
    },
  },
});

export const { setUser } = orderSlice.actions;

export default orderSlice.reducer;
