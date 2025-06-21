package com.food_rescue.backend.dto;

import lombok.Data;

@Data
public class RestaurantDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String registrationNumber;
    private String role;
    private boolean status = true;
}
