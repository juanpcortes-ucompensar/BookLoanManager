package com.example.bookloanspring.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;
    private String nombre;
    private String direccion;
    private String telefono;

    @OneToMany(mappedBy = "usuario")
    private List<Prestamo> prestamos;

    @OneToMany(mappedBy = "usuario")
    private List<Reserva> reservas;

    // Constructor por defecto
    public Usuario() {}

    // Constructor con parámetros
    public Usuario(String nombre, String direccion, String telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Getters y Setters
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public List<Prestamo> getPrestamos() {
        return prestamos;
    }

    public void setPrestamos(List<Prestamo> prestamos) {
        this.prestamos = prestamos;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    // Métodos específicos
    public void registrarUsuario() {
        // Lógica para registrar un usuario
    }

    public void eliminarUsuario() {
        // Lógica para eliminar un usuario
    }

    public void actualizarUsuario() {
        // Lógica para actualizar los datos de un usuario
    }

    public void consultarUsuario() {
        // Lógica para consultar los datos de un usuario
    }

    public List<Prestamo> listarPrestamos() {
        // Lógica para listar los préstamos de un usuario
        return null; // Implementar adecuadamente
    }

    public List<Reserva> listarReservas() {
        // Lógica para listar las reservas de un usuario
        return null; // Implementar adecuadamente
    }
}
