package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepo extends JpaRepository<Orders,Long> {
}
