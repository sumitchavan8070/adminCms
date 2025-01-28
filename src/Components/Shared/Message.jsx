import React from "react";
import "./Message.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Message = ({ variant = "info", children, onClose }) => {
  const icons = {
    success: <FaCheckCircle className="message-icon" />,
    danger: <FaTimesCircle className="message-icon" />,
    info: <FaInfoCircle className="message-icon" />,
  };

  return (
    <div className={`alert alert-${variant}`}>
      <div className="message-content">
        {icons[variant]}
        <span>{children}</span>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Message;
