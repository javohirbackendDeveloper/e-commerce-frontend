// product.store.js yoki .ts

import { create } from "zustand";
import { axiosInstance } from "./axios/axios";

export const ProductStore = create((set, get) => ({
  products: [],
  page: 1,
  limit: 10,

  getProducts: async () => {
    const { page, limit, products } = get();
    try {
      const res = await axiosInstance.get("/products/product", {
        params: { page, limit },
      });

      set({ products: [...products, ...res.data], page: page + 1 });
    } catch (err) {
      console.error(err);
    }
  },
}));
