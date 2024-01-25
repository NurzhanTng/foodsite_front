import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, OrderProduct } from "../../Types.ts";
import _fetchCategories from "../../utils/fetchCategories.ts";
// import range from "../../utils/range.ts";

export type MainState = {
  categories: Category[];
  activeCategory: number | null;
  cart: OrderProduct[];
};

const initialState: MainState = {
  categories: [],
  activeCategory: 0,
  cart: [],
};

export const fetchCategories = createAsyncThunk("category", async () => {
  return await _fetchCategories();
});

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },

    addProductToCart: (state, action: PayloadAction<OrderProduct>) => {
      const newProduct = action.payload;
      state.cart.push(newProduct);
    },

    addOneToOrderProduct: (state, action: PayloadAction<number>) => {
      state.cart[action.payload].amount += 1;
    },

    removeOneToOrderProduct: (state, action: PayloadAction<number>) => {
      if (state.cart[action.payload].amount === 1) {
        state.cart = state.cart.slice(0, action.payload).concat(state.cart.slice(action.payload + 1));
      } else {
        state.cart[action.payload].amount -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setActiveCategory,
  addProductToCart,
  addOneToOrderProduct,
  removeOneToOrderProduct,
} = mainSlice.actions;

export default mainSlice.reducer;
