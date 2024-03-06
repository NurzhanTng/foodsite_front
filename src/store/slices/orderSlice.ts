import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchAddress from "../../utils/fetchAddress.ts";

export type OrderState = {
  client_id: number;
  company_id: number;
  bonus_used: boolean;
  done_time: number;
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
  company_id: -1,
  bonus_used: false,
  done_time: 0,
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
    setUserData: (state, action: PayloadAction<number>) => {
      state.client_id = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload;
    },
    setUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAddress: (
      state,
      action: PayloadAction<{ long: number; lat: number }>,
    ) => {
      fetchAddress(action.payload.lat, action.payload.long)
        .then((data) => {
          console.log("Fetched data: ", data);
          state.address = { ...action.payload, parsed: "data" };
        });
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
  setBonusUsed
} = orderSlice.actions;

export default orderSlice.reducer;
