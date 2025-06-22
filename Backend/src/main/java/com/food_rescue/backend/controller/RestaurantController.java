package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.RestaurantDTO;
import com.food_rescue.backend.service.impl.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getAllRestaurants() {
        List<RestaurantDTO> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(ResponseDTO.success("Restaurants fetched successfully", Map.of("restaurants", restaurants)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getRestaurantById(@PathVariable Long id) {
        RestaurantDTO restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(ResponseDTO.success("Restaurant fetched successfully", Map.of("restaurant", restaurant)));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        boolean created = restaurantService.createRestaurant(restaurantDTO);
        if (created) {
            return ResponseEntity.ok(ResponseDTO.success("Restaurant created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Restaurant creation failed"));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        boolean updated = restaurantService.updateRestaurant(restaurantDTO);
        if (updated) {
            return ResponseEntity.ok(ResponseDTO.success("Restaurant updated successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Restaurant update failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteRestaurant(@PathVariable Long id) {
        boolean deleted = restaurantService.deleteRestaurant(id);
        if (deleted) {
            return ResponseEntity.ok(ResponseDTO.success("Restaurant deleted successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Restaurant deletion failed"));
    }
}
