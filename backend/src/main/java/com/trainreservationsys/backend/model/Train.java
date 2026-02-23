package com.trainreservationsys.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;

@Entity
@Table(name = "Trains")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int trainId;
    
    private String trainNumber;
    private String trainName;
    private String trainType;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "source_station_id")
    private Station sourceStation;

    @ManyToOne
    @JoinColumn(name = "dest_station_id")
    private Station destStation;

    // Force EAGER loading so the array isn't empty when it hits the frontend
    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference 
    private List<TrainClass> classes;

    // --- GETTERS AND SETTERS ---
    public int getTrainId() { return trainId; }
    public void setTrainId(int trainId) { this.trainId = trainId; }
    public String getTrainNumber() { return trainNumber; }
    public void setTrainNumber(String trainNumber) { this.trainNumber = trainNumber; }
    public String getTrainName() { return trainName; }
    public void setTrainName(String trainName) { this.trainName = trainName; }
    public String getTrainType() { return trainType; }
    public void setTrainType(String trainType) { this.trainType = trainType; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Station getSourceStation() { return sourceStation; }
    public void setSourceStation(Station sourceStation) { this.sourceStation = sourceStation; }
    public Station getDestStation() { return destStation; }
    public void setDestStation(Station destStation) { this.destStation = destStation; }
    public List<TrainClass> getClasses() { return classes; }
    public void setClasses(List<TrainClass> classes) { this.classes = classes; }
}