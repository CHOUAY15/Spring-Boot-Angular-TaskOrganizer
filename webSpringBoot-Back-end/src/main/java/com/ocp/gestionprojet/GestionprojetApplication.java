package com.ocp.gestionprojet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ocp.gestionprojet.repository")
public class GestionprojetApplication {
    public static void main(String[] args) {
        SpringApplication.run(GestionprojetApplication.class, args);
    }
}