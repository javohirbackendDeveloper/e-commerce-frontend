import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import "./CountryDropDown.css";
import Dialog from "@mui/material/Dialog";
import { IoSearch } from "react-icons/io5";
import { Cities } from "../../../constants/cities";
import { TbX } from "react-icons/tb";

function CountryDropDown() {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("O'zbekiston");
  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  const filteredCities = Cities.filter((item) =>
    searchInput === ""
      ? true
      : item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const setLocationAndDropModal = (city) => {
    setLocation(city.name);
    handleOpenModal();
  };
  return (
    <div className="locationDropDown">
      <Button className="countryDrop" onClick={handleOpenModal}>
        <div className="info d-flex flex-column">
          <span className="label">Sizning manzil</span>
          <span className="name">{location}</span>
        </div>
        <span className="dropIcon ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={showModal}
        onClose={handleOpenModal}
        className="locationModal"
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "24px",
            minWidth: "400px",
            position: "relative",
          },
        }}
      >
        <button className="closeButton" onClick={handleOpenModal}>
          <TbX size={24} />
        </button>

        <h4>Yetkazib berish manzilini tanlang</h4>
        <p className="modalSubtitle">
          Manzilingizni kiriting va biz shunga mos mahsulotlarni sizga taklif
          qilamiz
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Shaharni qidiring..."
            className="search-input"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button className="search-button">
            <IoSearch size={20} />
          </button>
        </div>

        <div className="citiesList">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                onClick={() => setLocationAndDropModal(city)}
                key={city.id}
                className="city-row"
              >
                <p>{city.name}</p>
                <span className="icon">
                  <FaAngleRight />
                </span>
              </div>
            ))
          ) : (
            <p className="noCitiesText">
              Bu manzilga hozircha xizmat ko‘rsatilmaydi
            </p>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default CountryDropDown;
