package com.ocp.gestionprojet.shared;

public enum SexePerson {
    Femme,
    Homme;
    public static SexePerson fromString(String gender) {
        switch (gender.trim()) {
            case "Femme": return Femme;
            case "Homme": return Homme;
            default: throw new IllegalArgumentException("Invalid gender: " + gender);
        }
    }
    
    
}
