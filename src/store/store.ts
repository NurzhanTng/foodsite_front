import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.ts";
import mainReducer from "./slices/mainSlice.ts";
import orderSlice from "./slices/orderSlice.ts";
import userSlice from "./slices/userSlice.ts";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    main: mainReducer,
    order: orderSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
