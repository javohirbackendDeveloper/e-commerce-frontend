import { create } from "zustand";
import { axiosInstance } from "./axios/axios";
import { toast } from "sonner";

export const FakeCartStore = create((set, get) => ({
  fakeCartProducts: [],
  totalFakeQuantity: 0,
  totalFakePrice: 0,

  async createFakeCartProduct(product, purchasedQuantity) {
    try {
      const existProducts =
        JSON.parse(window.localStorage.getItem("fakeCart")) || [];

      const foundProduct = existProducts.find((item) => item.id === product.id);

      if (foundProduct) {
        foundProduct.quantity += 1;
        toast.success("Mahsulot savatga qo'shildi");
      } else {
        existProducts.push({ ...product, purchasedQuantity });
      }

      window.localStorage.setItem("fakeCart", JSON.stringify(existProducts));
      await get().getFakeCartProduct();
      toast.success("Mahsulot savatga qo'shildi");
    } catch (err) {
      console.log({ err });

      toast.error(err.message);
    }
  },

  async getFakeCartProduct() {
    try {
      const fakeProducts =
        JSON.parse(window.localStorage.getItem("fakeCart")) || [];

      set({ fakeCartProducts: fakeProducts });
      return fakeProducts;
    } catch (err) {
      toast.error(err.message);
    }
  },

  async getFakePriceQuantity() {
    try {
      const products = await get().getFakeCartProduct();

      //   console.log({ products });

      set({ totalFakeQuantity: products?.length });

      const totalPrice = products?.reduce(
        (total, p) => total + p.price * p.purchasedQuantity,
        0
      );
      set({ totalFakePrice: totalPrice });
    } catch (err) {
      toast.error(err.message);
    }
  },

  async findOneFakeCartProduct(id) {
    try {
      const products = get().fakeCartProducts;
      const existItem = products.find((item) => item.id === id);

      return existItem;
    } catch (err) {
      toast.error(err.message);
    }
  },

  async updateFakeCartQuantity(id, newQuantity) {
    try {
      const products = get().fakeCartProducts;
      const existItem = products.find((item) => item.id === id);

      if (!existItem) {
        toast.error("Bu mahsulot sizning savatda topilmadi");
        return;
      }

      existItem.purchasedQuantity = newQuantity;

      window.localStorage.setItem("fakeCart", JSON.stringify(products));

      await get().getFakeCartProduct();
    } catch (err) {
      toast.error(err.message);
    }
  },

  async removeFakeCartProduct(id) {
    try {
      const products = get().fakeCartProducts;
      const addedProducts = products.filter((item) => item.id !== id);

      window.localStorage.setItem("fakeCart", JSON.stringify(addedProducts));

      await get().getFakeCartProduct();
    } catch (err) {
      toast.error(err.message);
    }
  },
}));
