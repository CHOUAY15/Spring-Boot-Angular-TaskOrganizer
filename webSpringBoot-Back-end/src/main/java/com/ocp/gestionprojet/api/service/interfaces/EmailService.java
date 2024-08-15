package com.ocp.gestionprojet.api.service.interfaces;

public interface EmailService {
    public void sendSimpleMessage(String to, String subject, String text);
}
