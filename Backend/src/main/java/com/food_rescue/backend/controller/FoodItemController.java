package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.FoodItemDTO;
import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.service.impl.CloudinaryService;
import com.food_rescue.backend.service.impl.FoodItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/food-items")
public class FoodItemController {
    private final FoodItemService foodItemService;
    private final CloudinaryService cloudinaryService;

    public FoodItemController(FoodItemService foodItemService, CloudinaryService cloudinaryService) {
        this.foodItemService = foodItemService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createFoodItem(
            @RequestPart("foodItem") FoodItemDTO foodItemDTO,
            @RequestPart("image") MultipartFile image) {
        try {
            String imageUrl = cloudinaryService.uploadImage(image);
            foodItemDTO.setImageUrl(imageUrl);

            boolean created = foodItemService.createFoodItem(foodItemDTO);
            if (created) {
                return ResponseEntity.ok(ResponseDTO.success("Food item created successfully"));
            }
            return ResponseEntity.badRequest().body(ResponseDTO.error("Food item creation failed"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseDTO.error("Error: " + e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateFoodItem(
            @RequestPart("foodItem") FoodItemDTO foodItemDTO,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                String imageUrl = cloudinaryService.uploadImage(image);
                foodItemDTO.setImageUrl(imageUrl);
            }

            boolean updated = foodItemService.updateFoodItem(foodItemDTO);
            if (updated) {
                return ResponseEntity.ok(ResponseDTO.success("Food item updated successfully"));
            }
            return ResponseEntity.badRequest().body(ResponseDTO.error("Food item update failed"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseDTO.error("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getAllFoodItems() {
        List<FoodItemDTO> foodItems = foodItemService.getAllFoodItems();
        return ResponseEntity.ok(ResponseDTO.success("Food items fetched successfully",
                Map.of("foodItems", foodItems)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getFoodItemById(@PathVariable Long id) {
        FoodItemDTO foodItem = foodItemService.getFoodItemById(id);
        return ResponseEntity.ok(ResponseDTO.success("Food item fetched successfully",
                Map.of("foodItem", foodItem)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteFoodItem(@PathVariable Long id) {
        boolean deleted = foodItemService.deleteFoodItem(id);
        if (deleted) {
            return ResponseEntity.ok(ResponseDTO.success("Food item deleted successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Food item deletion failed"));
    }
}