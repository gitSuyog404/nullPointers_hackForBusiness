package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.FoodItemDTO;
import com.food_rescue.backend.entity.FoodItem;
import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.entity.Users;
import com.food_rescue.backend.repo.FoodItemRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodItemServiceImpl implements FoodItemService {
    private final FoodItemRepo foodItemRepository;
    private final RestaurantRepo restaurantRepository;

    public FoodItemServiceImpl(FoodItemRepo foodItemRepository, RestaurantRepo restaurantRepository) {
        this.foodItemRepository = foodItemRepository;
        this.restaurantRepository = restaurantRepository;
    }

    private Users getCurrentUser() {
        return (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private void validateRestaurantAccess() {
        Users currentUser = getCurrentUser();
        if (!"RESTAURANT".equals(currentUser.getRole())) {
            throw new RuntimeException("Access denied. Only restaurants can perform this operation.");
        }
    }

    private void validateRestaurantOwnership(Long restaurantId) {
        Users currentUser = getCurrentUser();
        if (!restaurantId.equals(currentUser.getId())) {
            throw new RuntimeException("Access denied. You can only manage your own restaurant's food items.");
        }
    }

//    @Override
//    public boolean createFoodItem(FoodItemDTO foodItemDTO) {
//        try {
//            validateRestaurantAccess();
//            validateRestaurantOwnership(foodItemDTO.getRestaurantId());
//
//            Restaurant restaurant = restaurantRepository.findById(foodItemDTO.getRestaurantId())
//                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
//
//            FoodItem foodItem = new FoodItem();
//            foodItem.setName(foodItemDTO.getName());
//            foodItem.setDescription(foodItemDTO.getDescription());
//            foodItem.setPrice(foodItemDTO.getPrice());
//            foodItem.setImageUrl(foodItemDTO.getImageUrl());
//            foodItem.setRestaurant(restaurant);
//            foodItem.setAvailable(true);
//            foodItem.setQuantity(foodItemDTO.getQuantity());
//            foodItem.setExpiryTime(foodItemDTO.getExpiryTime());
//
//            foodItemRepository.save(foodItem);
//            return true;
//        } catch (Exception e) {
//            throw new RuntimeException(e.getMessage());
//        }
//    }


    @Override
    public boolean createFoodItem(FoodItemDTO foodItemDTO) {
        try {
            validateRestaurantAccess();
            validateRestaurantOwnership(foodItemDTO.getRestaurantId());

            Restaurant restaurant = restaurantRepository.findById(foodItemDTO.getRestaurantId())
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));

            FoodItem foodItem = new FoodItem();
            foodItem.setName(foodItemDTO.getName());
            foodItem.setDescription(foodItemDTO.getDescription());
            foodItem.setPrice(foodItemDTO.getPrice());
            foodItem.setImageUrl(foodItemDTO.getImageUrl());
            foodItem.setRestaurant(restaurant);
            foodItem.setAvailable(true);
            foodItem.setQuantity(foodItemDTO.getQuantity());

            // Set posting time to current time
            LocalDateTime now = LocalDateTime.now();
            foodItem.setPostingTime(now);

            // Set expiry time to 6 hours after posting
            foodItem.setExpiryTime(now.plusHours(6));

            foodItemRepository.save(foodItem);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


//    @Override
//    public boolean updateFoodItem(FoodItemDTO foodItemDTO) {
//        try {
//            validateRestaurantAccess();
//
//            FoodItem foodItem = foodItemRepository.findById(foodItemDTO.getId())
//                    .orElseThrow(() -> new RuntimeException("Food item not found"));
//
//            validateRestaurantOwnership(foodItem.getRestaurant().getId());
//
//            foodItem.setName(foodItemDTO.getName());
//            foodItem.setDescription(foodItemDTO.getDescription());
//            foodItem.setPrice(foodItemDTO.getPrice());
//            if (foodItemDTO.getImageUrl() != null) {
//                foodItem.setImageUrl(foodItemDTO.getImageUrl());
//            }
//            foodItem.setAvailable(foodItemDTO.isAvailable());
//            foodItem.setQuantity(foodItemDTO.getQuantity());
//            foodItem.setExpiryTime(foodItemDTO.getExpiryTime());
//
//            foodItemRepository.save(foodItem);
//            return true;
//        } catch (Exception e) {
//            throw new RuntimeException(e.getMessage());
//        }
//    }

    @Override
    public boolean updateFoodItem(FoodItemDTO foodItemDTO) {
        try {
            validateRestaurantAccess();

            FoodItem foodItem = foodItemRepository.findById(foodItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

            validateRestaurantOwnership(foodItem.getRestaurant().getId());

            foodItem.setName(foodItemDTO.getName());
            foodItem.setDescription(foodItemDTO.getDescription());
            foodItem.setPrice(foodItemDTO.getPrice());
            if (foodItemDTO.getImageUrl() != null) {
                foodItem.setImageUrl(foodItemDTO.getImageUrl());
            }
            foodItem.setAvailable(foodItemDTO.isAvailable());
            foodItem.setQuantity(foodItemDTO.getQuantity());

            // Keep original posting time and expiry time
            // Only update if the food item is reposted
                LocalDateTime now = LocalDateTime.now();
                foodItem.setPostingTime(now);
                foodItem.setExpiryTime(now.plusHours(6));

            foodItemRepository.save(foodItem);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<FoodItemDTO> getAllFoodItems() {
        validateRestaurantAccess();
        Users currentUser = getCurrentUser();

        return foodItemRepository.findByRestaurantId(currentUser.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FoodItemDTO getFoodItemById(Long id) {
        validateRestaurantAccess();

        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found"));

        validateRestaurantOwnership(foodItem.getRestaurant().getId());
        return convertToDTO(foodItem);
    }

    @Override
    public boolean deleteFoodItem(Long id) {
        try {
            validateRestaurantAccess();

            FoodItem foodItem = foodItemRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

            validateRestaurantOwnership(foodItem.getRestaurant().getId());

            foodItemRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

//    private FoodItemDTO convertToDTO(FoodItem foodItem) {
//        FoodItemDTO dto = new FoodItemDTO();
//        dto.setId(foodItem.getId());
//        dto.setName(foodItem.getName());
//        dto.setDescription(foodItem.getDescription());
//        dto.setPrice(foodItem.getPrice());
//        dto.setImageUrl(foodItem.getImageUrl());
//        dto.setRestaurantId(foodItem.getRestaurant().getId());
//        dto.setAvailable(foodItem.isAvailable());
//        dto.setQuantity(foodItem.getQuantity());
//        dto.setExpiryTime(foodItem.getExpiryTime());
//        return dto;
//    }
private FoodItemDTO convertToDTO(FoodItem foodItem) {
    FoodItemDTO dto = new FoodItemDTO();
    dto.setId(foodItem.getId());
    dto.setName(foodItem.getName());
    dto.setDescription(foodItem.getDescription());
    dto.setPrice(foodItem.getPrice());
    dto.setImageUrl(foodItem.getImageUrl());
    dto.setRestaurantId(foodItem.getRestaurant().getId());
    dto.setAvailable(foodItem.isAvailable());
    dto.setQuantity(foodItem.getQuantity());
    dto.setPostingTime(foodItem.getPostingTime());
    dto.setExpiryTime(foodItem.getExpiryTime());
    return dto;
}
}