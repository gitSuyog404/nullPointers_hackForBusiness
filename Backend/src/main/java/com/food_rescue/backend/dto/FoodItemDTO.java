package com.food_rescue.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FoodItemDTO {
    private Long id;
    private String name;
    private String description;
    private int quantity;
    private double price;
    private boolean available;
    private LocalDateTime expiryTime;
    private Long restaurantId;
}
