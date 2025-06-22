package com.food_rescue.backend.dto;

import com.food_rescue.backend.enums.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private ResponseStatus status;
    private String message;
    private Map<String,Object> details;
    private Map<String,Object> detail;

    public ResponseDTO(ResponseStatus responseStatus, String message, Object o, Object o1) {
    }

    public static ResponseDTO success(String message) {
        return new ResponseDTO(ResponseStatus.SUCCESS, message, null, null);
    }

    public static ResponseDTO success(String message, Map<String,Object> details) {
        return new ResponseDTO(ResponseStatus.SUCCESS, message, details, null);
    }

    public static ResponseDTO success(String message, Map<String,Object> details, Map<String,Object> detail) {
        return new ResponseDTO(ResponseStatus.SUCCESS, message, details, detail);
    }

    public static ResponseDTO created(String message, Map<String,Object> details) {
        return new ResponseDTO(ResponseStatus.CREATED, message, details, null);
    }

    public static ResponseDTO error(String message) {
        return new ResponseDTO(ResponseStatus.ERROR, message, null, null);
    }

    public static ResponseDTO error(String message, Map<String,Object> details) {
        return new ResponseDTO(ResponseStatus.ERROR, message, details, null);
    }

    public static ResponseDTO notFound(String message) {
        return new ResponseDTO(ResponseStatus.NOT_FOUND, message, null, null);
    }

    public static ResponseDTO badRequest(String message) {
        return new ResponseDTO(ResponseStatus.BAD_REQUEST, message, null, null);
    }

    public static ResponseDTO internalError(String message) {
        return new ResponseDTO(ResponseStatus.INTERNAL_SERVER_ERROR, message, null, null);
    }
}

