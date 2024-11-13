package com.example.bookloanspring.model;
import java.util.List;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReserva;
    private Date fechaReserva;
    private String estado; // activo, cancelado

    @ManyToOne
    @JoinColumn(name = "idLibro")
    private Libro libro;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    // Constructor por defecto
    public Reserva() {}

    // Constructor con parámetros
    public Reserva(Date fechaReserva, String estado, Libro libro, Usuario usuario) {
        this.fechaReserva = fechaReserva;
        this.estado = estado;
        this.libro = libro;
        this.usuario = usuario;
    }

    // Getters y Setters
    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public Date getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(Date fechaReserva) {
        this.fechaReserva = fechaReserva;
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
    public void realizarReserva() {
        // Lógica para realizar una reserva
    }

    public void cancelarReserva() {
        // Lógica para cancelar una reserva
    }

    public void consultarReserva() {
        // Lógica para consultar la reserva
    }

    public List<Reserva> listarReservasActivas() {
        // Lógica para listar las reservas activas
        return null; // Debes agregar el código para obtener las reservas activas
    }
}
