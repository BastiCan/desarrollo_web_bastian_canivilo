package com.tarea4.tarea4.dto;

public class AvistamientoBusquedaDT0 {
    private Integer id;
    private String voluntarioNombre;
    private String dia;
    private String aveNombre;
    private String comunaNombre;
    private String nota;
    
    public AvistamientoBusquedaDT0(Integer id, String voluntarioNombre, String dia, String aveNombre, String comunaNombre, String nota) {
        this.id = id;
        this.voluntarioNombre = voluntarioNombre;
        this.dia = dia;
        this.aveNombre = aveNombre;
        this.comunaNombre = comunaNombre;
        this.nota = nota;
    } 
    
    public Integer getId() { return id; }
    public String getVoluntarioNombre() { return voluntarioNombre; }
    public String getDia() { return dia; }
    public String getAveNombre() { return aveNombre; }
    public String getComunaNombre() { return comunaNombre; }
    public String getNota() { return nota; }
}
