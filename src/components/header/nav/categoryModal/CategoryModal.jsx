import React, { useEffect, useState } from "react";
import "./CategoryModal.css";
import { Categories } from "../../../../constants/category";
import { FaAngleRight, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { CategoryStore } from "../../../../stores/category.store";

function CategoryModal() {
  const [selectedCat, setSelectedCat] = useState(Categories[0]);
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  const { getParentCategoriesWithSub, parentCategoriesWithSub } =
    CategoryStore();

  const toggleChildren = (subId) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  useEffect(() => {
    getParentCategoriesWithSub();
  }, []);

  return (
    <div className="category-expand-panel">
      <div className="category-list">
        {parentCategoriesWithSub.map((cat) => (
          <div
            onMouseEnter={() => setSelectedCat(cat)}
            key={cat.id}
            className={`category-item ${
              selectedCat?.id === cat.id ? "active" : ""
            }`}
          >
            <span className="category-icon-left">
              <img
                src={cat.icon}
                alt={cat.title}
                className="category-icon-img"
              />
            </span>
            <span className="category-name">{cat.title}</span>
            <span className="category-icon-right">
              <FaAngleRight />
            </span>
          </div>
        ))}
      </div>

      <div className="subcategory-placeholder">
        {selectedCat?.subCategories?.length > 0 && (
          <div className="subcategory-grid">
            {selectedCat.subCategories.map((sub) => (
              <div key={sub.id} className="subcategory-block">
                <div className="subcategory-header">
                  <div className="subcategory-title">{sub.title}</div>
                  {sub.children > 5 && (
                    <div
                      className="subcategory-toggle"
                      onClick={() => toggleChildren(sub.id)}
                    >
                      {expandedSubCategories[sub.id] ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </div>
                  )}
                </div>
                {expandedSubCategories[sub.id] && (
                  <div className="subcategory-children">
                    {sub.children.map((child, index) => (
                      <div key={index} className="subcategory-child">
                        {child}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryModal;
