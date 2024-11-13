package com.example.bookloanspring.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPrestamo;
    private Date fechaPrestamo;
    private Date fechaDevolucion;
    private String estado; // activo, devuelto

    @ManyToOne
    @JoinColumn(name = "idLibro")
    private Libro libro;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    // Constructor por defecto
    public Prestamo() {}

    // Constructor con parámetros
    public Prestamo(Date fechaPrestamo, Date fechaDevolucion, String estado, Libro libro, Usuario usuario) {
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
        this.libro = libro;
        this.usuario = usuario;
    }

    // Getters y Setters
    public int getIdPrestamo() {
        return idPrestamo;
    }

    public void setIdPrestamo(int idPrestamo) {
        this.idPrestamo = idPrestamo;
    }

    public Date getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(Date fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public Date getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(Date fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Libro getLibro() {
        return libro;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    // Métodos específicos
    public void realizarPrestamo() {
        // Lógica para realizar un préstamo
    }

    public void devolverLibro() {
        // Lógica para devolver un libro
    }

    public void consultarPrestamo() {
        // Lógica para consultar los detalles de un préstamo
    }

    public List<Prestamo> listarPrestamosActivos() {
        // Lógica para listar los préstamos activos
        return null; // Implementar adecuadamente
    }
}
