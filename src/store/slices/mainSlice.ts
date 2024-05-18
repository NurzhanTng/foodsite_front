import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, OrderProduct } from "../../utils/Types.ts";
import _fetchCategories from "../../utils/fetchCategories.ts";
// import range from "../../utils/range.ts";

export type MainState = {
  lastLogin: string;
  categories: Category[];
  activeCategory: number | null;
  cart: OrderProduct[];
  isParamsCartUpdated: boolean;
  errors: {
    cart: boolean;
    name: boolean;
    phone: boolean;
    kaspi_phone: boolean;
    address: boolean;
    time: boolean;
  };
  errorText: string | null;
};

const initialState: MainState = {
  lastLogin: "",
  categories: [],
  activeCategory: 0,
  cart: [],
  isParamsCartUpdated: false,
  errors: {
    cart: false,
    name: false,
    phone: false,
    kaspi_phone: false,
    address: false,
    time: false,
  },
  errorText: null,
};

export const fetchCategories = createAsyncThunk("category", async () => {
  return await _fetchCategories();
});

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLoginTime: (state, action: PayloadAction<string>) => {
      console.log(`state changing: lastLogin[${action.payload}]`);
      state.lastLogin = action.payload;
    },

    setIsParamsCartUpdated: (state, action: PayloadAction<boolean>) => {
      state.isParamsCartUpdated = action.payload;
    },

    setCart: (state, action: PayloadAction<OrderProduct[]>) => {
      state.cart = action.payload;
    },

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
        state.cart = state.cart
          .slice(0, action.payload)
          .concat(state.cart.slice(action.payload + 1));
      } else {
        state.cart[action.payload].amount -= 1;
      }
    },

    setErrors: (
      state,
      action: PayloadAction<{
        cart: boolean;
        name: boolean;
        phone: boolean;
        kaspi_phone: boolean;
        address: boolean;
        time: boolean;
      }>,
    ) => {
      state.errors = action.payload;
    },

    setErrorText(state, action: PayloadAction<string | null>) {
      state.errorText = action.payload;
    },

    clearState: (state) => {
      state.lastLogin = initialState.lastLogin;
      state.categories = initialState.categories;
      state.activeCategory = initialState.activeCategory;
      state.cart = initialState.cart;
      state.isParamsCartUpdated = initialState.isParamsCartUpdated;
      state.errors = initialState.errors;
      state.errorText = initialState.errorText;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setLoginTime,
  setCart,
  setIsParamsCartUpdated,
  setActiveCategory,
  addProductToCart,
  addOneToOrderProduct,
  removeOneToOrderProduct,
  setErrors,
  setErrorText,
  clearState,
} = mainSlice.actions;

export default mainSlice.reducer;
