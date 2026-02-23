package com.trainreservationsys.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "TrainClasses")
public class TrainClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int classId;
    
    private String classType;
    private Double basePrice;
    private int availableSeats;

    @ManyToOne
    @JoinColumn(name = "train_id")
    @JsonBackReference 
    private Train train;

    // --- GETTERS AND SETTERS ---
    public int getClassId() { return classId; }
    public void setClassId(int classId) { this.classId = classId; }
    public String getClassType() { return classType; }
    public void setClassType(String classType) { this.classType = classType; }
    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    public Train getTrain() { return train; }
    public void setTrain(Train train) { this.train = train; }
}