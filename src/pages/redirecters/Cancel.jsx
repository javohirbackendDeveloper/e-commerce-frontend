import React from "react";
import "./Cancel.css";

function Cancel() {
  return (
    <div className="cancel-container">
      <div className="cancel-box">
        <div className="cancel-icon">❌</div>
        <h1 className="cancel-title">To‘lov bekor qilindi</h1>
        <p className="cancel-text">
          Siz to‘lov jarayonini yakunlamadingiz. Agar bu xatolik bo‘lsa, iltimos
          qayta urinib ko‘ring.
        </p>
        <a href="/cart" className="cancel-button">
          Qayta urinib ko‘rish
        </a>
      </div>
    </div>
  );
}

export default Cancel;
