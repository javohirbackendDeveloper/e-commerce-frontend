import React from "react";
import "./Success.css";

function Success() {
  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-icon">✅</div>
        <h1 className="success-title">
          To‘lov muvaffaqiyatli amalga oshirildi!
        </h1>
        <p className="success-text">
          Buyurtmangiz qabul qilindi va tez orada yetkaziladi.
        </p>
        <a href="/" className="success-button">
          Asosiy sahifaga qaytish
        </a>
      </div>
    </div>
  );
}

export default Success;
