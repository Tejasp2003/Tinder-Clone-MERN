import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleClick = () => {
    setShowModal(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      } 
      const response = await axios.post("http://localhost:8000/signup", {email, password});

    //  const success = response.status==201;
    //  console.log(success)
      if(response.status===201){
        navigate('/onboarding')
       }

    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="auth-modal">
      <div onClick={handleClick}>
        <span className="close-icon">X</span>
      </div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking above button, you agree to our terms and condition. For more
        details, you can deep dive into our privacy policy page
      </p>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />

        {isSignUp && <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>

      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
