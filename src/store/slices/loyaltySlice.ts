import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderProduct } from "../../utils/Types.ts";

type Triggers = {
  isDelivery?: boolean;
  product_id?: number;
  product_ids?: number[];
  category_id?: number;
  category_ids?: number[];
  product_lists?: (number | number[])[];
  date_start?: string;
  date_end?: string;
  days?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  time_start?: string;
  time_end?: string;
  order_cost_min?: number;
  order_cost_max?: number;
};

type Payloads = {
  product_id?: number;
  product_ids?: number;
  discount_percent?: number;
  new_price?: number;
  discount_amount?: number;
  new_prices?: {
    product_ids: number[];
    new_price: number[];
  };
  comboProducts?: OrderProduct[][] | undefined;
};

export type Action = {
  id: number;
  company: number;
  name: string;
  image: string | null;
  description: string;

  can_be_triggered: boolean;
  can_be_repeated: boolean;
  can_use_bonus: boolean;
  can_add_bonus: boolean;

  triggers: Triggers[];
  payloads: Payloads[];
};

type UserActions = {
  user: string;
  action: Action["id"];
  amount: number;
  date_start: string | null;
  date_end: string | null;
  is_active: boolean;
};

export type ProductActions = { [key: string]: Action[] };

export type LoyaltyState = {
  actions: Action[];
  userActions: UserActions[];
  productActions: ProductActions;
  orderActions: Action[];
};

const initialState: LoyaltyState = {
  actions: [],
  userActions: [],
  productActions: {},
  orderActions: [],
};

export const fetchActions = createAsyncThunk(
  "actions",
  async ({
    company_id,
    user_id = undefined,
  }: {
    company_id: number;
    user_id: string | undefined;
  }) => {
    console.log(company_id);

    const response = await fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "loy/actions/",
      {
        method: "GET",
      },
    );
    const data: Action[] = await response.json();
    let filteredActions = data.filter((action) => action.can_be_triggered);
    if (user_id !== undefined) {
      const response2 = await fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL +
          `service/user/${user_id}/actions/`,
        {
          method: "GET",
        },
      );
      const userActions: Action[] = await response2.json();
      filteredActions = [...filteredActions, ...userActions];
    }
    // console.log(`fetchActions: ${filteredActions}`);
    return filteredActions;
  },
);

// export const fetchUserActions = createAsyncThunk(
//   "user-actions",
//   async (user_id: string) => {
//     const response = await fetch(
//       import.meta.env.VITE_REACT_APP_API_BASE_URL +
//         `service/user/${user_id}/actions/`,
//       {
//         method: "GET",
//       },
//     );
//
//     return response.json();
//   },
// );

const loyaltySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProductActions: (state, action: PayloadAction<ProductActions>) => {
      // console.log(`setProductActions: ${JSON.stringify(action.payload)}`);
      state.productActions = action.payload;
    },
    setOrderActions: (state, action: PayloadAction<Action[]>) => {
      // console.log("setOrderActions");
      // console.log(action.payload);
      state.orderActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActions.fulfilled, (state, action) => {
      // console.log(`fetchActions.fulfilled: ${JSON.stringify(action.payload)}`);
      state.actions = action.payload;
    });
    // builder.addCase(fetchUserActions.fulfilled, (state, action) => {
    //   console.log(
    //     `fetchUserActions.fulfilled: ${JSON.stringify(action.payload)}`,
    //   );
    //   state.actions = [...state.actions, ...action.payload];
    // });
  },
});

export const { setProductActions, setOrderActions } = loyaltySlice.actions;

export default loyaltySlice.reducer;
