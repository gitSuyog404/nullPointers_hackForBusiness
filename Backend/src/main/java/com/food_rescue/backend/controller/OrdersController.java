package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.OrdersDTO;
import com.food_rescue.backend.service.impl.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping
    public ResponseEntity<OrdersDTO> createOrder(@RequestBody OrdersDTO ordersDTO) {
        return new ResponseEntity<>(ordersService.createOrder(ordersDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdersDTO> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(ordersService.getOrderById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrdersDTO>> getAllOrders() {
        return ResponseEntity.ok(ordersService.getAllOrders());
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdersDTO> updateOrder(@PathVariable Long id, @RequestBody OrdersDTO ordersDTO) {
        return ResponseEntity.ok(ordersService.updateOrder(id, ordersDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        ordersService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
