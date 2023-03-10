import React from "react";
import whitelogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";
<link rel="stylesheet" href="index.css" />;
const Nav = ({ minimal,  setShowModal, showModal, setIsSignUp, authToken}) => {
  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(false);

  };
  
  return (
    <nav>
      <div className="logo-container">
        <img src={minimal ? colorLogo : whitelogo} alt="" className="logo" />
      </div>
      {!authToken && !minimal && (
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
