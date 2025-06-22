package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.CustomerDTO;
import com.food_rescue.backend.entity.Customer;
import com.food_rescue.backend.repo.CustomerRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService implements ICustomer {
    private final CustomerRepo customerRepository;

    public CustomerService(CustomerRepo customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    @Transactional
    public boolean createCustomer(CustomerDTO customerDTO) {
        try {
            Customer customer = convertToEntity(customerDTO);
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateCustomer(CustomerDTO customerDTO) {
        try {
            if (!customerRepository.existsById(customerDTO.getId())) {
                return false;
            }
            Customer customer = convertToEntity(customerDTO);
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteCustomer(Long id) {
        try {
            if (!customerRepository.existsById(id)) {
                return false;
            }
            customerRepository.deleteById(id);
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
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        return customer;
    }
}
