package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo  extends JpaRepository<OrderItem,Long> {
}
