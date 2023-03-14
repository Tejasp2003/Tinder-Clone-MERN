import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ user }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("User_id");
    removeCookie("Token");
    navigate("/");

    window.location.reload();

  };
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user?.url} alt={"Photo of user " + user?.first_name} />
        </div>
        <h3>{user?.first_name}</h3>
      </div>

      <div className="log-out-icon" onClick={logout}>
        {" "}
        ◀
      </div>
    </div>
  );
};

export default ChatHeader;
