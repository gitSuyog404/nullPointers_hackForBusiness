package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.OrderItemDTO;
import com.food_rescue.backend.dto.OrdersDTO;
import com.food_rescue.backend.entity.*;
import com.food_rescue.backend.enums.OrderStatus;
import com.food_rescue.backend.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepo ordersRepo;
    private final CustomerRepo customerRepo;
    private final RestaurantRepo restaurantRepo;
    private final DeliveryRiderRepo riderRepo;
    private final FoodItemRepo foodItemRepo;

    @Override
    public OrdersDTO createOrder(OrdersDTO ordersDTO) {
        Orders order = new Orders();
        return mapAndSaveOrder(order, ordersDTO);
    }

    @Override
    public OrdersDTO getOrderById(Long id) {
        Orders order = ordersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToDTO(order);
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return ordersRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrdersDTO updateOrder(Long id, OrdersDTO ordersDTO) {
        Orders order = ordersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapAndSaveOrder(order, ordersDTO);
    }

    @Override
    public void deleteOrder(Long id) {
        ordersRepo.deleteById(id);
    }

    private OrdersDTO mapAndSaveOrder(Orders order, OrdersDTO dto) {
        Customer customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Restaurant restaurant = restaurantRepo.findById(dto.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        order.setCustomer(customer);
        order.setRestaurant(restaurant);
        order.setOrderTime(dto.getOrderTime());
        order.setStatus(OrderStatus.valueOf(dto.getStatus()));

        if (dto.getRiderId() != null) {
            DeliveryRider rider = riderRepo.findById(dto.getRiderId())
                    .orElseThrow(() -> new RuntimeException("Rider not found"));
            order.setRider(rider);
        }

        Orders savedOrder = ordersRepo.save(order);
        return mapToDTO(savedOrder);
    }

    private OrdersDTO mapToDTO(Orders order) {
        OrdersDTO dto = new OrdersDTO();
        dto.setId(order.getId());
        dto.setOrderTime(order.getOrderTime());
        dto.setStatus(order.getStatus().name());
        dto.setCustomerId(order.getCustomer().getId());
        dto.setRestaurantId(order.getRestaurant().getId());
        if (order.getRider() != null) {
            dto.setRiderId(order.getRider().getId());
        }
        dto.setItems(order.getItems().stream()
                .map(this::mapOrderItemToDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    private OrderItemDTO mapOrderItemToDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setFoodItemId(item.getFoodItem().getId());
        dto.setQuantity(item.getQuantity());
        dto.setOrderId(item.getOrders().getId());
        return dto;
    }
}