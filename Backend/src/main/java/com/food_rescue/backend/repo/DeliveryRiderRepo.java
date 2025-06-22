package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.DeliveryRider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRiderRepo extends JpaRepository<DeliveryRider,Long> {
}
