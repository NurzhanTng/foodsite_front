import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Products = {
  id: number;
  category_id: number;
  image_url: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: "KZT";
  modifiers: Array<Modifiers["id"]>;
  additions: Array<Additions["id"]>;
  tags: Tags[];

  updated_at: Date;
  created_at: Date;
};

type Tags = {
  id: number;
  name: string;
  tag_color: string;
};

type Modifiers = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;
  on_stop: boolean;

  updated_at: Date;
  created_at: Date;
};

type Additions = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;

  updated_at: Date;
  created_at: Date;
};

export type OrderStatuses =
  | "manager_await"
  | "payment_await"
  | "active"
  | "done"
  | "on_delivery"
  | "inactive";

export type Orders = {
  id: number;
  client_id: number;
  company_id: number | null; // new

  is_delivery: boolean;
  delivery_id: number | null;
  products: Array<OrderProducts>; // change
  status: OrderStatuses;
  bonus_used: boolean;
  done_time: string; // new
  user_name: string;
  address: { long: number; lat: number; parsed: string } | null;
  exact_address: string | null;
  phone: string;
  kaspi_phone: string;
  client_comment: string | null;

  created_at: string;
  updated_at: string;

  actions: []; // change

  order_time: string;
};

type OrderProducts = {
  id?: number;
  order_id?: Orders["id"]; // Он не нужен, только для связи 2 таблиц поидее необходим
  product_id: Products["id"];
  additions: Array<Additions["id"]>;
  active_modifier: Modifiers["id"] | null;
  amount: number;
  price: number | null;
  client_comment: string;
};

export type ManagerState = {
  orders: Array<Orders>;
};

const initialState: ManagerState = {
  orders: [],
};

function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export const fetchOrders = createAsyncThunk("orders", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "food/orders/",
    {
      method: "GET",
    },
  );
  const data: Array<Orders> = await response.json();
  return data.filter((order) => isToday(order.created_at));
});

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Array<Orders>>) => {
      state.orders = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {
  setOrders
} = managerSlice.actions;

export default managerSlice.reducer;
