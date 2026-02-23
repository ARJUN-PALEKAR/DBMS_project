package com.trainreservationsys.backend.repository;

// We IMPORT the Train model so this file knows what a Train is
import com.trainreservationsys.backend.model.Train; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends JpaRepository<Train, Integer> {
    // Spring Boot provides findAll(), findById(), save(), etc. for free!
}