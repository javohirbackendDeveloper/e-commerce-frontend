import React from "react";
import AutoSlider from "./autoSlider/AutoSlider";
import "./Main.css";
import Product from "../../pages/product/Product";
function Main() {
  return (
    <div className="main">
      <div className="container">
        <AutoSlider />
        <Product />
      </div>
    </div>
  );
}

export default Main;
