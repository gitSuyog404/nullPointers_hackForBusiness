package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.FoodItemDTO;
import com.food_rescue.backend.entity.FoodItem;
import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.entity.Users;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.FoodItemRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import com.food_rescue.backend.repo.UserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.ClosedDirectoryStreamException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodItemServiceImpl implements FoodItemService {
    private final FoodItemRepo foodItemRepository;
    private final RestaurantRepo restaurantRepository;
    private final CloudinaryService cloudinaryService;
    private final UserRepo userRepository;

    public FoodItemServiceImpl(FoodItemRepo foodItemRepository, RestaurantRepo restaurantRepository, CloudinaryService cloudinaryService, UserRepo userRepository) {
        this.foodItemRepository = foodItemRepository;
        this.restaurantRepository = restaurantRepository;
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
    }

    private Users getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

//    private void validateRestaurantAccess() {
//        Users currentUser = getCurrentUser();
//        if (!"RESTAURANT".equals(currentUser.getRole())) {
//            throw new RuntimeException("Access denied. Only restaurants can perform this operation.");
//        }
//    }

    private void validateRestaurantOwnership(Long restaurantId) {
        Users currentUser = getCurrentUser();
        if (!restaurantId.equals(currentUser.getId())) {
            throw new RuntimeException("Access denied. You can only manage your own restaurant's food items.");
        }
    }

    @Override
    public boolean createFoodItem(FoodItemDTO foodItemDTO, MultipartFile imageFile) {
        try {
            Users currentUser = getCurrentUser();
            Restaurant restaurant = restaurantRepository.findByUser_Id(currentUser.getId());

            FoodItem foodItem = new FoodItem();
            foodItem.setName(foodItemDTO.getName());
            foodItem.setDescription(foodItemDTO.getDescription());
            foodItem.setPrice(foodItemDTO.getPrice());
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            foodItem.setImageUrl(imageUrl);
            foodItem.setRestaurant(restaurant);
            foodItem.setAvailable(true);
            foodItem.setQuantity(foodItemDTO.getQuantity());
            foodItem.setPostingTime(LocalDateTime.now());
            foodItem.setExpiryTime(LocalDateTime.now().plusHours(6));

            foodItemRepository.save(foodItem);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
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
//
//    @Override
//    public boolean createFoodItem(FoodItemDTO foodItemDTO) {
//        return false;
//    }

    @Override
    public boolean updateFoodItem(FoodItemDTO foodItemDTO) {
        try {
//            validateRestaurantAccess();

            FoodItem foodItem = foodItemRepository.findById(foodItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

//            validateRestaurantOwnership(foodItem.getRestaurant().getId());

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
       return foodItemRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FoodItemDTO getFoodItemById(Long id) {
//        validateRestaurantAccess();

        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found"));

//        validateRestaurantOwnership(foodItem.getRestaurant().getId());
        return convertToDTO(foodItem);
    }

    @Override
    public boolean deleteFoodItem(Long id) {
        try {
//            validateRestaurantAccess();

            FoodItem foodItem = foodItemRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

//            validateRestaurantOwnership(foodItem.getRestaurant().getId());

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
    // Add null check for restaurant
    if (foodItem.getRestaurant() != null) {
        dto.setRestaurantId(foodItem.getRestaurant().getId());
    }
    dto.setAvailable(foodItem.isAvailable());
    dto.setQuantity(foodItem.getQuantity());
    dto.setPostingTime(foodItem.getPostingTime());
    dto.setExpiryTime(foodItem.getExpiryTime());
    return dto;
}
}