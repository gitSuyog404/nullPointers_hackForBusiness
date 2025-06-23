package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepo  extends JpaRepository<Restaurant,Long> {
}
