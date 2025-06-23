package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.DeliveryRiderDTO;
import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.service.impl.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rides")
public class DeliveryRiderController {
    private final DeliveryService riderService;

    public DeliveryRiderController(DeliveryService riderService) {
        this.riderService = riderService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getAllRiders() {
        List<DeliveryRiderDTO> riders = riderService.getAllRiders();
        return ResponseEntity.ok(ResponseDTO.success("Riders fetched successfully", Map.of("riders", riders)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getRiderById(@PathVariable Long id) {
        DeliveryRiderDTO rider = riderService.getRiderById(id);
        return ResponseEntity.ok(ResponseDTO.success("Rider fetched successfully", Map.of("rider", rider)));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createRider(@RequestBody DeliveryRiderDTO riderDTO) {
        boolean created = riderService.createRider(riderDTO);
        if (created) {
            return ResponseEntity.ok(ResponseDTO.success("Rider created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Rider creation failed"));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRider(@RequestBody DeliveryRiderDTO riderDTO) {
        boolean updated = riderService.updateRider(riderDTO);
        if (updated) {
            return ResponseEntity.ok(ResponseDTO.success("Rider updated successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Rider update failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteRider(@PathVariable Long id) {
        boolean deleted = riderService.deleteRider(id);
        if (deleted) {
            return ResponseEntity.ok(ResponseDTO.success("Rider deleted successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Rider deletion failed"));
    }

}
