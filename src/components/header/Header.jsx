import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { CgShoppingCart } from "react-icons/cg";
import SearchBox from "./searchBox/SearchBox";
import Nav from "./nav/Nav";
import CountryDropDown from "./countryDropDown/CountryDropDown";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import Login from "../../pages/auth/login/Login";
import { AuthStore } from "../../stores/auth.store";
import { FakeCartStore } from "../../stores/fakeCart.store";
import { useEffect } from "react";
import { CartStore } from "../../stores/cart.store";
function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  // store functions
  const { user } = AuthStore();
  const {
    fakeCartProducts,
    getFakePriceQuantity,
    totalFakeQuantity,
    totalFakePrice,
  } = FakeCartStore();
  const { getCartProduct, totalQuantity, totalPrice } = CartStore();
  const [totalMainQuantity, setTotalMainQuantity] = useState("");

  // useEffect(() => )
  useEffect(() => {
    getCartProduct();
    getFakePriceQuantity();
  }, [user, getCartProduct, getFakePriceQuantity]);

  useEffect(() => {
    setTotalMainQuantity(user ? totalQuantity : totalFakeQuantity);
  }, [user, totalQuantity, totalFakeQuantity]);

  return (
    <>
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
          <SearchBox />
          <div className="actions-container">
            {user ? (
              <Link to={"/profile"} className="user-profile">
                <span className="username">{user?.username}</span>
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="icon-button"
              >
                <RiUser3Line size={18} />
              </button>
            )}
            <button className="icon-button ">
              <CiHeart size={18} />
            </button>

            <div className="cart-container">
              <span className="cart-price">
                {user
                  ? totalPrice.toLocaleString()
                  : totalFakePrice.toLocaleString()}
                so'm
              </span>
              <div className="cart-icon-wrapper">
                <Link to={"/cart"} className="icon-button">
                  <CgShoppingCart size={18} />
                </Link>
                <span className={totalMainQuantity === 0 ? "" : "cart-badge"}>
                  {totalMainQuantity === 0 ? "" : totalMainQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Nav />

        {showAuthModal && (
          <Login open={showAuthModal} onClose={setShowAuthModal} />
        )}
      </header>
    </>
  );
}

export default Header;
