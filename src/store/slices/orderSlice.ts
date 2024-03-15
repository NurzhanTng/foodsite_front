import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getAddress } from "../../utils/fetchAddress.ts";

export type OrderState = {
  client_id: number;
  jwt_token: string;
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
  jwt_token: "",
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
      jwt_token: string;
      telegram_fullname: string;
      phone: string;
      kaspi_phone?: string;
      bonus: number;
    }>,
    ) => {
      const data = action.payload;
      state.client_id = data.telegram_id;
      state.jwt_token= data.jwt_token
      state.user_name= data.telegram_fullname
      state.phone= data.phone
      state.kaspi_phone= data.kaspi_phone ? data.kaspi_phone : ""
      state.max_bonus= data.bonus
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload;
    },
    setUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAddress: (
      state,
      action: PayloadAction<{ long: number; lat: number; parsed?: string }>,
    ) => {
      if (action.payload.parsed === undefined) {
        state.address = { ...action.payload, parsed: "" };
      } else {
        state.address = { ...action.payload, parsed: action.payload.parsed };
      }
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
