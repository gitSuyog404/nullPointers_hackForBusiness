package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.OrderItemDTO;
import java.util.List;

public interface OrderItemService {
    OrderItemDTO createOrderItem(OrderItemDTO orderItemDTO);
    OrderItemDTO getOrderItemById(Long id);
    List<OrderItemDTO> getAllOrderItems();
    OrderItemDTO updateOrderItem(Long id, OrderItemDTO orderItemDTO);
    void deleteOrderItem(Long id);
}