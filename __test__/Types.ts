/* ------- Типы данных, не таблицы ------- */
type UserRoles = "manager" | "client" | "admin" | "delivery";

type Address = {
  lat: number;
  long: number; // long вместо loc
};

type Time = string; // format - "hh:mm"

type OrderStatuses =
  | "manager_await"
  | "payment_await"
  | "active"
  | "done"
  | "on_delivery"
  | "inactive";

/* ------- Company Module ------- */
type DeliveryLayers = {
  points: Address[]; // Если лень, можешь просто сделать Json. Это колонку тебе не надо будет изменять, максимум полностью поменять все содержимое на новое
  cost: number;
};

type CompanySpots = {
  id: number;
  name: string; // new
  link: string; // new
  manager_id: Users["id"];
  address: Address;
  address_link: string;
  deliveryLayers: DeliveryLayers[]; // Теперь это должна быть отдельная таблица с колонкой points

  products_on_stop: Array<Products["id"]>;
  additions_on_stop: Array<Additions["id"]>;

  open_time: Time; // new
  close_time: Time; // new

  updated_at: Date;
  created_at: Date;
};

/* ------- User Module ------- */

type Users = {
  id: number;
  promo: Promos["token"] | null;
  fullname: string;
  phone: string | null;
  kaspi_phone: string | null; // тоже сохраняется с последнего заказа
  // address: Address | null; уже не нужен, нам надо все старые адреса пользователя показвать, это через таблицу Orders будем делать
  // exactAddress: string | null;
  bonus: number;
  role: UserRoles;
  activeActions: Array<Actions["id"]>;

  updated_at: Date;
  created_at: Date;
};

type Promos = {
  token: string;
  name: string;
  link_to_source: string | null;
  action_id: Actions["id"]; // new
};

/* ------- Product Categories Module ------- */

type Categories = {
  id: number;
  name: string;
  description: string;

  updated_at: Date;
  created_at: Date;
};

/* ------- Product Module ------- */

type Products = {
  id: number;
  category_id: Categories["id"];
  image_url: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: "KZT";
  modifiers: Array<Modifiers["id"]>;
  additions: Array<Additions["id"]>;
  tags: ProductTags[];

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

type ProductTags = {
  product_id: Products["id"];
  tag_id: Tags["id"];
  end_date: Date;
  // tag_color: string; Пересен в таблицу Tags
};

/* ------- Action Module ------- */

type Actions = {
  id: number;
  name: string;
  description: string; // new
  can_be_triggered: boolean;
  trigger: Array<Triggers["id"]>;
  payload: Array<Payloads["id"]>;
  date_start: Date;
  date_end: Date;
};

type Triggers = {
  id: number;
  name: string;
  short_name: string;
  payload: JSON;
};

type Payloads = {
  id: number;
  name: string;
  short_name: string;
  payload: JSON;
};

/* ------- Order Module ------- */

type Orders = {
  id: number;
  client_id: Users["id"];
  company_id: CompanySpots["id"] | null; // new

  products: Array<OrderProducts>; // change
  status: OrderStatuses;
  bonus_used: boolean;
  done_time: Time; // new
  user_name: string;
  address: Address | null;
  exactAddress: string | null;
  phone: string;
  kaspi_phone: string;
  client_comment: string | null;

  actions: Array<OrderActions>; // change

  updated_at: Date;
  created_at: Date;
};

type OrderActions = {
  order_id: Orders["id"];
  action_id: Actions["id"];
};

type OrderProducts = {
  id: number;
  order_id: Orders["id"]; // Он не нужен, только для связи 2 таблиц поидее необходим
  product_id: Products["id"];
  additions: Array<Additions["id"]>;
  active_modifier: Modifiers["id"] | null;
  amount: number;
  new_price: number | null;
  client_comment: string;
};
