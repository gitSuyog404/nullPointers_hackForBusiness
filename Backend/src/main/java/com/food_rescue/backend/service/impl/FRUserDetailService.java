package com.food_rescue.backend.service.impl;

import com.food_rescue.backend.entity.Users;
import com.food_rescue.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class FRUserDetailService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepo.findByName(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Create authority with ROLE_ prefix as required by Spring Security
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + users.getRole());

        return new User(
                users.getName(),
                users.getPassword(),
                Collections.singleton(authority)
        );
    }
}
