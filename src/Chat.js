import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, SearchOutlined, MoreVert } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider"; // Import the useStateValue hook

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{ user }] = useStateValue(); // Access user information from StateProvider

  useEffect(() => {
    if (roomId) {
      const roomRef = db.collection("rooms").doc(roomId);

      roomRef.onSnapshot((snapshot) => {
        setRoomName(snapshot.data()?.name || "");
      });

      roomRef
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (input.trim() !== "") {
      if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            message: input,
            name: user.displayName, // Use user's display name
            timestamp: new Date(),
          })
          .then(() => {
            setInput("");
          })
          .catch((error) => {
            console.error("Error sending message: ", error);
          });
      }
    }
  };

  return (
    <div className="chat">
      {/* Chat header */}
      <div className="chat__header">
        <Avatar src={"https://api.dicebear.com/7.x/pixel-art/svg"} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Display messages */}
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              message.name === user.displayName ? "chat__receiver" : ""
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {message.timestamp?.toDate().toLocaleString()}
            </span>
          </p>
        ))}
      </div>

      {/* Chat footer for sending messages */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
