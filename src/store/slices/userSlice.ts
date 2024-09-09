import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  telegram_id: string;
  telegram_fullname: string;
  phone: string;
  kaspi_phone: string;
  promo: string | null;
  address: {
    long: number;
    lat: number;
    parsed: string;
  } | null;
  exact_address: string | null;
  companies: number[];
  bonus: number;
  company_ids: number[];
  role: "admin" | "client" | "manager" | "delivery" | "cook" | "runner" | "";
  blocked: boolean;
  jwt_token: string;
};

const initialState: UserState = {
  telegram_id: "",
  telegram_fullname: "",
  phone: "",
  kaspi_phone: "",
  promo: null,
  address: {
    long: -1,
    lat: -1,
    parsed: "",
  },
  exact_address: null,
  bonus: 0,
  company_ids: [],
  role: "",
  blocked: false,
  jwt_token: "",
  companies: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const data = action.payload;
      state.telegram_id = data.telegram_id;
      state.telegram_fullname = data.telegram_fullname;
      state.phone = data.phone;
      state.kaspi_phone = data.kaspi_phone;
      state.promo = data.promo;
      state.address = data.address;
      state.exact_address = data.exact_address;
      state.bonus = data.bonus;
      state.company_ids = data.company_ids;
      state.role = data.role;
      state.blocked = data.blocked;
      state.jwt_token = data.jwt_token;
    },
    clearState: (state) => {
      state.telegram_id = initialState.telegram_id;
      state.telegram_fullname = initialState.telegram_fullname;
      state.phone = initialState.phone;
      state.kaspi_phone = initialState.kaspi_phone;
      state.promo = initialState.promo;
      state.address = initialState.address;
      state.exact_address = initialState.exact_address;
      state.bonus = initialState.bonus;
      state.company_ids = initialState.company_ids;
      state.role = initialState.role;
      state.blocked = initialState.blocked;
      state.jwt_token = initialState.jwt_token;
    },
    setUserCompanies: (state, action: PayloadAction<number[]>) => {
      state.company_ids = action.payload;
    },
  },
});

export const { setUser, clearState, setUserCompanies } = userSlice.actions;

export default userSlice.reducer;
