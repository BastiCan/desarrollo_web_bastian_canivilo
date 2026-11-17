package com.tarea4.tarea4.model;

import jakarta.persistence.*;

@Entity 
@Table(name = "comuna")
public class Comuna {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Region getRegion() { return region; }
    public void setRegion(Region region) { this.region = region; }
}
