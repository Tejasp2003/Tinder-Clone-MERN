import React, { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";




const Home = () => {
    const authToken = false;
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        console.log("clicked");
        setShowModal(true);
      };
  return (
    <>
      <div className="overlay">
        <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
        <div className="home">
          <h1>Swipe Right</h1>
          <button className="primary-button" onClick={handleClick}>
            {authToken ? "Signout" : "Create Account"}
          </button>

            {showModal && <AuthModal 
            
            setShowModal={setShowModal}
            />}
        </div>
      </div>
    </>
  );
};

export default Home;
