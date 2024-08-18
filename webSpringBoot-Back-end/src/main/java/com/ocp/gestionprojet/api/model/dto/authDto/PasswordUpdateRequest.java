package com.ocp.gestionprojet.api.model.dto.authDto;

public class PasswordUpdateRequest {
    private String newPassword;

    // Getter and setter
    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
