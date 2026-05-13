export type ProductCategory =
  | "electronics"
  | "clothing"
  | "accessories"
  | "home"
  | "fitness";

export type ProductStatus = "active" | "draft" | "out-of-stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: ProductStatus;
  rating: number;
  image: string;
  createdAt: string;
};