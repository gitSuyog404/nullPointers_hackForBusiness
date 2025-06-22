package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.UsersDTO;
import com.food_rescue.backend.entity.User;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.CustomerRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import com.food_rescue.backend.repo.UserRepo;
import com.food_rescue.backend.utils.ConvertUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUser {
    private final UserRepo userRepo;
    private final RestaurantRepo restaurantRepo;
    private final CustomerRepo customerRepo;

    public UserService(UserRepo userRepo, RestaurantRepo restaurantRepo, CustomerRepo customerRepo) {
        this.userRepo = userRepo;
        this.customerRepo = customerRepo;
        this.restaurantRepo = restaurantRepo;
    }

    @Override
    public List<UsersDTO> getAllUsers() {
        List<User> users = userRepo.findAllByOrderByIdDesc();
        if (users == null) {
            throw new IllegalArgumentException("No users found");
        }
        return ConvertUtils.convertToUsersListDTO(users);
    }

    @Override
    public UsersDTO getUserById(Long id) {
        User user = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        return ConvertUtils.convertToUsersDTO(user);
    }

    @Override
    public boolean createUser(UsersDTO userDTO) {
        try {
            if (userDTO.getName() != null && userRepo.existsByName(userDTO.getName())) {
                throw new IllegalArgumentException("User already exists");
            }

            if (userDTO.getEmail() != null && userRepo.existsByEmail(userDTO.getEmail())) {
                throw new IllegalArgumentException("Email already exists");
            }

            if (userDTO.getPhone() != null && userRepo.existsByPhone(userDTO.getPhone())) {
                throw new IllegalArgumentException("Phone already exists");
            }

            User user = new User();
            user.setId(userDTO.getId());
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
            user.setPhone(userDTO.getPhone());
            user.setRole(Roles.valueOf(userDTO.getRole()));
//            users.setStatus(userDTO.isStatus());

            userRepo.save(user);
            return true;
        } catch (Exception e) {
//            throw new RuntimeException(e);
            return false;
        }
    }

    @Override
    public boolean updateUser(UsersDTO userDTO) {
        try {
            User existingUser = userRepo.findById(userDTO.getId()).orElseThrow(() ->
                    new IllegalArgumentException("User not found"));

            if (userDTO.getName() != null && userRepo.existsByNameAndIdNot(userDTO.getName(), userDTO.getId())) {
                throw new IllegalArgumentException("UserName already exists");
            }

            if (userDTO.getEmail() != null && userRepo.existsByEmailAndIdNot(userDTO.getEmail(), userDTO.getId())) {
                throw new IllegalArgumentException("Email already exists");
            }

            if (userDTO.getPhone() != null && userRepo.existsByPhone(userDTO.getPhone())) {
                throw new IllegalArgumentException("Phone already exists");
            }

            updateUserField(existingUser, userDTO);

            userRepo.save(existingUser);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    private void updateUserField(User user, UsersDTO usersDTO) {
        if (usersDTO.getName() != null) user.setName(usersDTO.getName());
        if (usersDTO.getEmail() != null) user.setEmail(usersDTO.getEmail());
        if (usersDTO.getPhone() != null) user.setPhone(usersDTO.getPhone());
        if (user.getRole() != null) user.setRole(user.getRole());
        if (user.isStatus() != user.isStatus()) user.setStatus(user.isStatus());
    }

    @Override
    public boolean deleteUser(Long id) {
        User user = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        userRepo.delete(user);
        return true;
    }

    @Override
    public boolean setUserStatus(Long id) {
        User user = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        user.setStatus(!user.isStatus());
        userRepo.save(user);
        return true;
    }
}
