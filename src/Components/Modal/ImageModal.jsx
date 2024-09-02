import React from "react";
import "./ImageModal.css";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  console.log("" + imageUrl);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Post Full View" width={"100%"} height={700} />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
