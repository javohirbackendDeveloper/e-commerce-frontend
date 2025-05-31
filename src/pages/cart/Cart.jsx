import React, { useState } from "react";
import { FakeCartStore } from "../../stores/fakeCart.store";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import "./Cart.css";
import { Truck } from "lucide-react";
import { useEffect } from "react";
import { CartStore } from "../../stores/cart.store";
import { AuthStore } from "../../stores/auth.store";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../stores/axios/axios";
function Cart() {
  const { user } = AuthStore();
  const {
    totalFakeQuantity,
    totalFakePrice,
    fakeCartProducts,
    updateFakeCartQuantity,
    removeFakeCartProduct,
    getFakePriceQuantity,
  } = FakeCartStore();
  const {
    getCartProduct,
    cartProducts,
    totalQuantity,
    totalPrice,
    removeCartProduct,
  } = CartStore();
  const [mainCartProducts, setMainCartProducts] = useState([]);
  const handleQuantityChange = (productId, value) => {
    const product = fakeCartProducts.find((p) => p.id === productId);
    if (!product) return;

    const newQuantity = product.purchasedQuantity + value;
    if (newQuantity > 0 && newQuantity <= product.quantity) {
      updateFakeCartQuantity(productId, newQuantity);
      getFakePriceQuantity();
    }
  };

  const handleInputChange = (productId, e) => {
    const value = parseInt(e.target.value) || 1;
    const product = fakeCartProducts.find((p) => p.id === productId);
    if (!product) return;

    const validatedValue = Math.min(Math.max(value, 1), product.quantity);

    updateFakeCartQuantity(productId, validatedValue);
    getFakePriceQuantity();
  };

  const handleRemoveItem = (productId) => {
    if (user) {
      removeCartProduct(productId);
    } else {
      removeFakeCartProduct(productId);
      getFakePriceQuantity();
    }
  };

  useEffect(() => {
    if (user) {
      setMainCartProducts(cartProducts);
    } else {
      setMainCartProducts(fakeCartProducts);
    }
  }, [user, cartProducts, fakeCartProducts]);

  //   Stripe integration

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Qg7BF097qSAwIsLzvcVj539VXf22GTralqe1yCqkICByUIr48WBDq98UDsQikcJfeVm9AbUJSrcdWKEraMQdA4L00UzgCqzAD"
    );

    const response = await axiosInstance.post(
      "/orders/cart/create-checkout-session"
    );

    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if ((await result).error) {
      console.log(result.error);
    }
  };
  return (
    <div className="cart-container">
      {(mainCartProducts.length > 0 && (
        <>
          <div className="cart-leftside">
            <div className="cart-header">
              <h2>
                Savat ({user ? totalQuantity : totalFakeQuantity} ta mahsulot)
              </h2>
              <Link to="/" className="continue-shopping">
                ← Xaridni davom ettirish
              </Link>
            </div>

            <div className="cart-items">
              {mainCartProducts.map((product) => (
                <div key={product?.id} className="cart-item">
                  <div className="product-image-container">
                    <img
                      src={product?.product_images[0]?.imageUrl}
                      alt={product?.product_name}
                      className="product-image"
                    />
                  </div>

                  <div className="product-details">
                    <div className="product-info">
                      <h3 className="product-title">
                        <Link to={`/product/${product?.id}`}>
                          {product?.product_name}
                        </Link>
                      </h3>
                      <p className="product-brand">
                        {product?.brand?.name || ""}
                      </p>
                      <p className="product-status">
                        {product?.product_status}
                      </p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={product?.purchasedQuantity}
                        min="1"
                        max={product?.quantity}
                        onChange={(e) => handleInputChange(product?.id, e)}
                        className="quantity-input"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="product-pricing">
                    <div className="price-container">
                      {product?.oldPrice && (
                        <span className="old-price">
                          {product?.oldPrice * product?.quantity} so'm
                        </span>
                      )}
                      <span className="current-price">
                        {user
                          ? product?.total
                          : product?.price * product?.quantity}
                        so'm
                      </span>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() =>
                        handleRemoveItem(user ? product?.cartId : product?.id)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-rightside">
            <div className="checkout-summary">
              <div className="courier-deliver">
                <Truck />
                {(user
                  ? totalPrice < 1000000
                  : totalFakePrice < 1000000 && (
                      <>
                        <p>
                          Yana{"  "}
                          {(
                            1000000 - (user ? totalPrice : totalFakePrice)
                          ).toLocaleString()}
                          {"  "}
                          so'm va kuryer orqali yetkazish <strong>bepul</strong>
                          bo'ladi
                        </p>
                        <div className="courier-progress">
                          <div
                            className="courier-progress-bar"
                            style={{
                              width: `${Math.min(
                                (user ? totalPrice : totalFakePrice / 1000000) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </>
                    )) || (
                  <>
                    <p>
                      Kuryer orqali yetkazish <strong>bepul</strong>
                    </p>
                    <div className="courier-progress full"></div>
                  </>
                )}
              </div>
              <h3>Buyurtma xulosasi</h3>
              <div className="summary-row">
                <span>Mahsulotlar ({mainCartProducts.length} ta)</span>
                <span>{user ? totalPrice : totalFakePrice} so'm</span>
              </div>
              <div className="summary-row">
                <span>Punktgacha yetkazib berish</span>
                <span>Bepul</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total">
                <span>Jami</span>
                <span>{user ? totalPrice : totalFakePrice} so'm</span>
              </div>

              <Button
                variant="contained"
                fullWidth
                className="checkout-button"
                disabled={mainCartProducts.length === 0}
                onClick={makePayment}
              >
                To'lov qilish
              </Button>

              <div className="payment-options">
                <img src="./uzcard.png" alt="Uzcard" />
                <img src="./humo.png" alt="Humo" />
              </div>
            </div>
          </div>
        </>
      )) || (
        <div className="notFoundcart">
          <img src="../noCartItem.png" alt="no category" />
          <h4>Savatingizda hozircha mahsulot mavjud emas</h4>
          <Link to={"/"} className="notFoundLink">
            Haridni boshlash
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
