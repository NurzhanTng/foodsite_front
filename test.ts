/* ----- Types creators ----- */

type Triggers = {
  id: number;
  value:
    | {
        product_id: number;
      }
    | {
        product_ids: number[];
      }
    | {
        category_id: number;
      }
    | {
        category_ids: number[];
      }
    | {
        product_lists: (number | number[])[];
      }
    | {
        date_start?: string;
        date_end?: string;
        days?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
        time_start?: string;
        time_end?: string;
      }
    | {
        order_cost_min?: number;
        order_cost_max?: number;
      }
    | {};
};

type Payloads = {
  id: number;
  value:
    | {}
    | {
        product_id: number;
        discount_percent: number;
      };
};

type Action = {
  id: number;
  company: number;
  name: string;
  description: string;
  can_be_triggered: boolean;
  triggers: Triggers[];
  payloads: Payloads[];
};

type Modifiers = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;
  on_stop: boolean;
};

type Additions = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;
  on_stop: boolean;
};

type ProductTag = { name: string; tag_color: string };

type Product = {
  id: number;
  category_id: number;
  image_url: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: "KZT";
  modifiers: Modifiers[];
  additions: Additions[];
  tags: ProductTag[];
  on_stop: boolean;
};

type OrderProduct = {
  product: Product;
  amount: number;
  client_comment: string;
  price: number | null;
  product_id: Product["id"];
  active_modifier: Modifiers["id"] | null;
  additions: Additions["id"][];
};

type Order = {
  client_id: string;
  company_id: number | null; // new

  is_delivery: boolean;
  products: Array<OrderProduct>; // change
  bonus_used: boolean;
  bonus_amount: number;
  delivery_price: number;
  done_time: string; // new
  user_name: string;
  address: {
    long: number;
    lat: number;
    parsed?: string;
    exact_address?: string;
  } | null;
  exact_address: string | null;
  phone: string;
  kaspi_phone: string;
  client_comment: string | null;

  actions: Action[]; // change
};

type Test = {
  actions: Action[];
  order: Order;
  result: boolean[];
};
// */

/* ----- Action creators ----- */

let actionCounter = 0; // начальное значение счетчика акций
let triggerCounter = 0; // начальное значение счетчика триггеров

const createEmptyTrigger = (): Triggers => ({
  id: triggerCounter++,
  value: {},
});

const createProductTrigger = (productId: number): Triggers => ({
  id: triggerCounter++,
  value: {
    product_id: productId,
  },
});

const createProductListTrigger = (productIds: number[]): Triggers => ({
  id: triggerCounter++,
  value: {
    product_ids: productIds,
  },
});

const createCategoryTrigger = (categoryId: number): Triggers => ({
  id: triggerCounter++,
  value: {
    category_id: categoryId,
  },
});

const createCategoryListTrigger = (categoryIds: number[]): Triggers => ({
  id: triggerCounter++,
  value: {
    category_ids: categoryIds,
  },
});

const createProductListsTrigger = (
  productLists: (number | number[])[],
): Triggers => ({
  id: triggerCounter++,
  value: {
    product_lists: productLists,
  },
});

const createDateTimeTrigger = (
  dateStart?: string,
  dateEnd?: string,
  days?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[],
  timeStart?: string,
  timeEnd?: string,
): Triggers => {
  const value: any = {};

  if (dateStart !== undefined || dateEnd !== undefined) {
    value.date_start = dateStart;
    value.date_end = dateEnd;
  }

  if (days !== undefined) {
    value.days = days;
  }

  if (timeStart !== undefined || timeEnd !== undefined) {
    value.time_start = timeStart;
    value.time_end = timeEnd;
  }

  return {
    id: triggerCounter++,
    value: value,
  };
};

const createOrderCostTrigger = (
  orderCostMin?: number,
  orderCostMax?: number,
): Triggers => {
  const value: any = {};

  if (orderCostMin !== undefined) {
    value.order_cost_min = orderCostMin;
  }

  if (orderCostMax !== undefined) {
    value.order_cost_max = orderCostMax;
  }

  return {
    id: triggerCounter++,
    value: value,
  };
};

