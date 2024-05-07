import React, { useState } from 'react';
import useWebSocket from '../../Hooks/useWebSocket';

function Notifications() {
  const { messages, sendMessage } = useWebSocket('http://localhost:8080/ws');    
  const [newMessage, setNewMessage] = useState('');

    // Function to handle sending messages
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');  // Clear input after send
    };

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            {/* Optional: Interface to send messages */}
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
