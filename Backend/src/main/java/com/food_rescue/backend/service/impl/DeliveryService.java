package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.DeliveryRiderDTO;
import com.food_rescue.backend.entity.DeliveryRider;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.DeliveryRiderRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService implements IDeliveryRiders {
    private final DeliveryRiderRepo riderRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public DeliveryService(DeliveryRiderRepo riderRepository) {
        this.riderRepository = riderRepository;
    }

    @Override
    public List<DeliveryRiderDTO> getAllRiders() {
        return riderRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DeliveryRiderDTO getRiderById(Long id) {
        return riderRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    @Transactional
    public boolean createRider(DeliveryRiderDTO riderDTO) {
        try {
            DeliveryRider rider = convertToEntity(riderDTO);
            riderRepository.save(rider);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateRider(DeliveryRiderDTO riderDTO) {
        try {
            if (!riderRepository.existsById(riderDTO.getId())) {
                return false;
            }
            DeliveryRider rider = convertToEntity(riderDTO);
            riderRepository.save(rider);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteRider(Long id) {
        try {
            if (!riderRepository.existsById(id)) {
                return false;
            }
            riderRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private DeliveryRiderDTO convertToDTO(DeliveryRider rider) {
        DeliveryRiderDTO dto = new DeliveryRiderDTO();
//        dto.setId(rider.getId());
        dto.setName(rider.getName());
        dto.setEmail(rider.getEmail());
        dto.setPassword(rider.getPassword());
        dto.setPhone(rider.getPhone());
        dto.setRole(String.valueOf(rider.getRole()));
        dto.setStatus(rider.isStatus());
        return dto;
    }

    private DeliveryRider convertToEntity(DeliveryRiderDTO dto) {
        DeliveryRider rider = new DeliveryRider();
//        rider.setId(dto.getId());
        rider.setName(dto.getName());
        rider.setEmail(dto.getEmail());
        rider.setPassword(encoder.encode(dto.getPassword()));
        rider.setPhone(dto.getPhone());
        rider.setRole(Roles.RIDER);
        rider.setStatus(true);
        return rider;
    }
}
