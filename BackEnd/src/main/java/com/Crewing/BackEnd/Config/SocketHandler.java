package com.Crewing.BackEnd.Config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.CloseStatus;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SocketHandler extends TextWebSocketHandler {
            private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

            @Override
            public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            sessions.put(session.getId(), session);
            System.out.println("WebSocket connection established with session ID: " + session.getId());
            }

            @Override
            public void handleTextMessage(WebSocketSession session, TextMessage message) {
                System.out.println("Received message: " + message.getPayload() + " from session ID: " + session.getId());
            }

            @Override
            public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
                sessions.remove(session.getId());
                System.out.println("WebSocket connection closed for session ID: " + session.getId());
            }


            public void sendMessage(String message) throws Exception {
                  for (WebSocketSession session : sessions.values()) {
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(message));
            }
        }
    }
}
