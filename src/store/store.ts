import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/mainSlice.ts";
import orderSlice from "./slices/orderSlice.ts";
import userSlice from "./slices/userSlice.ts";
import companiesSlice from "./slices/companySlice.ts";
import managerSlice from "./slices/managerSlice.ts";

const store = configureStore({
  reducer: {
    main: mainReducer,
    order: orderSlice,
    user: userSlice,
    companies: companiesSlice,
    manager: managerSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
