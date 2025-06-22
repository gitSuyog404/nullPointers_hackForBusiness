package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.OrdersDTO;

import java.util.List;

public interface OrdersService {
    OrdersDTO createOrder(OrdersDTO ordersDTO);
    OrdersDTO getOrderById(Long id);
    List<OrdersDTO> getAllOrders();
    OrdersDTO updateOrder(Long id, OrdersDTO ordersDTO);
    void deleteOrder(Long id);
}
