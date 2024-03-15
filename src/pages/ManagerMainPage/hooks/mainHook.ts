import { useState } from "react";

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
  address: { long: number, lat: number, parsed: string } | null;
  exact_address: string | null;
  phone: string;
  kaspi_phone: string;
  client_comment: string | null;

  actions: []; // change

  order_time: string
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


const useMainHook = () => {
  const [orders, setOrders] = useState<Array<Orders>>([
    {
      id: 1,
      "products":[
          {"amount":2,"client_comment":"","price":6600,"product_id":2,"active_modifier":null,"additions":[]},
          {"amount":1,"client_comment":"","price":3300,"product_id":2,"active_modifier":null,"additions":[]}
      ],
      "status": "manager_await",
      "is_delivery": true,
      "delivery_id": 0,
      "client_id":921564968,
      "bonus_used":false,
      "user_name":"Nurzhan",
      "address": {
        "long": 76.940421,
        "lat": 43.246945,
        parsed: "улица Толе би, 128"
      },
      "company_id": 1,
      "exact_address":"42 квартира",
      "phone":"+77074862447",
      "kaspi_phone": "+77074862447",
      "client_comment":"",
      "actions":[],
      "done_time":"10:00",
      "order_time": "8:32"
    },
    {
      id: 2,
      "products":[
          {"amount":2,"client_comment":"","price":6600,"product_id":2,"active_modifier":null,"additions":[]},
          {"amount":1,"client_comment":"","price":3300,"product_id":2,"active_modifier":null,"additions":[]},
          {"amount":2,"client_comment":"","price":6600,"product_id":1,"active_modifier":null,"additions":[]},
      ],
      "status": "payment_await",
      "is_delivery": false,
      "delivery_id": 0,
      "client_id": 921564968,
      "bonus_used": true,
      "user_name": "Nurzhan",
      "address": {
        "long": 76.920853,
        "lat": 43.240962,
        parsed: "Жандосова 49"
      },
      "company_id": 1,
      "exact_address":"",
      "phone":"",
      "kaspi_phone": "+77074862447",
      "client_comment":"",
      "actions":[],
      "done_time":"15:00",
      "order_time": "14:10"
    },
    {
      id: 3,
      "products":[
          {"amount":2,"client_comment":"","price":6600,"product_id":2,"active_modifier":null,"additions":[]},
          {"amount":1,"client_comment":"","price":3300,"product_id":2,"active_modifier":null,"additions":[]},
          {"amount":2,"client_comment":"","price":6600,"product_id":1,"active_modifier":null,"additions":[]},
      ],
      "status": "payment_await",
      "is_delivery": false,
      "delivery_id": 0,
      "client_id": 921564968,
      "bonus_used": false,
      "user_name": "Nurzhan",
      "address": {
        "long": 76.920853,
        "lat": 43.240962,
        parsed: "улица Кабанбай батыра 42"
      },
      "company_id": 1,
      "exact_address":"",
      "phone":"",
      "kaspi_phone": "+77074862447",
      "client_comment":"",
      "actions":[],
      "done_time":"16:00",
      "order_time": "15:22"
    }
  ]);


  return {
    orders, setOrders
  }
}

export default useMainHook
