import React from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import "./CountryDropDown.css";
function CountryDropDown() {
  return (
    <div>
      <Button className="countryDrop">
        <div className="info d-flex flex-column">
          <span className="label">Sizning manzil</span>
          <span className="name">O'zbekiston</span>
        </div>
        <span className="dropIcon ml-auto">
          <FaAngleDown />
        </span>
      </Button>
    </div>
  );
}

export default CountryDropDown;
