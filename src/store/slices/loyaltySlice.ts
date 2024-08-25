import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// PayloadAction

type Triggers = {
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
};

type Action = {
  id: number;
  company: number;
  name: string;
  description: string;
  can_be_triggered: boolean;
  can_be_repeated: boolean;

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

export type LoyaltyState = {
  actions: Action[];
  userActions: UserActions[];
};

const initialState: LoyaltyState = {
  actions: [],
  userActions: [],
};

export const fetchActions = createAsyncThunk(
  "actions",
  async (company_id: number) => {
    const actions: Action[] = [
      {
        id: 1,
        company: company_id,
        name: "",
        description: "",
        can_be_triggered: true,
        can_be_repeated: true,
        triggers: [
          {
            product_id: 1,
          },
        ],
        payloads: [
          {
            new_price: 1500,
          },
        ],
      },
    ];
    return actions;

    // const response = await fetch(
    //   import.meta.env.VITE_REACT_APP_API_BASE_URL +
    //     "loy/actions_company/" +
    //     company_id,
    //   {
    //     method: "GET",
    //   },
    // );
    // // return [];
    //
    // return response.json();
  },
);

export const fetchUserActions = createAsyncThunk(
  "user-actions",
  async (user_id: string) => {
    console.log(user_id);
    return [];
    // const response = await fetch(
    //   import.meta.env.VITE_REACT_APP_API_BASE_URL +
    //     "loy/find_action/?user_id=" +
    //     user_id,
    //   {
    //     method: "GET",
    //   },
    // );
    // // return [];
    //
    // return response.json();
  },
);

const loyaltySlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActions.fulfilled, (state, action) => {
      state.actions = action.payload;
    });
    builder.addCase(fetchUserActions.fulfilled, (state, action) => {
      state.actions = action.payload;
    });
  },
});

export const {} = loyaltySlice.actions;

export default loyaltySlice.reducer;
