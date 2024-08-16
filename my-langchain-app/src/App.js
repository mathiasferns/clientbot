// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Add custom styles for the chat UI

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.1.100:7860/api/v1/predict', { // Use host PC's IP
        inputs: {
          text: input
        }
      });
      setResponse(res.data.output);  // Adjust 'output' to match the structure of LangFlow's response
    } catch (err) {
      console.error(err);
      setResponse('Error: Could not get response from the server.');
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <div className={`chat-icon ${isChatOpen ? 'open' : ''}`} onClick={toggleChat}>
        💬 {/* This is the chat icon */}
      </div>
      
      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>LangFlow Chatbot</h3>
            <button onClick={toggleChat}>X</button>
          </div>
          <div className="chatbox-body">
            <div className="chatbox-messages">
              <p>{response}</p>
            </div>
            <form onSubmit={handleSubmit} className="chatbox-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
