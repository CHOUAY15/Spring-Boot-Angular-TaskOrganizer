package com.ocp.gestionprojet.api.model.dto.commentDto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {
    private String texte;
    private Integer senderId; 
    private Integer taskId;
    private Boolean important;
}

