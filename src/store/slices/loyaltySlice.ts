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
    // const actions: Action[] = [
    //   // {
    //   //   id: 1,
    //   //   company: company_id,
    //   //   name: "",
    //   //   description: "",
    //   //   can_be_triggered: true,
    //   //   can_be_repeated: true,
    //   //   image_url: null,
    //   //   triggers: [
    //   //     {
    //   //       product_id: 1,
    //   //     },
    //   //   ],
    //   //   payloads: [
    //   //     {
    //   //       new_price: 1500,
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   id: 2,
    //   //   company: company_id,
    //   //   name: "",
    //   //   description: "",
    //   //   can_be_triggered: true,
    //   //   can_be_repeated: true,
    //   //   image_url: null,
    //   //   triggers: [
    //   //     {
    //   //       product_id: 2,
    //   //     },
    //   //   ],
    //   //   payloads: [
    //   //     {
    //   //       discount_amount: 500,
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   id: 3,
    //   //   company: company_id,
    //   //   name: "",
    //   //   description: "",
    //   //   can_be_triggered: true,
    //   //   can_be_repeated: true,
    //   //   image_url: null,
    //   //   triggers: [
    //   //     {
    //   //       product_id: 3,
    //   //     },
    //   //   ],
    //   //   payloads: [
    //   //     {
    //   //       discount_percent: 20,
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   id: 3,
    //   //   company: company_id,
    //   //   name: "",
    //   //   description: "",
    //   //   can_be_triggered: true,
    //   //   can_be_repeated: true,
    //   //   image_url: null,
    //   //   triggers: [
    //   //     {
    //   //       product_id: 3,
    //   //     },
    //   //   ],
    //   //   payloads: [
    //   //     {
    //   //       discount_percent: 20,
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   id: 4,
    //   //   company: company_id,
    //   //   name: "",
    //   //   description: "",
    //   //   can_be_triggered: true,
    //   //   can_be_repeated: true,
    //   //   image_url: null,
    //   //   triggers: [
    //   //     {
    //   //       category_id: 2,
    //   //     },
    //   //   ],
    //   //   payloads: [
    //   //     {
    //   //       discount_percent: 10,
    //   //     },
    //   //   ],
    //   // },
    //   {
    //     id: 5,
    //     company: company_id,
    //     name: "2 пиццы и напиток",
    //     description: "Закажи 2 пиццы и любой напиток и получи скидку",
    //     can_be_triggered: true,
    //     can_be_repeated: true,
    //     image_url:
    //       "https://sun6-20.userapi.com/impg/YPnQ-S8ijXFWQFc-lu_CiQ4b10UF0nc-lKLHKw/maOhcUUnIuY.jpg?size=520x0&quality=95&sign=8170db368b33d5f6935f11a3467a1c75",
    //     triggers: [
    //       {
    //         product_lists: [
    //           [1, 2, 3, 4, 5, 6, 7, 8, 9],
    //           [1, 2, 3, 4, 5, 6, 7, 8, 9],
    //           [18, 19, 20, 21, 22, 23, 24],
    //         ],
    //       },
    //     ],
    //     payloads: [
    //       {
    //         new_price: 4000,
    //       },
    //     ],
    //   },
    //   {
    //     id: 9,
    //     company: company_id,
    //     name: "Скидка 50% на доставку",
    //     description:
    //       "Получите скидку 50% на все блюда на доставку при заказе в нашем онлайн-кафе! Наслаждайтесь" +
    //       " любимыми блюдами, не выходя из дома, с выгодными условиями доставки. Акция действует автоматически при" +
    //       " оформлении заказа через наш бот.",
    //     can_be_triggered: true,
    //     can_be_repeated: true,
    //     image_url:
    //       "https://ucarecdn.com/6d35201e-acc6-46e9-b13c-c53d3d0d170d/-/format/auto/-/preview/3000x3000/-/quality/lighter/pf-dfc945db--50sale.png",
    //     triggers: [
    //       {
    //         isDelivery: true,
    //         product_ids: [
    //           1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //           21, 22, 23, 24, 25, 26, 27, 28,
    //         ],
    //       },
    //     ],
    //     payloads: [
    //       {
    //         discount_percent: 50,
    //       },
    //     ],
    //   },
    // ];
    // const array: OrderProduct[][] = [];
    // return actions.map((action) =>
    //   action.triggers[0].product_lists
    //     ? {
    //         ...action,
    //         payloads: action.payloads.map((payload, index) =>
    //           index === 0 ? { ...payload, comboProducts: array } : payload,
    //         ),
    //       }
    //     : action,
    // );

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
    console.log(`fetchActions: ${filteredActions}`);
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
      console.log(`setProductActions: ${JSON.stringify(action.payload)}`);
      state.productActions = action.payload;
    },
    setOrderActions: (state, action: PayloadAction<Action[]>) => {
      console.log("setOrderActions");
      console.log(action.payload);
      state.orderActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActions.fulfilled, (state, action) => {
      console.log(`fetchActions.fulfilled: ${JSON.stringify(action.payload)}`);
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
