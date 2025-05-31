import { create } from "zustand";
import { axiosInstance } from "./axios/axios";
import { toast } from "sonner";

export const PosterStore = create((set, get) => ({
  posters: [],

  async getPosters() {
    try {
      const res = await axiosInstance.get("/products/poster");

      if (res.data[0]?.id) {
        set({ posters: res.data });
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
}));
