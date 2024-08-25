export type ProductTag = {
  name: string;
  tag_color: string;
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

export type Product = {
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

export type Category = {
  id: number;
  name: string;
  description: string;
  products: Product[];
};

export type OrderProduct = {
  product: Product | undefined;
  active_modifier: Modifiers["id"] | null;
  additions: Array<Additions>;
  price: number;
  amount: number;
  client_comment: string;
};
