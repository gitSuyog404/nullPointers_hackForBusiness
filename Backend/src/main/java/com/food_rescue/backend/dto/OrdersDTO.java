package com.food_rescue.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrdersDTO {
    private Long id;
    private LocalDateTime orderTime;
    private String status;
    private Long customerId;
    private Long restaurantId;
    private Long riderId;
    private List<OrderItemDTO> items;
}
