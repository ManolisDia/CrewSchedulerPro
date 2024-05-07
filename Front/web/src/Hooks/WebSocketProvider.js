import React, { createContext } from 'react';
import useWebSocket from './useWebSocket';

export const WebSocketContext = createContext();

function WebSocketProvider({ children }) {
  const { messages, sendMessage } = useWebSocket('http://localhost:8080/ws');

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketProvider;