import { useEffect, useState, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
      console.log("Received WebSocket message:", message);
    };

    newSocket.onclose = () => console.log("WebSocket connection closed");

    // Clean up on component unmount
    return () => newSocket.close();
  }, [url]);

  return [messages];
};

export default useWebSocket;
