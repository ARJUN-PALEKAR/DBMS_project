package com.trainreservationsys.backend.repository;

import com.trainreservationsys.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Spring Boot is smart enough to write the SQL for this automatically just by the method name!
    Optional<User> findByEmail(String email);
}