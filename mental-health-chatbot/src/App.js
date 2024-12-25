import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newChat = { sender: "User", message: userMessage };
    setChatHistory([...chatHistory, newChat]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMessage,
      });
      const botReply = response.data.response;
      setChatHistory((prevChats) => [
        ...prevChats,
        { sender: "Bot", message: botReply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevChats) => [
        ...prevChats,
        { sender: "Bot", message: "Sorry, I encountered an issue." },
      ]);
    }

    setUserMessage(""); // Clear input field
  };

  return (
    <div className="App">
      <h1>Mental Health Chatbot</h1>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            <strong>{chat.sender}: </strong>
            <span>{chat.message}</span>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;