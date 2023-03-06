import React from "react";

const AuthModal = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal(false);
  };
  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>
    </div>
  );
};

export default AuthModal;
