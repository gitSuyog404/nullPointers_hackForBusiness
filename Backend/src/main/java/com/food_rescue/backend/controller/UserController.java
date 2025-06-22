package com.food_rescue.backend.controller;

import com.food_rescue.backend.dto.ResponseDTO;
import com.food_rescue.backend.dto.UsersDTO;
import com.food_rescue.backend.service.impl.IUser;
import com.food_rescue.backend.service.impl.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final IUser userService;

    public UserController(IUser userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getAllUsers(){
        List<UsersDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(ResponseDTO.success("Users fetched successfully", Map.of("users", users)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getUserById(@PathVariable Long id){
        UsersDTO users = userService.getUserById(id);
        return ResponseEntity.ok(ResponseDTO.success("User fetched successfully", Map.of("user", users)));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createUser(@RequestBody UsersDTO userDTO){
        boolean created = userService.createUser(userDTO);
        if (created){
            return ResponseEntity.ok(ResponseDTO.success("User created successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("User creation failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteUser(@PathVariable Long id){
        boolean deleted = userService.deleteUser(id);
        if (deleted){
            return ResponseEntity.ok(ResponseDTO.success("User deleted successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("User deletion failed"));

    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateUser(@RequestBody UsersDTO userDTO){
        boolean updated = userService.updateUser(userDTO);
        if (updated){
            return ResponseEntity.ok(ResponseDTO.success("User updated successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("User update failed"));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<ResponseDTO> updateUserStatus(@PathVariable Long id){
        boolean updated = userService.setUserStatus(id);
        if (updated){
            return ResponseEntity.ok(ResponseDTO.success("User status updated successfully"));
        }
        return ResponseEntity.badRequest().body(ResponseDTO.error("User status update failed"));
    }
}
