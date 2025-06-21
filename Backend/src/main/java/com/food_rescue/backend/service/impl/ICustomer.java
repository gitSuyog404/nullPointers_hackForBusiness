package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.CustomerDTO;

import java.util.List;

public interface ICustomer {
    List<CustomerDTO> getAllCustomers();
    CustomerDTO getCustomerById(Long id);
    boolean createCustomer(CustomerDTO customerDTO);
    boolean updateCustomer(CustomerDTO customerDTO);
    boolean deleteCustomer(Long id);
}
