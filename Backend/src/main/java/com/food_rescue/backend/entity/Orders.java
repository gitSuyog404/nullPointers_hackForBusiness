package com.food_rescue.backend.entity;

import com.food_rescue.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderTime;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private DeliveryRider rider;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
}
