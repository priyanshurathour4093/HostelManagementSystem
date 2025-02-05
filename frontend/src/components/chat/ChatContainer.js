import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";

export default function ChatContainer({ currentChat }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollRef = useRef();
  const group_id = currentChat.group_id;
  const colors = [
    'text-red-500',
    'text-red-600',
    'text-pink-500',
    'text-purple-500',
    'text-indigo-500',
    'text-blue-500',
    'text-gray-800', // Replacing light blue with dark gray
    'text-cyan-500',
    'text-teal-500',
    'text-green-500',
];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleMessageSend = (messageInput) => {
    if (!currentUser) {
      console.error("User ID is required");
      return;
    }
    const full_name = localStorage.getItem("full_name");
    socket.emit("message", {
      message: messageInput,
      group_id,
      user_id: { _id: currentUser, full_name: full_name },
    });
    const senderMessage = {
      message: messageInput,
      user_id: { _id: currentUser, full_name: full_name },
      timestamp: new Date(),
    };
    setChatMessages((prevMessages) => [...prevMessages, senderMessage]);
    scrollRef.current.scrollIntoView({ block: "end" });
    setMessageInput("");
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setCurrentUser(user);
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("joinGroup", group_id);

    newSocket.on("message", (data) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { ...data, timestamp: new Date() },
      ]);
      scrollRef.current.scrollIntoView({ block: "end" }); // Removed 'behavior: smooth'
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/getGroupMessages/${group_id}`
        );
        if (response.ok) {
          const data = await response.json();
          const messagesWithTimestamp = data[0].messages.map((message) => ({
            ...message,
            timestamp: new Date(),
          }));

          // After loading the messages, scroll to the bottom
          setChatMessages(messagesWithTimestamp);
          // console.log(messagesWithTimestamp);
          // var objDiv = document.getElementById("chats");
          // objDiv.scrollTop = objDiv.scrollHeight;
          
          scrollRef.current.scrollIntoView({ block: "end" }); // Removed 'behavior: smooth'
        } else {
          throw new Error("Failed to fetch chat messages");
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
      
    };

    fetchMessages();
    console.log("Current user:", user);

    return () => {
      newSocket.disconnect();
    };
  }, [group_id]);

    return (
      <div className="flex flex-col relative h-[100vh]" style={{overflowX: "hidden" }}>
        <div className="flex justify-between items-center px-8 py-4 bg-indigo-600">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12">
              <img
                src={`https://avatar.iran.liara.run/public/${currentChat.group_id}`}
                alt="User Avatar"
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-white">{currentChat.group_name}</h3>
            </div>
          </div>
        </div>
        <div id="chats" style={{ scrollbarWidth: "none" }} className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800  h-screen">
          <div className="px-8 py-4 flex flex-col gap-4">
            {chatMessages.map((message, index) => (
              <div
                key={uuidv4()}
                className={`flex relative ${message.user_id && message.user_id._id === currentUser
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                {message.user_id && message.user_id._id !== currentUser && <div className={`w-10 h-10 items-end mr-2 `}>
                  <img
                    src={message.user_id.profile_pic}
                    alt="User Avatar"
                    className="w-full h-full "
                  />
                </div>}
                <div
                  className={`max-w-2/5 overflow-hidden rounded-lg py-4 px-6 ${message.user_id && message.user_id._id === currentUser
                    ? "bg-indigo-500 text-white self"
                    : "bg-slate-200 text-black other"
                    }`}
                >
                  {message.user_id && message.user_id._id !== currentUser ? (
                    <div className=" text-white self">
                      <span className={`text-sm text-start ${getRandomColor()} font-bold`}>{message.user_id.full_name}</span>
                    </div>
                  ) : null}
                  <p className="text-md">{message.message}</p>
                </div>
                {message.user_id && message.user_id._id === currentUser && <div className={`w-10 h-10 items-center ml-2 `}>
                  <img
                    src={message.user_id.profile_pic}
                    alt="User Avatar"
                    className="w-full h-full "
                  />
                </div>}
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>
          
        </div>
        <div className="w-full">
            <ChatInput handleSendMsg={handleMessageSend} />
          </div>
      </div>
    );
                  }    
