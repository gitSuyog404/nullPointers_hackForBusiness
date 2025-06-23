package com.food_rescue.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Restaurant extends Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    private String address;
    private String registrationNumber;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<FoodItem> foodItems = new ArrayList<>();
}
