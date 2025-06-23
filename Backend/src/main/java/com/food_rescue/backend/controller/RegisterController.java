package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.CustomerDTO;
import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.RestaurantDTO;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.CustomerRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import com.food_rescue.backend.service.impl.RegisterService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    private final RestaurantRepo restaurantRepo;
    private final CustomerRepo customerRepo;
    private final RegisterService registerService;

    public RegisterController(RestaurantRepo restaurantRepo, CustomerRepo customerRepo, RegisterService registerService) {
        this.restaurantRepo = restaurantRepo;
        this.customerRepo = customerRepo;
        this.registerService = registerService;
    }

    @PostMapping("/customer")
    public ResponseEntity<ResponseDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        boolean created = registerService.createCustomer(customerDTO);
        if (created) {
            return ResponseEntity.ok(ResponseDTO.success("Customer created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Customer creation failed"));
    }

    @PostMapping("/restaurant")
    public ResponseEntity<ResponseDTO> createRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        boolean created = registerService.createRestaurant(restaurantDTO);
        if (created) {
            return ResponseEntity.ok(ResponseDTO.success("Restaurant created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Restaurant creation failed"));
    }
}
