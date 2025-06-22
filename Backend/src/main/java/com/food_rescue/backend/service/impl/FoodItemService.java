package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.FoodItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodItemService {
    boolean createFoodItem(FoodItemDTO foodItemDTO, MultipartFile file);
    boolean updateFoodItem(FoodItemDTO foodItemDTO);
    List<FoodItemDTO> getAllFoodItems();
    FoodItemDTO getFoodItemById(Long id);
    boolean deleteFoodItem(Long id);
}
