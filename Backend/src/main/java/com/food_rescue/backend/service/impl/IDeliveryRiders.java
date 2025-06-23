package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.DeliveryRiderDTO;

import java.util.List;

public interface IDeliveryRiders {
    List<DeliveryRiderDTO> getAllRiders();
    DeliveryRiderDTO getRiderById(Long id);
    boolean createRider(DeliveryRiderDTO riderDTO);
    boolean updateRider(DeliveryRiderDTO riderDTO);
    boolean deleteRider(Long id);

}
