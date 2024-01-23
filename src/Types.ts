export type ProductTag = {
  tag_name: string;
  tag_color: string;
};

type Modifiers = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;
  on_stop: boolean;
};

type ProductSizes = {
  id: number;
  price: number;
  currency: "KZT";
  name: string;
  on_stop: boolean;
};

export type Product = {
  id: number;
  image_url: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: "KZT";
  sizes: ProductSizes[];
  modifiers: Modifiers[];
  tags: ProductTag[];
  on_stop: boolean;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  products: Product[];
  stop: boolean;
};

export type OrderProduct = {
  product_id: Product["id"];
  active_size: ProductSizes["id"] | null; // Индекс выбранного размера блюда, если есть разновидности. Иначе null
  modifiers: Array<Modifiers["id"]>;
  amount: number;
  client_comment: string;
};
