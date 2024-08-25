import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";

import mainReducer from "./slices/mainSlice.ts";
import orderSlice from "./slices/orderSlice.ts";
import userSlice from "./slices/userSlice.ts";
import companiesSlice from "./slices/companySlice.ts";
import managerSlice from "./slices/managerSlice.ts";
import timerSlice from "./slices/timerSlice.ts";
import clientOrderSlice from "./slices/clientOrderSlice.ts";
import loyaltySlice from "./slices/loyaltySlice.ts";

const rootReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  combineReducers({
    main: mainReducer,
    order: orderSlice,
    user: userSlice,
    companies: companiesSlice,
    manager: managerSlice,
    timer: timerSlice,
    clientOrder: clientOrderSlice,
    loyalty: loyaltySlice,
  }),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
