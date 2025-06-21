package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.RestaurantDTO;
import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.repo.RestaurantRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService implements IRestaurant {
    private final RestaurantRepo restaurantRepository;

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
    @Transactional
    public boolean updateRestaurant(RestaurantDTO restaurantDTO) {
        try {
            if (!restaurantRepository.existsById(restaurantDTO.getId())) {
                return false;
            }
            Restaurant restaurant = convertToEntity(restaurantDTO);
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
        return dto;
    }

    private Restaurant convertToEntity(RestaurantDTO dto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(dto.getId());
        restaurant.setName(dto.getName());
        restaurant.setAddress(dto.getAddress());
        restaurant.setPhone(dto.getPhone());
        restaurant.setEmail(dto.getEmail());
        return restaurant;
    }

}
