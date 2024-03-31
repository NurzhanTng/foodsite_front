import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Timer = {
  timerId: NodeJS.Timeout;
  id: number | string;
  endTimestamp: number;
};

export type TimerState = {
  timers: Timer[];
};

const initialState: TimerState = {
  timers: [],
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimers: (state, action: PayloadAction<Timer[]>) => {
      state.timers = action.payload;
    },
    deleteAllTimers: (state) => {
      state.timers = []
    }
  },
});

export const { setTimers, deleteAllTimers } = timerSlice.actions;

export default timerSlice.reducer;
