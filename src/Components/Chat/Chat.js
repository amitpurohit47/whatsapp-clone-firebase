import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider/StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    if (groupId) {
      db.collection("groups")
        .doc(groupId)
        .onSnapshot((snapshot) => setGroupName(snapshot.data().name));

      db.collection("groups")
        .doc(groupId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      }
      // console.log(messages[messages.length - 1].timestamp.to);
  }, [groupId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [groupId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message is ", input);

    db.collection('groups').doc(groupId).collection('messages').add({
      name : user.displayName,
      message : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{groupName}</h3>
          <p> {messages.length === 0 ? '' : 'Last seen' + new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString()}</p>
          {/* <p>Last seen</p> */}
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
