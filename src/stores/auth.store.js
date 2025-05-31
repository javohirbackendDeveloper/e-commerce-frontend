import { create } from "zustand";
import { axiosInstance } from "./axios/axios";
import { toast } from "sonner";
import { CartStore } from "./cart.store";
import { FakeCartStore } from "./fakeCart.store";

export const AuthStore = create((set, get) => ({
  user: null,
  accessToken: window.localStorage.getItem("accessToken"),

  async login(data) {
    try {
      const res = await axiosInstance.post("/auth/user/login", data);

      if (res.data?.accessToken) {
        await CartStore.getState().addFakeProductsToDatabase();
        await FakeCartStore.getState().getFakeCartProduct();
        window.localStorage.setItem("accessToken", res.data?.accessToken);

        await get().fetchUserInfo();
        toast.success(res.data?.message);
      } else {
        toast.error(
          res.data?.error ||
            "Nimadir xato ketdi, iltimos malumotlarni tekshiring"
        );
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Login errror", err);
    }
  },

  async signup(data) {
    try {
      const res = await axiosInstance.post("/auth/user/register", data);

      if (res.data?.id) {
        await get().fetchUserInfo();
        toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");
        await CartStore.getState().addFakeProductsToDatabase();
        await FakeCartStore.getState().getFakeCartProduct();

        return true;
      } else {
        toast.error(
          res.data?.error ||
            "Nimadir xato ketdi, iltimos malumotlarni tekshiring"
        );
        return false;
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Login errror", err);
    }
  },

  async fetchUserInfo() {
    try {
      const { accessToken } = get();
      if (accessToken) {
        const res = await axiosInstance.get("/auth/user/getUserByToken", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        set({ user: res.data });
      }
    } catch (err) {}
  },
}));
