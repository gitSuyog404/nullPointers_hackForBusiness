package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.RestaurantDTO;

import java.util.List;

public interface IRestaurant {
    List<RestaurantDTO> getAllRestaurants();
    RestaurantDTO getRestaurantById(Long id);
    boolean createRestaurant(RestaurantDTO restaurantDTO);
    boolean updateRestaurant(RestaurantDTO restaurantDTO);
    boolean deleteRestaurant(Long id);
}

