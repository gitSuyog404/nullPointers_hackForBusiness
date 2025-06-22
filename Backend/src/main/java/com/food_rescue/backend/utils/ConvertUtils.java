package com.food_rescue.backend.utils;

import com.food_rescue.backend.dto.*;
import com.food_rescue.backend.entity.*;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class ConvertUtils {

    //Users
    public static UsersDTO convertToUsersDTO(User user) {
        if (user == null)  {
            return null;
        }
        UsersDTO convertedDTO = new UsersDTO();
        convertedDTO.setId(user.getId());
        convertedDTO.setName(user.getName());
        convertedDTO.setEmail(user.getEmail());
        convertedDTO.setPassword(user.getPassword());
        convertedDTO.setPhone(user.getPhone());
        convertedDTO.setRole(String.valueOf(user.getRole()));
        convertedDTO.setStatus(user.isStatus());
        return convertedDTO;
    }

    public static List<UsersDTO> convertToUsersListDTO(List<User> users) {
        if (users == null || users.isEmpty()) {
            return List.of();
        }
        return users.stream()
                .map(ConvertUtils::convertToUsersDTO)
                .collect(Collectors.toList());
    }

    //Restaurant
    public static RestaurantDTO convertToRestaurantDTO(Restaurant restaurant) {
        if (restaurant == null) {
            return null;
        }
        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setId(restaurant.getId());
        restaurantDTO.setName(restaurant.getName());
        restaurantDTO.setEmail(restaurant.getEmail());
        restaurantDTO.setPassword(restaurant.getPassword());
        restaurantDTO.setPhone(restaurant.getPhone());
        restaurantDTO.setAddress(restaurant.getAddress());
        restaurantDTO.setRegistrationNumber(restaurant.getRegistrationNumber());
        restaurantDTO.setRole(restaurant.getRole() != null ? restaurant.getRole().name() : null);
        restaurantDTO.setStatus(restaurantDTO.isStatus());
        return restaurantDTO;
    }

    public  static List<RestaurantDTO> convertToRestaurantListDTO(List<Restaurant> restaurants) {
        if (restaurants == null || restaurants.isEmpty()) {
            return List.of();
        }
        return restaurants.stream()
                .map(ConvertUtils::convertToRestaurantDTO)
                .collect(Collectors.toList());
    }

    public static OrdersDTO convertToOrdersDTO(Orders orders) {
        if (orders == null) {
        return null;}
        OrdersDTO ordersDTO = new OrdersDTO();
        ordersDTO.setId(orders.getId());
        ordersDTO.setOrderTime(orders.getOrderTime());
        ordersDTO.setStatus(orders.getStatus() != null ? orders.getStatus().name() : null);
        ordersDTO.setCustomerId(orders.getCustomer() != null ? orders.getCustomer().getId() : null);
        ordersDTO.setRestaurantId(orders.getRestaurant() != null ? orders.getRestaurant().getId() : null);
        ordersDTO.setRiderId(orders.getRider() != null ? orders.getRider().getId() : null);
        ordersDTO.setItems(orders.getItems() != null ? orders.getItems().stream().map(ConvertUtils::convertToOrderItemDTO).collect(Collectors.toList()): null);
        return ordersDTO;
    }

    public static OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setFoodItemId(orderItem.getFoodItem() != null ? orderItem.getFoodItem().getId() : null);
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setOrderId(orderItem.getOrders() != null ? orderItem.getOrders().getId() : null);
        return orderItemDTO;
    }

    // DeliveryRider
    public static DeliveryRiderDTO toDeliveryRiderDTO(DeliveryRider rider) {
        if (rider == null) return null;
        DeliveryRiderDTO dto = new DeliveryRiderDTO();
        dto.setId(rider.getId());
        dto.setName(rider.getName());
        dto.setEmail(rider.getEmail());
        dto.setPassword(rider.getPassword());
        dto.setPhone(rider.getPhone());
        dto.setVehicleNumber(rider.getVehicleNumber());
        dto.setLicenseNumber(rider.getLicenseNumber());
        dto.setRole(rider.getRole() != null ? rider.getRole().name() : null);
        dto.setStatus(rider.isStatus());
        return dto;
    }

    // FoodItem
    public static FoodItemDTO toFoodItemDTO(FoodItem item) {
        if (item == null) return null;
        FoodItemDTO dto = new FoodItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setAvailable(item.isAvailable());
        dto.setExpiryTime(item.getExpiryTime());
        dto.setRestaurantId(item.getRestaurant() != null ? item.getRestaurant().getId() : null);
        return dto;
    }

    // Customer
    public static CustomerDTO toCustomerDTO(Customer customer) {
        if (customer == null) return null;
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setPassword(customer.getPassword());
        dto.setPhone(customer.getPhone());
        dto.setAddress(customer.getAddress());
        dto.setRole(customer.getRole() != null ? customer.getRole().name() : null);
        dto.setStatus(customer.isStatus());
        return dto;
    }

}
