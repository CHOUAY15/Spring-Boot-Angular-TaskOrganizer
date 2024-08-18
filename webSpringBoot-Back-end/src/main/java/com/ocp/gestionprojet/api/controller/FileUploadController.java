package com.ocp.gestionprojet.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")

public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        logger.info("Received file upload request for file: {}", file.getOriginalFilename());
        
        if (file.isEmpty()) {
            logger.error("Failed to upload empty file");
            return ResponseEntity.badRequest().body("Failed to upload empty file");
        }

        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(uploadPath + fileName);
            Files.write(path, file.getBytes());
            logger.info("File uploaded successfully: {}", fileName);
            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return ResponseEntity.badRequest().body("Failed to upload file: " + e.getMessage());
        }
    }
}