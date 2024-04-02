import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderState = {
  client_id: number;
  delivery_id: number;
  company_id: number;
  max_bonus: number;
  bonus_used: boolean;
  done_time: string;
  user_name: string;
  address: {
    long: number;
    lat: number;
    parsed: string;
  };
  exactAddress: string;
  phone: string;
  kaspi_phone: string;
  client_comment: string;

  actions: Array<string>;
};

const initialState: OrderState = {
  client_id: -1,
  delivery_id: -1,
  company_id: -1,
  max_bonus: 0,
  bonus_used: false,
  done_time: "00:00",
  user_name: "",
  address: {
    long: 0,
    lat: 0,
    parsed: "",
  },
  exactAddress: "",
  phone: "",
  kaspi_phone: "",
  client_comment: "",

  actions: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        telegram_id: number;
        telegram_fullname: string;
        phone: string;
        kaspi_phone: string;
        bonus: number;
        address: {
          long: number;
          lat: number;
          parsed: string;
        } | null;
        exact_address: string | null;
      }>,
    ) => {
      const data = action.payload;
      state.client_id = data.telegram_id;
      state.user_name = data.telegram_fullname;
      state.phone = data.phone;
      state.kaspi_phone = data.phone;
      state.max_bonus = data.bonus;
      if (data.address === null || data.exact_address === null) return;
      state.address = data.address;
      state.exactAddress = data.exact_address;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload;
    },
    setUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAddress: (
      state,
      action: PayloadAction<{ long: number; lat: number; parsed: string }>,
    ) => {
      state.address = { ...action.payload, parsed: action.payload.parsed };
    },
    setExactAddress: (state, action: PayloadAction<string>) => {
      state.exactAddress = action.payload;
    },
    setKaspiPhone: (state, action: PayloadAction<string>) => {
      state.kaspi_phone = action.payload;
    },
    setClientComment: (state, action: PayloadAction<string>) => {
      state.client_comment = action.payload;
    },
    setBonusUsed: (state, action: PayloadAction<boolean>) => {
      state.bonus_used = action.payload;
    },
    setCompanyId: (state, action: PayloadAction<number>) => {
      state.company_id = action.payload;
    },
    setDoneTime: (state, action: PayloadAction<string>) => {
      state.done_time = action.payload;
    },
  },
});

export const {
  setUserData,
  setUserPhone,
  setKaspiPhone,
  setUserName,
  setAddress,
  setExactAddress,
  setClientComment,
  setBonusUsed,
  setCompanyId,
  setDoneTime,
} = orderSlice.actions;

export default orderSlice.reducer;
