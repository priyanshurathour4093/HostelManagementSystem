import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_SOCKET_HOST);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`/api/contacts/${currentUser._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        navigate("/setAvatar");
      }
    };

    if (currentUser && currentUser.isAvatarImageSet) {
      fetchContacts();
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className=" h-91 flex justify-center items-center bg-slate-300">
      <div className="container h-full w-full bg-opacity-6 grid grid-cols-1 md:grid-cols-4" style={{backgroundImage: 'url("https://cdn.wallpapersafari.com/27/32/jt4AoG.jpg")'}}>
        
        <div className="md:col-span-1 ">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </div>
        <div className="md:col-span-3">
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
}