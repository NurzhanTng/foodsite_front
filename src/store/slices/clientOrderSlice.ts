import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Orders } from "./managerSlice.ts";

export type ClientOrderState = {
  from: string;
  order: Orders | null;
};

const initialState: ClientOrderState = {
  from: '',
  order: null
};

const clientOrderSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setClientOrder: (state, action: PayloadAction<ClientOrderState>) => {
      state.from = action.payload.from;
      state.order = action.payload.order
    },
  },
});

export const { setClientOrder } = clientOrderSlice.actions;

export default clientOrderSlice.reducer;
