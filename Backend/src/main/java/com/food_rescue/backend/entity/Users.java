package com.food_rescue.backend.entity;

import com.food_rescue.backend.enums.Roles;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Roles role;

    private boolean active;
}
