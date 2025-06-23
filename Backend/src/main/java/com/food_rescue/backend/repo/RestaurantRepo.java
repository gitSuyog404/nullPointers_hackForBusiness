package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.entity.Users;
import com.food_rescue.backend.enums.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepo  extends JpaRepository<Restaurant,Long> {
    @Query("SELECT r FROM Restaurant r WHERE r.id = :userId")
    Optional<Restaurant> findRestaurantByUserId(@Param("userId") Long userId);

    // In RestaurantRepository
    @Query("SELECT r FROM Restaurant r WHERE r.email = :email AND r.role = :role")
    Optional<Restaurant> findByEmailAndRole(@Param("email") String email, @Param("role") Roles role);

    Optional<Restaurant> findRestaurantByEmail(String email);
    Restaurant findByUserId(Long userId);
    Restaurant findByUser_Id(Long userId);


}
