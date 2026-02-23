package com.trainreservationsys.backend.controller;

import com.trainreservationsys.backend.model.Train;
import com.trainreservationsys.backend.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "*") // Allows any frontend to connect for now
public class TrainController {

    @Autowired
    private TrainRepository trainRepository;

    @GetMapping
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }
}