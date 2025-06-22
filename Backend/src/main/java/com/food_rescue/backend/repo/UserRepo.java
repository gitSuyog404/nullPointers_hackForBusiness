package com.food_rescue.backend.repo;

import com.food_rescue.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    List<User>findAllByOrderByIdDesc();
    boolean existsByEmail(String email);
    boolean existsByName(String name);
    boolean existsByPhone(String phone);
    boolean existsByNameAndIdNot(String userName, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);
    Optional<User> findByName(String name);

    boolean findByEmail(String email);
}
