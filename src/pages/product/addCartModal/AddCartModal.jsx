import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { X, Minus, Plus } from "lucide-react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import "./AddCartModal.css";
import { FakeCartStore } from "../../../stores/fakeCart.store";
import { AuthStore } from "../../../stores/auth.store";
import { CartStore } from "../../../stores/cart.store";

function AddCartModal({ open, onClose, selectedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    selectedProduct?.product_images[0]?.imageUrl
  );
  const [loading, setLoading] = useState(false);

  //   store functions

  const { user } = AuthStore();
  const { createCartProduct } = CartStore();
  const { createFakeCartProduct, getFakePriceQuantity } = FakeCartStore();

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue > 0 && newValue <= selectedProduct?.quantity) {
      setQuantity(newValue);
    }
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "faol":
        return "statusActive";
      case "nofaol":
        return "statusInactive";
      default:
        return "";
    }
  };

  //   adding product into cart

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      {
        (user && createCartProduct(selectedProduct, quantity)) ||
          (await createFakeCartProduct(selectedProduct, quantity));
        getFakePriceQuantity();
      }
      onClose(false);
    } catch (error) {
      console.error("Savatga qo'shishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ className: "modalContainer" }}
    >
      <button onClick={() => onClose(false)} className="closeButton">
        <X size={24} />
      </button>

      <div style={{ padding: "20px" }}>
        <h2 className="productTitle">{selectedProduct?.product_name}</h2>
        <span className="brandInfo">
          Brand: {selectedProduct?.brand?.name} | Izohlar:{" "}
          {selectedProduct?.comments?.length || 0}
        </span>
        <hr className="divider" />

        <div className="contentWrapper">
          <div className="imageGallery">
            <div className="thumbnailContainer">
              {selectedProduct?.product_images?.map((img, index) => (
                <img
                  key={index}
                  src={img.imageUrl}
                  alt=""
                  className={`thumbnail ${
                    mainImage === img.imageUrl ? "thumbnailActive" : ""
                  }`}
                  onClick={() => handleImageClick(img.imageUrl)}
                />
              ))}
            </div>
            <div style={{ flex: "1" }}>
              <img src={mainImage} alt="Main product" className="mainImage" />
            </div>
          </div>

          <div className="productInfo">
            <div className="priceContainer">
              <span className="oldPrice">
                {selectedProduct?.oldPrice * quantity} so'm
              </span>
              <span className="currentPrice">
                {selectedProduct?.price * quantity} so'm
              </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <span className={getStatusClass(selectedProduct?.product_status)}>
                {selectedProduct?.product_status}
              </span>
              <p className="description">{selectedProduct?.description}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div className="quantityControls">
                <Button
                  variant="outlined"
                  onClick={() => handleQuantityChange(-1)}
                  style={{ minWidth: "40px" }}
                >
                  <Minus size={16} />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={selectedProduct?.quantity}
                  onChange={(e) => {
                    const value = Math.min(
                      Math.max(parseInt(e.target.value) || 1, 1),
                      selectedProduct?.quantity
                    );
                    setQuantity(value);
                  }}
                  className="quantityInput"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleQuantityChange(1)}
                  style={{ minWidth: "40px" }}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <p className="stockInfo">
                {selectedProduct?.quantity} dona xarid qilish mumkin
              </p>
            </div>

            <Button
              variant="contained"
              color="primary"
              className="addToCartButton"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "Savatga qo'shish"}
            </Button>

            <Link
              to={"/product/" + selectedProduct?.id}
              className="detailsLink"
            >
              Mahsulot haqida batafsil
              <FaAngleRight className="detailsLinkIcon" />
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddCartModal;
