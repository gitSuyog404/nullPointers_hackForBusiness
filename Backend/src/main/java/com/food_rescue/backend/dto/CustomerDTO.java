package com.food_rescue.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String role;
    private boolean status = true;
}
