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