type createActionProps = {
  triggers: Triggers[];
  company?: number;
  name?: string;
  description?: string;
  can_be_triggered?: boolean;
};

const createAction = ({
  triggers,
  company = 1,
  name = "Default Name",
  description = "Default Description",
  can_be_triggered = true,
}: createActionProps): Action => {
  actionCounter += 1;
  return {
    id: actionCounter,
    company: company,
    name,
    description,
    triggers,
    can_be_triggered: can_be_triggered,
    payloads: [],
  };
};

type createOrderProps = {
  products: OrderProduct[];
  company_id?: number;
  is_delivery?: boolean;
};

const createOrder = ({
  products,
  company_id = 2,
  is_delivery = true,
}: createOrderProps): Order => {
  return {
    products: products,
    client_id: "1234249296",
    bonus_used: false,
    user_name: "Nurzhan",
    address: {
      lat: 76.876214,
      long: 43.218921,
      parsed: "улица Жандосова, 49",
      exact_address: "94 квартира",
    },
    company_id: company_id,
    exact_address: "94 квартира",
    phone: "77074862447",
    kaspi_phone: "77074862447",
    is_delivery: is_delivery,
    client_comment: "",
    done_time: "",
    bonus_amount: 3270,
    delivery_price: 0,
    actions: [],
  };
};

// */

/* ----- Action and order objects ----- */

// const = createAction({ triggers: [] })
const emptyAction = createAction({ triggers: [createEmptyTrigger()] });
const anotherCompanyAction = createAction({
  triggers: [createEmptyTrigger()],
  company: 2,
});
const emptyTriggersAction = createAction({ triggers: [] });
const cantBeTriggeredAction = createAction({
  triggers: [createEmptyTrigger()],
  can_be_triggered: false,
});
const productAction1 = createAction({ triggers: [createProductTrigger(1)] });
const productAction2 = createAction({ triggers: [createProductTrigger(2)] });
const productAction3 = createAction({ triggers: [createProductTrigger(3)] });
const productListAction1 = createAction({
  triggers: [createProductListTrigger([1, 2])],
});
const productListAction2 = createAction({
  triggers: [createProductListTrigger([3, 5])],
});
const categoryAction1 = createAction({ triggers: [createCategoryTrigger(1)] });
const categoryAction2 = createAction({ triggers: [createCategoryTrigger(3)] });
const categoryListAction = createAction({
  triggers: [createCategoryListTrigger([1, 2])],
});
const pizzaAndDrinkComboAction = createAction({
  triggers: [createProductListsTrigger([[1, 2, 3], 4, [15, 16, 17]])],
});
const pizza2ComboAction = createAction({
  triggers: [
    createProductListsTrigger([
      [1, 2, 3],
      [1, 2, 3],
    ]),
  ],
});
const drink2ComboAction = createAction({
  triggers: [
    createProductListsTrigger([
      [15, 16, 17],
      [15, 16, 17, 18],
    ]),
  ],
});
const drink2ComboAction2 = createAction({
  triggers: [
    createProductListsTrigger([
      [15, 16, 17, 18],
      [15, 16, 17],
    ]),
  ],
});
const dateAction1 = createAction({
  triggers: [createDateTimeTrigger(undefined, "11.07.2024")],
});
const dateAction2 = createAction({
  triggers: [createDateTimeTrigger(undefined, "12.07.2024")],
});
const dateAction3 = createAction({
  triggers: [createDateTimeTrigger("11.07.2024", undefined)],
});
const dateAction4 = createAction({
  triggers: [createDateTimeTrigger("12.07.2024", undefined)],
});
const dateAction5 = createAction({
  triggers: [createDateTimeTrigger("10.07.2024", "14.04.2024")],
});
const dateAction6 = createAction({
  triggers: [createDateTimeTrigger("11.07.2024", "11.07.2024")],
});
const dayAction1 = createAction({
  triggers: [createDateTimeTrigger(undefined, undefined, [3])],
});
const dayAction2 = createAction({
  triggers: [createDateTimeTrigger(undefined, undefined, [1, 5])],
});
const timeAction1 = createAction({
  triggers: [
    createDateTimeTrigger(undefined, undefined, undefined, "15:00", "19:00"),
  ],
});
const timeAction2 = createAction({
  triggers: [
    createDateTimeTrigger(undefined, undefined, undefined, "12:00", "10:00"),
  ],
});
const timeAction3 = createAction({
  triggers: [
    createDateTimeTrigger(undefined, undefined, undefined, "09:00", "13:00"),
  ],
});
const timeAction4 = createAction({
  triggers: [
    createDateTimeTrigger(undefined, undefined, undefined, "09:00", "19:00"),
  ],
});
const timeAction5 = createAction({
  triggers: [
    createDateTimeTrigger(undefined, undefined, undefined, "21:00", "22:00"),
  ],
});
const costAction1 = createAction({
  triggers: [createOrderCostTrigger(undefined, 20_000)],
});
const costAction2 = createAction({
  triggers: [createOrderCostTrigger(1_000, 20_000)],
});
const costAction3 = createAction({
  triggers: [createOrderCostTrigger(undefined, 1_000)],
});
const costAction4 = createAction({
  triggers: [createOrderCostTrigger(100_000, undefined)],
});

