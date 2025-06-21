package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.CustomerDTO;
import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.service.impl.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(ResponseDTO.success("Customers fetched successfully", Map.of("customers", customers)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(ResponseDTO.success("Customer fetched successfully", Map.of("customer", customer)));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        boolean created = customerService.createCustomer(customerDTO);
        if (created) {
            return ResponseEntity.ok(ResponseDTO.success("Customer created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Customer creation failed"));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateCustomer(@RequestBody CustomerDTO customerDTO) {
        boolean updated = customerService.updateCustomer(customerDTO);
        if (updated) {
            return ResponseEntity.ok(ResponseDTO.success("Customer updated successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Customer update failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteCustomer(@PathVariable Long id) {
        boolean deleted = customerService.deleteCustomer(id);
        if (deleted) {
            return ResponseEntity.ok(ResponseDTO.success("Customer deleted successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("Customer deletion failed"));
    }

}
