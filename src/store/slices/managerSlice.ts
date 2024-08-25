import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice.ts";

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
  | "on_runner"
  | "done"
  | "on_delivery"
  | "inactive"
  | "rejected";

export type Orders = {
  id: number;
  client_id: string;
  company_id: number | null; // new

  is_delivery: boolean;
  delivery_id: string | null;
  delivery_name: string;
  products: Array<OrderProducts>; // change
  status: OrderStatuses;
  rejected_text: string;
  bonus_used: boolean;
  bonus_amount: number;
  delivery_price: number;
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

export type OrderProducts = {
  id?: number;
  order_id?: Orders["id"]; // Он не нужен, только для связи 2 таблиц поидее необходим
  product_id: Products["id"];
  additions: Array<Additions["id"]>;
  active_modifier: Modifiers["id"] | null;
  amount: number;
  price: number;
  client_comment: string;
};

type DeliveryUser = {
  telegram_id: string;
  telegram_fullname: string;
};

export type Notification = {
  order_id: number;
};

export type ManagerState = {
  orders: Array<Orders>;
  statusOpen: { [key in OrderStatuses]: boolean };
  deliveries: DeliveryUser[];
  notifications: Notification[];
};

const initialState: ManagerState = {
  orders: [],
  statusOpen: {
    manager_await: false,
    payment_await: false,
    active: false,
    on_runner: false,
    done: false,
    on_delivery: false,
    inactive: false,
    rejected: false,
  },
  deliveries: [],
  notifications: [],
};

// function isToday(dateString: string) {
//   const date = new Date(dateString);
//   const today = new Date();
//   return (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   );
// }

type fetchOrdersProps = {
  statuses?: OrderStatuses[];
  company_ids?: number[];
};

type fetchOrdersByFilter = {
  status?: OrderStatuses;
  company_id?: number;
};

const fetchOrdersByFilter = async ({
  status,
  company_id,
}: fetchOrdersByFilter) => {
  const queryParams: any = {};

  if (status) {
    queryParams.status = status;
  }

  if (company_id) {
    queryParams.company_id = company_id;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}food/orders/?${queryString}`,
    {
      method: "GET",
    },
  );
  const data: Array<Orders> = await response.json();
  return data.map((order) => {
    return { ...order, delivery_name: "" };
  });
};

export const fetchOrders = createAsyncThunk(
  "orders",
  async ({ statuses, company_ids }: fetchOrdersProps) => {
    let result: Orders[] = [];

    if (statuses === undefined) {
      if (company_ids === undefined) {
        result = await fetchOrdersByFilter({});
      } else {
        for (const company_id of company_ids) {
          const orders = await fetchOrdersByFilter({ company_id: company_id });
          result.push(...orders);
        }
      }
    } else {
      if (company_ids === undefined) {
        for (const status of statuses) {
          const orders = await fetchOrdersByFilter({ status: status });
          result.push(...orders);
        }
      } else {
        for (const status of statuses) {
          for (const company_id of company_ids) {
            const orders = await fetchOrdersByFilter({
              status: status,
              company_id: company_id,
            });
            result.push(...orders);
          }
        }
      }
    }

    return result;
  },
);

export const fetchDeliveries = createAsyncThunk("deliveries", async () => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "auth/register/",
    {
      method: "GET",
    },
  );
  const data: UserState[] = await response.json();
  return data
    .filter((user) => user.role === "delivery")
    .map((user) => {
      return {
        telegram_id: user.telegram_id,
        telegram_fullname: user.telegram_fullname,
      };
    });
});

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Array<Orders>>) => {
      state.orders = action.payload;
    },
    setStatusOpen: (
      state,
      action: PayloadAction<{ [key in OrderStatuses]: boolean }>,
    ) => {
      state.statusOpen = action.payload;
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    clearState: (state) => {
      state.notifications = initialState.notifications;
      state.orders = initialState.orders;
      state.statusOpen = initialState.statusOpen;
      state.deliveries = initialState.deliveries;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchDeliveries.fulfilled, (state, action) => {
      state.deliveries = action.payload;
    });
  },
});

export const { setOrders, setStatusOpen, setNotifications, clearState } =
  managerSlice.actions;

export default managerSlice.reducer;
