import React from "react";
import { IoSearch } from "react-icons/io5";

function SearchBox() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Mahsulotlarni  qidiring..."
        className="search-input"
      />
      <button className="search-button">
        <IoSearch size={20} />
      </button>
    </div>
  );
}

export default SearchBox;
