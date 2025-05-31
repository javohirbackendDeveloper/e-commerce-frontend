import React, { useEffect } from "react";
import { ProductStore } from "../../stores/product.store";
import "./Product.css";
import { Heart } from "lucide-react";
import { useState } from "react";
import { FakeCartStore } from "../../stores/fakeCart.store";
import { AuthStore } from "../../stores/auth.store";
import AddCartModal from "./addCartModal/AddCartModal";

function Product() {
  // useStates
  const [showAddCartModal, setShowAddCartModal] = useState(false);
  const [selectedProduct, setSelectedCartProduct] = useState(null);
  // store functions
  const { findOneFakeCartProduct } = FakeCartStore();
  const { products, getProducts } = ProductStore();
  const { user } = AuthStore();

  useEffect(() => {
    getProducts();
  }, []);

  //   adding product to cart

  const handleAddCart = async (product) => {
    const response = await findOneFakeCartProduct(product.id);

    if (!response) {
      setSelectedCartProduct(product);
      setShowAddCartModal(true);
    }
  };
  return (
    <div className="product-page">
      <h2 className="product-title">Mahsulotlar </h2>

      <div className="product-list">
        {products
          .filter((pr) => {
            return pr.quantity && pr.product_status === "FAOL";
          })
          .map((product) => (
            <div className="product-card" key={product.id}>
              <Heart className="heart-icon" />
              <img src={product?.product_images[0]?.imageUrl} alt="" />
              <p>{product?.description.slice(0, 30)}...</p>
              <span className="comments-count">
                {product?.comments.length} ta sharh
              </span>
              <span
                className={`badge ${
                  product?.product_status === "FAOL" ? "active" : "inactive"
                }`}
              >
                {product?.product_status}
              </span>
              <h4>{product.product_name}</h4>
              <span className="quantity">{product?.quantity} ta qoldi</span>
              <span className="old-price">{product?.oldPrice} so'm</span>
              <span className="new-price">{product?.price} so‘m</span>
              <button onClick={() => handleAddCart(product)}>
                Savatga qo'shish
              </button>
            </div>
          ))}
      </div>

      <button className="load-more-btn" onClick={getProducts}>
        Yana 10 ta mahsulotni ko‘rsatish
      </button>
      {showAddCartModal && (
        <AddCartModal
          open={showAddCartModal}
          onClose={setShowAddCartModal}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default Product;
