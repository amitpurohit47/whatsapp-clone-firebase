import React, { useState, useEffect } from "react";
import "./Sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "../../../firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("groups")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const groupName = prompt("Please enter name for group");

    if (groupName) {
      // console.log(roomName);
      db.collection("groups").add({
        name: groupName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/groups/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat_info">
          <h2>{name}</h2>
          <p>{messages.length === 0 ? 'No messages yet' : messages[0].message.substring(0,10) + '...'}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarchat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default Sidebarchat;
