import { createServerFn } from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products.data";

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  return { products: PRODUCTS };
});
