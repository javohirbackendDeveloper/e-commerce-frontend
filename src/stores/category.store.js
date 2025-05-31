import { create } from "zustand";
import { axiosInstance } from "./axios/axios";

export const CategoryStore = create((set, get) => ({
  parentCategories: [],
  parentCategoriesWithSub: [],

  async getParentCategories() {
    try {
      const res = await axiosInstance.get("/products/category");

      set({ parentCategories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  async getParentCategoriesWithSub() {
    try {
      const res = await axiosInstance.get(
        "/products/category/getParentsWithSub"
      );

      set({ parentCategoriesWithSub: res.data });
    } catch (err) {
      console.log(err);
    }
  },
}));
