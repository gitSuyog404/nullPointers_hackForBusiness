package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.CustomerDTO;
import com.food_rescue.backend.dto.DeliveryRiderDTO;
import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.RestaurantDTO;
import com.food_rescue.backend.entity.Customer;
import com.food_rescue.backend.entity.DeliveryRider;
import com.food_rescue.backend.entity.Restaurant;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.CustomerRepo;
import com.food_rescue.backend.repo.DeliveryRiderRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisterService {

    @Autowired
    RestaurantRepo restaurantRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    DeliveryRiderRepo deliveryRiderRepo;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public boolean createCustomer(CustomerDTO customerDTO) {
        try {
            Customer customer = new Customer();
            customer.setName(customerDTO.getName());
            customer.setEmail(customerDTO.getEmail());
            customer.setAddress(customerDTO.getAddress());
            customer.setPhone(customerDTO.getPhone());
            customer.setPassword(encoder.encode(customerDTO.getPassword()));
            customer.setStatus(true);
            customer.setRole(Roles.CUSTOMER);
            customerRepo.save(customer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setAddress(customer.getAddress());
        return dto;
    }

    private Customer convertToEntity(CustomerDTO dto) {
        Customer customer = new Customer();
//        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setPassword(dto.getPassword());
        customer.setRole(Roles.CUSTOMER);
        return customer;
    }

    public boolean createRestaurant(RestaurantDTO restaurantDTO) {
        try {
            Restaurant restaurant = convertRestaurantToEntity(restaurantDTO);
            restaurant.setRole(Roles.RESTAURANT);
            restaurantRepo.save(restaurant);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean createDelivery(DeliveryRiderDTO deliveryRiderDTO){
        try{
            DeliveryRider deliveryRider = convertDeliveryRiderToEntity(deliveryRiderDTO);
            deliveryRiderRepo.save(deliveryRider);
            return true;
        } catch (Exception e) {
//            throw new RuntimeException(e);
            return false;
        }
    }


    private RestaurantDTO convertRestaurantToDTO(Restaurant restaurant) {
        RestaurantDTO dto = new RestaurantDTO();
        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setAddress(restaurant.getAddress());
        dto.setPhone(restaurant.getPhone());
        dto.setEmail(restaurant.getEmail());
        return dto;
    }

    private Restaurant convertRestaurantToEntity(RestaurantDTO dto) {
        Restaurant restaurant = new Restaurant();
//        restaurant.setId(dto.getId());
        restaurant.setName(dto.getName());
        restaurant.setAddress(dto.getAddress());
        restaurant.setPhone(dto.getPhone());
        restaurant.setEmail(dto.getEmail());
        restaurant.setPassword(encoder.encode(dto.getPassword()));
        restaurant.setRole(Roles.RESTAURANT);
        restaurant.setRegistrationNumber(dto.getRegistrationNumber());
        return restaurant;
    }

    private DeliveryRider convertDeliveryRiderToEntity(DeliveryRiderDTO deliveryRiderDTO) {
        DeliveryRider deliveryRider = new DeliveryRider();
        deliveryRider.setName(deliveryRiderDTO.getName());
        deliveryRider.setEmail(deliveryRiderDTO.getEmail());
        deliveryRider.setPhone(deliveryRiderDTO.getPhone());
        deliveryRider.setStatus(true);
        deliveryRider.setRole(Roles.RIDER);
        deliveryRider.setPassword(encoder.encode(deliveryRiderDTO.getPassword()));
        deliveryRider.setLicenseNumber(deliveryRiderDTO.getLicenseNumber());
        deliveryRider.setVehicleNumber(deliveryRiderDTO.getVehicleNumber());

        return deliveryRider;
    }

}
