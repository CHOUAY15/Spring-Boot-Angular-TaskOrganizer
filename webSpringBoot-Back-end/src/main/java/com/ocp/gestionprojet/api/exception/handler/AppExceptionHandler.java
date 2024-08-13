package com.ocp.gestionprojet.api.exception.handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.exception.UserAlreadyExistsException;

@RestControllerAdvice
public class AppExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(AppExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        logger.error("Unexpected error", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }

    @ExceptionHandler(value = { EntityNotFoundException.class })
    public ResponseEntity<Object> entityNotFoundException(EntityNotFoundException entityNotFoundException) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(entityNotFoundException.getMessage())
                .code(404)
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = { UserAlreadyExistsException.class })
    public ResponseEntity<Object> userAlreadyExistsException(UserAlreadyExistsException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(ex.getMessage())
                .code(409)
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
    }
}