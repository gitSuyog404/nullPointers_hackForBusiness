package com.food_rescue.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersDTO {
    private Long id;
    private  String name;
    private String email;
    private String phone;
    private String password;
    private String role;
    private boolean status = true;
}