const order1 = createOrder({
  products: [
    {
      product: {
        id: 1,
        category_id: 1,
        image_url:
          "https://pizza.pizzeria-almaty.kz/media/images/margarita.JPEG",
        name: "Маргарита",
        description:
          "Пицца Маргарита - это классическая пицца с томатным соусом, моцареллой и базиликом",
        price: 2500,
        currency: "KZT",
        modifiers: [],
        additions: [
          {
            id: 1,
            price: 500,
            currency: "KZT",
            name: "много пармезана",
            on_stop: false,
          },
          {
            id: 2,
            price: 150,
            currency: "KZT",
            name: "нарубить чили",
            on_stop: false,
          },
          {
            id: 3,
            price: 250,
            currency: "KZT",
            name: "полить прекрасным маслом",
            on_stop: false,
          },
          {
            id: 4,
            price: 1000,
            currency: "KZT",
            name: "добавить курицу",
            on_stop: false,
          },
          {
            id: 5,
            price: 1500,
            currency: "KZT",
            name: "добавить трюфель",
            on_stop: false,
          },
          {
            id: 6,
            price: 500,
            currency: "KZT",
            name: "двойной сыр",
            on_stop: false,
          },
        ],
        tags: [],
        on_stop: false,
      },
      amount: 1,
      client_comment: "",
      price: 3000,
      product_id: 1,
      active_modifier: null,
      additions: [],
    },
  ],
});

const actions = [
  emptyAction,
  anotherCompanyAction,
  emptyTriggersAction,
  cantBeTriggeredAction,
  productAction1,
  productAction2,
  productAction3,
  productListAction1,
  productListAction2,
  categoryAction1,
  categoryAction2,
  categoryListAction,
  productListAction1,
  pizzaAndDrinkComboAction,
  pizza2ComboAction,
  drink2ComboAction,
  drink2ComboAction2,
  dateAction1,
  dateAction2,
  dateAction3,
  dateAction4,
  dateAction5,
  dateAction6,
  dayAction1,
  dayAction2,
  timeAction1,
  timeAction2,
  timeAction3,
  timeAction4,
  timeAction5,
  costAction1,
  costAction2,
  costAction3,
  costAction4,
];

/* ----- Test creators ----- */

const tests: Test[] = [
  {
    actions: [productAction1],
    order: order1,
    result: [true],
  },
];

console.log(JSON.stringify(tests, undefined, "\t"));
// */
