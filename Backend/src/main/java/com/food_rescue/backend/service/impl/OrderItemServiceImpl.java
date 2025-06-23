package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.OrderItemDTO;
import com.food_rescue.backend.entity.FoodItem;
import com.food_rescue.backend.entity.OrderItem;
import com.food_rescue.backend.entity.Orders;
import com.food_rescue.backend.repo.FoodItemRepo;
import com.food_rescue.backend.repo.OrderItemRepo;
import com.food_rescue.backend.repo.OrdersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepo orderItemRepo;
    private final FoodItemRepo foodItemRepo;
    private final OrdersRepo ordersRepo;

    @Override
    public OrderItemDTO createOrderItem(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = new OrderItem();
        return mapAndSaveOrderItem(orderItem, orderItemDTO);
    }

    @Override
    public OrderItemDTO getOrderItemById(Long id) {
        OrderItem orderItem = orderItemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));
        return mapToDTO(orderItem);
    }

    @Override
    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderItemDTO updateOrderItem(Long id, OrderItemDTO orderItemDTO) {
        OrderItem orderItem = orderItemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));
        return mapAndSaveOrderItem(orderItem, orderItemDTO);
    }

    @Override
    public void deleteOrderItem(Long id) {
        orderItemRepo.deleteById(id);
    }

    private OrderItemDTO mapAndSaveOrderItem(OrderItem orderItem, OrderItemDTO dto) {
        FoodItem foodItem = foodItemRepo.findById(dto.getFoodItemId())
                .orElseThrow(() -> new RuntimeException("FoodItem not found"));
        Orders orders = ordersRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderItem.setFoodItem(foodItem);
        orderItem.setOrders(orders);
        orderItem.setQuantity(dto.getQuantity());

        OrderItem savedOrderItem = orderItemRepo.save(orderItem);
        return mapToDTO(savedOrderItem);
    }

    private OrderItemDTO mapToDTO(OrderItem orderItem) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(orderItem.getId());
        dto.setFoodItemId(orderItem.getFoodItem().getId());
        dto.setOrderId(orderItem.getOrders().getId());
        dto.setQuantity(orderItem.getQuantity());
        return dto;
    }
}