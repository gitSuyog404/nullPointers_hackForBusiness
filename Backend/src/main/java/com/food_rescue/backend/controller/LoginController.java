package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.UsersDTO;
import com.food_rescue.backend.service.impl.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    IUser userService;

    @PostMapping("/login")
    public ResponseDTO login(@RequestBody UsersDTO userDTO) {
        try {
            return userService.verifyUser(userDTO);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.error(e.getMessage());
        }
    }
}
