import React from "react";
import "./Loader.css";

const Loader = ({ size = "medium" }) => {
  const sizes = {
    small: { width: "20px", height: "20px" },
    medium: { width: "40px", height: "40px" },
    large: { width: "60px", height: "60px" },
  };

  return (
    <div className="loader-container">
      <div className="loader" style={sizes[size]}></div>
    </div>
  );
};

export default Loader;
