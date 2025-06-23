package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepo extends JpaRepository<FoodItem,Long> {
    List<FoodItem> findByRestaurantId(Long restaurantId);
}
