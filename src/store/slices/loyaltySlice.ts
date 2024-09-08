import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type Action = {
  id: number;
  company: number;
  name: string;
  image_url: string | null;
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
  async (company_id: number) => {
    const actions: Action[] = [
      {
        id: 1,
        company: company_id,
        name: "",
        description: "",
        can_be_triggered: true,
        can_be_repeated: true,
        image_url: null,
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
      {
        id: 2,
        company: company_id,
        name: "",
        description: "",
        can_be_triggered: true,
        can_be_repeated: true,
        image_url: null,
        triggers: [
          {
            product_id: 2,
          },
        ],
        payloads: [
          {
            discount_amount: 500,
          },
        ],
      },
      {
        id: 3,
        company: company_id,
        name: "",
        description: "",
        can_be_triggered: true,
        can_be_repeated: true,
        image_url: null,
        triggers: [
          {
            product_id: 3,
          },
        ],
        payloads: [
          {
            discount_percent: 20,
          },
        ],
      },
      {
        id: 4,
        company: company_id,
        name: "",
        description: "",
        can_be_triggered: true,
        can_be_repeated: true,
        image_url: null,
        triggers: [
          {
            category_id: 2,
          },
        ],
        payloads: [
          {
            discount_percent: 10,
          },
        ],
      },
      {
        id: 5,
        company: company_id,
        name: "2 пиццы и напиток",
        description: "Закажи 2 пиццы и любой напиток и получи скидку",
        can_be_triggered: true,
        can_be_repeated: true,
        image_url:
          "https://sun6-20.userapi.com/impg/YPnQ-S8ijXFWQFc-lu_CiQ4b10UF0nc-lKLHKw/maOhcUUnIuY.jpg?size=520x0&quality=95&sign=8170db368b33d5f6935f11a3467a1c75",
        triggers: [
          {
            product_lists: [
              [1, 2, 3, 4, 5, 6, 7, 8, 9],
              [1, 2, 3, 4, 5, 6, 7, 8, 9],
              [1, 2, 3, 4, 5, 6, 7, 8, 9],
              [18, 19, 20, 21, 22, 23, 24],
              14,
            ],
          },
        ],
        payloads: [
          {
            new_price: 4000,
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
  reducers: {
    setProductActions: (state, action: PayloadAction<ProductActions>) => {
      console.log(`setProductActions: ${JSON.stringify(action.payload)}`);
      state.productActions = action.payload;
    },
    setOrderActions: (state, action: PayloadAction<Action[]>) => {
      state.orderActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActions.fulfilled, (state, action) => {
      console.log(`fetchActions.fulfilled: ${JSON.stringify(action.payload)}`);
      state.actions = action.payload;
    });
    builder.addCase(fetchUserActions.fulfilled, (state, action) => {
      console.log(
        `fetchUserActions.fulfilled: ${JSON.stringify(action.payload)}`,
      );
      state.userActions = action.payload;
    });
  },
});

export const { setProductActions, setOrderActions } = loyaltySlice.actions;

export default loyaltySlice.reducer;
