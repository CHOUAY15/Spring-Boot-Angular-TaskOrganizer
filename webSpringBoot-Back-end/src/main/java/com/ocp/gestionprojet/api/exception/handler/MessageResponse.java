package com.ocp.gestionprojet.api.exception.handler;

public class MessageResponse  {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    // Getter and setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
}
