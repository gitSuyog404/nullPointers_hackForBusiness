package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.dto.*;

import java.util.List;

public interface IUser {
    List<UsersDTO> getAllUsers();
    UsersDTO getUserById(Long id);
    boolean createUser(UsersDTO userDTO);
    //    boolean createFirstUser(UserDTO userDTO, Role role, Gender gender, BranchInfo branchInfo);
    boolean updateUser(UsersDTO userDTO);
    boolean deleteUser(Long id);
    boolean setUserStatus(Long id);
//    boolean registerUser(UsersDTO usersDTO);
//    boolean registerUser(RestaurantDTO restaurantDTO, CustomerDTO customerDTO, boolean isRestaurant);
    //    void changePassword(Long id, String oldPassword, String newPassword);
//    void changePasswordByAdmin(Long id, String newPassword);
//    void setUserStatus(Long id);
//    ResponseDTO verifyUser(LoginDTO loginDTO);
//    void changePassword(String oldPassword, String newPassword);
    ResponseDTO verifyUser(UsersDTO userDTO);
}
