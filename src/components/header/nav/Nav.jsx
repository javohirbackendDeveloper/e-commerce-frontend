import React, { useState } from "react";
import "./Nav.css";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxDragHandleVertical } from "react-icons/rx";
import CategoryModal from "./categoryModal/CategoryModal";
import { useEffect } from "react";
import { CategoryStore } from "../../../stores/category.store";

function Nav() {
  const [showCatList, setShowCatList] = useState(false);

  // store functions

  const { getParentCategories, parentCategories } = CategoryStore();

  const handleToggleCategories = () => {
    setShowCatList((prev) => !prev);
  };

  // getting parent categories

  useEffect(() => {
    getParentCategories();
  }, []);
  return (
    <div className={`nav-container ${showCatList ? "expanded" : ""}`}>
      <div className="nav-row">
        <div className="navPart1">
          <Button className="allCatTab" onClick={handleToggleCategories}>
            <span className="categoryButtonIcons icon1">
              {showCatList ? <RxDragHandleVertical /> : <IoMdMenu />}
            </span>
            <span className="textOfCat">BARCHA TURKUMLAR</span>
            <span className="categoryButtonIcons icon2">
              {showCatList ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </Button>
        </div>

        <div className="navPart2">
          <ul className="nav-list">
            {parentCategories.map((category) => (
              <li key={category.id} className="nav-list-item">
                <Link to={`/products/${category.id}`}>
                  <span>{category?.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showCatList && <CategoryModal />}
    </div>
  );
}

export default Nav;
