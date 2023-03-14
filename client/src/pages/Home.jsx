import React, { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import {useCookies} from "react-cookie"

const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.Token
    
  const handleClick = () => {
    if (authToken) {
        removeCookie('UserId', cookies.User_Id)
        removeCookie('Token', cookies.Token)
        window.location.reload()
        return
    }
    setShowModal(true)
    setIsSignUp(true)
}
  return (
    <>
      <div className="overlay">
        <Nav
        authToken={authToken}
          minimal={false}
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
        />
        <div className="home">
          <h1 className="primary-title">Swipe Right</h1>
          <button className="primary-button" onClick={handleClick}>
            {authToken ? "Signout" : "Create Account"}
          </button>

          {showModal && <AuthModal setShowModal={setShowModal} setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>}
        </div>
      </div>
    </>
  );
};

export default Home;
