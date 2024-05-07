import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(url);
    const stompClient = Stomp.over(() => socket);

    stompClient.connect({}, () => {
      console.log('WebSocket connected');
      stompClient.subscribe('/topic/notifications', (message) => {
        console.log('Message received:', message.body);
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
    });

    setStompClient(stompClient);

    return () => {
      console.log('Closing WebSocket');
      stompClient.disconnect();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
      console.log('Sending message:', message);
      stompClient.send('/app/shift', {}, message);
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { messages, sendMessage };
}

export default useWebSocket;