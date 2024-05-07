import React, { useState, useContext } from 'react';
import { WebSocketContext } from '../../Hooks/WebSocketProvider';

function Notifications() {
  const { messages, sendMessage } = useContext(WebSocketContext);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage(''); 
  };

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Notifications;