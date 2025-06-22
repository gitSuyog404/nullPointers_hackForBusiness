package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.RestaurantDTO;
import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.RestaurantRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService implements IRestaurant {
    private final RestaurantRepo restaurantRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public RestaurantService(RestaurantRepo restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public List<RestaurantDTO> getAllRestaurants() {
        return restaurantRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RestaurantDTO getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    @Transactional
    public boolean createRestaurant(RestaurantDTO restaurantDTO) {
        try {
            Restaurant restaurant = convertToEntity(restaurantDTO);
            restaurantRepository.save(restaurant);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateRestaurant(RestaurantDTO restaurantDTO) {
        try {
            Restaurant existingRestaurant = restaurantRepository.findById(restaurantDTO.getId())
                    .orElse(null);
            if (existingRestaurant == null) {
                return false;
            }
            Restaurant restaurant = convertToEntity(restaurantDTO);
            if (restaurantDTO.getPassword() == null || restaurantDTO.getPassword().isEmpty()) {
                restaurant.setPassword(existingRestaurant.getPassword());
            }
            restaurantRepository.save(restaurant);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteRestaurant(Long id) {
        try {
            if (!restaurantRepository.existsById(id)) {
                return false;
            }
            restaurantRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private RestaurantDTO convertToDTO(Restaurant restaurant) {
        RestaurantDTO dto = new RestaurantDTO();
        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setAddress(restaurant.getAddress());
        dto.setPhone(restaurant.getPhone());
        dto.setEmail(restaurant.getEmail());
        dto.setAddress(restaurant.getAddress());
        dto.setRegistrationNumber(restaurant.getRegistrationNumber());
        dto.setPassword(encoder.encode(restaurant.getPassword()));
        return dto;
    }

    private Restaurant convertToEntity(RestaurantDTO dto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(dto.getId());
        restaurant.setName(dto.getName());
        restaurant.setAddress(dto.getAddress());
        restaurant.setPhone(dto.getPhone());
        restaurant.setEmail(dto.getEmail());
        restaurant.setRegistrationNumber(dto.getRegistrationNumber());
        restaurant.setRole(Roles.RESTAURANT);
        // Only encode password if it's not null or empty
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            restaurant.setPassword(encoder.encode(dto.getPassword()));
        }
        restaurant.setStatus(true);
        return restaurant;
    }

}
