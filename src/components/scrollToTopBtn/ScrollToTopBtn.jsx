import React, { useState, useEffect } from "react";
import "./ScrollToTopBtn.css";
import { ChevronUp } from "lucide-react";
function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="chevronIcon" />
        </button>
      )}
    </>
  );
}

export default ScrollToTopBtn;
