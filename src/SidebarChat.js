import React, { useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import db from "./firebase"; // Importing the database from firebase.js
import { Link } from "react-router-dom";
import { useState } from "react";

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Functionality to add a new chat room
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);

  const createChat = () => {
    // Functionality to create a new chat
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://api.dicebear.com/7.x/big-ears/svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
