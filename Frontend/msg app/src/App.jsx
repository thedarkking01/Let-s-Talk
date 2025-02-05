import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the backend server

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.off('chat message');
    };
  }, []);

  // Send message to the server
  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
