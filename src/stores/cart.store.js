import { create } from "zustand";
import { axiosInstance } from "./axios/axios";
import { toast } from "sonner";
import { FakeCartStore } from "./fakeCart.store";

export const CartStore = create((set, get) => ({
  cartProducts: [],
  totalQuantity: 0,
  totalPrice: 0,

  async createCartProduct(product, purchasedQuantity) {
    try {
      const requestData = {
        productId: product.id,
        quantity: purchasedQuantity,
      };
      const res = await axiosInstance.post("/orders/cart", requestData);

      if (res.data?.id) {
        toast.success("Mahsulot savatga qo'shildi");
        await get().getCartProduct();
      }
    } catch (err) {
      console.log({ err });

      toast.error(err.message);
    }
  },

  async addFakeProductsToDatabase() {
    try {
      const fakeProducts = await FakeCartStore.getState().getFakeCartProduct();

      if (fakeProducts.length > 0) {
        const formattedProducts = fakeProducts.map((product) => ({
          productId: product.id,
          quantity: product.purchasedQuantity,
        }));

        const res = await Promise.all(
          formattedProducts.map((product) =>
            axiosInstance.post("/orders/cart", product)
          )
        );
        window.localStorage.removeItem("fakeCart");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async getCartProduct() {
    try {
      const res = await axiosInstance.get("/orders/cart");

      set({ cartProducts: res.data.cartItemsWithProduct });

      set({
        totalPrice: res.data?.grandPrice,
        totalQuantity: res.data?.cartItemsWithProduct?.length,
      });
    } catch (err) {
      console.log({ err });
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

  async removeCartProduct(id) {
    try {
      const res = await axiosInstance.delete("/orders/cart/" + id);

      if (res?.data?.id) {
        await get().getCartProduct();
      }
    } catch (err) {
      console.log({ err });
    }
  },
}));
