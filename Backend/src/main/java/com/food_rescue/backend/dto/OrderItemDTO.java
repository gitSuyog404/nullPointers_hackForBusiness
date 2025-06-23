package com.food_rescue.backend.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private Long foodItemId;
    private int quantity;
    private Long orderId;
}
