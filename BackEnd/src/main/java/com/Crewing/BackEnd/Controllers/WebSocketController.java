package com.Crewing.BackEnd.Controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class WebSocketController {

    @MessageMapping("/shift")
    @SendTo("/topic/notifications")
    public String sendNotification(String message) {
        return message;
    }
}