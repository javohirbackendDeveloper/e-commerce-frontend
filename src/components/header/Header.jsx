import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { CgShoppingCart } from "react-icons/cg";
import CountryDropDown from "../countryDropDown/CountryDropDown";

function Header() {
  return (
    <header className="header-wrapper">
      <div className="alert-banner">
        <p>
          Due to the <strong>WEATHER</strong> orders may be delayed beyond
          estimated delivery dates
        </p>
      </div>

      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src="./logo.png" alt="Company Logo" className="logo-img" />
        </Link>

        <CountryDropDown />

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
          />
          <button className="search-button">
            <IoSearch size={20} />
          </button>
        </div>

        <div className="actions-container">
          <button className="icon-button">
            <RiUser3Line size={18} />
          </button>

          <div className="cart-container">
            <span className="cart-price">$120.00</span>
            <div className="cart-icon-wrapper">
              <button className="icon-button">
                <CgShoppingCart size={18} />
              </button>
              <span className="cart-badge">1</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
