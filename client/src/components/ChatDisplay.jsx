import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useState, useEffect } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;

  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
  const clickedUserId = clickedUser?.user_id;
  const getUsersMessages = async () => {
    const response = await axios.get("http://localhost:8000/messages", {
      params: {
        user_id: userId,
        correspondingUserId: clickedUserId,
      },
    });
    setUsersMessages(response.data);
  };
  const getClickedUsersMessages = async () => {
    const response = await axios.get("http://localhost:8000/messages", {
      params: {
        user_id: clickedUserId,
        correspondingUserId: userId,
      },
    });
    setClickedUsersMessages(response.data);
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, [usersMessages, clickedUsersMessages]);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} clickedUser={clickedUser} user={user}/>
      <ChatInput
         user={user}
         clickedUser={clickedUser} getUserMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages}/>

    </>
  );
};

export default ChatDisplay;
