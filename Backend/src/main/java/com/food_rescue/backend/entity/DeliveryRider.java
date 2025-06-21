package com.food_rescue.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class DeliveryRider extends Users {
    private String vehicleNumber;
    private String licenseNumber;

    @OneToMany(mappedBy = "rider")
    private List<Orders> assignedOrders = new ArrayList<>();
}
