import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderState = {
  client_id: string;
  delivery_id: number;
  company_id: number;
  max_bonus: number;
  bonus_used: boolean;
  done_time: string | null;
  user_name: string;
  address: {
    long: number;
    lat: number;
    parsed: string;
  };
  isDelivery: boolean;
  delivery_amount: number;
  exactAddress: string;
  phone: string;
  kaspi_phone: string;
  client_comment: string;

  actions: Array<string>;
};

const initialState: OrderState = {
  client_id: "",
  delivery_id: -1,
  company_id: -1,
  max_bonus: 0,
  bonus_used: false,
  done_time: null,
  user_name: "",
  address: {
    long: 0,
    lat: 0,
    parsed: "",
  },
  isDelivery: false,
  delivery_amount: 0,
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
        telegram_id: string;
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
      state.max_bonus = data.bonus;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload;
    },
    setUserPhone: (state, action: PayloadAction<string>) => {
      console.log(`set User Phone: ${action.payload}`)
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
    setIsDelivery: (state, action: PayloadAction<boolean>) => {
      state.isDelivery = action.payload;
    },
    setDeliveryAmount: (state, action: PayloadAction<number>) => {
      state.delivery_amount = action.payload;
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
    clearState: (state) => {
      state.client_id = initialState.client_id;
      state.delivery_id = initialState.delivery_id;
      state.company_id = initialState.company_id;
      state.max_bonus = initialState.max_bonus;
      state.bonus_used = initialState.bonus_used;
      state.done_time = initialState.done_time;
      state.user_name = initialState.user_name;
      state.address = initialState.address;
      state.isDelivery = initialState.isDelivery;
      state.exactAddress = initialState.exactAddress;
      state.phone = initialState.phone;
      state.kaspi_phone = initialState.kaspi_phone;
      state.client_comment = initialState.client_comment;
      state.actions = initialState.actions;
    },
  },
});

export const {
  setUserData,
  setUserPhone,
  setKaspiPhone,
  setIsDelivery,
  setDeliveryAmount,
  setUserName,
  setAddress,
  setExactAddress,
  setClientComment,
  setBonusUsed,
  setCompanyId,
  setDoneTime,
  clearState,
} = orderSlice.actions;

export default orderSlice.reducer;
