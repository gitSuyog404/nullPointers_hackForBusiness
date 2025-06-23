package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.FoodItemDTO;

import java.util.List;

public interface FoodItemService {
    boolean createFoodItem(FoodItemDTO foodItemDTO);
    boolean updateFoodItem(FoodItemDTO foodItemDTO);
    List<FoodItemDTO> getAllFoodItems();
    FoodItemDTO getFoodItemById(Long id);
    boolean deleteFoodItem(Long id);
}
