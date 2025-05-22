package com.example.bookloanspring.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Devolucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDevolucion;

    @Temporal(TemporalType.DATE)
    private Date fechaDevolucion;

    @ManyToOne
    @JoinColumn(name = "idPrestamo")
    private Prestamo prestamo;

    public Devolucion() {}

    public Devolucion(Date fechaDevolucion, Prestamo prestamo) {
        this.fechaDevolucion = fechaDevolucion;
        this.prestamo = prestamo;
    }

    public int getIdDevolucion() {
        return idDevolucion;
    }

    public void setIdDevolucion(int idDevolucion) {
        this.idDevolucion = idDevolucion;
    }

    public Date getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(Date fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public Prestamo getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(Prestamo prestamo) {
        this.prestamo = prestamo;
    }
}
