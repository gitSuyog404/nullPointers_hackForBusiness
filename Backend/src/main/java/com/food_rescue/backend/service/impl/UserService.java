package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.UsersDTO;
import com.food_rescue.backend.entity.Users;
import com.food_rescue.backend.enums.Roles;
import com.food_rescue.backend.repo.CustomerRepo;
import com.food_rescue.backend.repo.RestaurantRepo;
import com.food_rescue.backend.repo.UserRepo;
import com.food_rescue.backend.utils.ConvertUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements IUser {
    private final UserRepo userRepo;
    private final RestaurantRepo restaurantRepo;
    private final CustomerRepo customerRepo;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepo userRepo, RestaurantRepo restaurantRepo, CustomerRepo customerRepo,
                       JWTService jwtService, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.customerRepo = customerRepo;
        this.restaurantRepo = restaurantRepo;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public List<UsersDTO> getAllUsers() {
        List<Users> users = userRepo.findAllByOrderByIdDesc();
        if (users == null) {
            throw new IllegalArgumentException("No users found");
        }
        return ConvertUtils.convertToUsersListDTO(users);
    }

    @Override
    public UsersDTO getUserById(Long id) {
        Users users = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        return ConvertUtils.convertToUsersDTO(users);
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

            Users users = new Users();
//            users.setId(userDTO.getId());
            users.setName(userDTO.getName());
            users.setEmail(userDTO.getEmail());
            users.setPassword(encoder.encode(userDTO.getPassword()));
            users.setPhone(userDTO.getPhone());
            users.setRole(Roles.valueOf(userDTO.getRole()));
            users.setStatus(true);

            userRepo.save(users);
            return true;
        } catch (Exception e) {
//            throw new RuntimeException(e);
            return false;
        }
    }

    @Override
    public boolean updateUser(UsersDTO userDTO) {
        try {
            Users existingUsers = userRepo.findById(userDTO.getId()).orElseThrow(() ->
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

            updateUserField(existingUsers, userDTO);

            userRepo.save(existingUsers);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    private void updateUserField(Users users, UsersDTO usersDTO) {
        if (usersDTO.getName() != null) users.setName(usersDTO.getName());
        if (usersDTO.getEmail() != null) users.setEmail(usersDTO.getEmail());
        if (usersDTO.getPhone() != null) users.setPhone(usersDTO.getPhone());
        if (users.getRole() != null) users.setRole(users.getRole());
        if (users.isStatus() != users.isStatus()) users.setStatus(users.isStatus());
    }

    @Override
    public boolean deleteUser(Long id) {
        Users users = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        userRepo.delete(users);
        return true;
    }

    @Override
    public boolean setUserStatus(Long id) {
        Users users = userRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User not found"));
        users.setStatus(!users.isStatus());
        userRepo.save(users);
        return true;
    }

    @Override
    public ResponseDTO verifyUser(UsersDTO userDTO) {
        Optional<Users> userOptional = userRepo.findByEmail(userDTO.getEmail());

        if (!userOptional.isPresent()) {
            return ResponseDTO.error("User not found");
        }

        Users user = userOptional.get();
        userDTO.setName(user.getName());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getName(), userDTO.getPassword())
            );

            if (authentication.isAuthenticated()) {
                var getToken = jwtService.generateToken(user.getName());
                Map<String, Object> detail = new HashMap<>();
                detail.put("token", getToken);
                detail.put("userName", user.getName());
                detail.put("email", user.getEmail());
                detail.put("role", user.getRole());
                detail.put("userId", user.getId());
                return ResponseDTO.success("Login Success", Map.of("user", detail));
            }
        } catch (BadCredentialsException e) {
            return ResponseDTO.error("Invalid Credentials");
        }

        return ResponseDTO.error("Login Failed");
    }
}
