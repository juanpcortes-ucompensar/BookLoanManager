package com.example.bookloanspring.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLibro;

    private String titulo;
    private String autor;
    private String isbn;
    private String estado; // Disponible, prestado, reservado

    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categoria categoria;

    @OneToMany(mappedBy = "libro")
    @JsonIgnore // Ignorar la lista de prestamos al serializar
    private List<Prestamo> prestamos;

    @OneToMany(mappedBy = "libro")
    @JsonIgnore // Ignorar la lista de reservas al serializar
    private List<Reserva> reservas;

    // Getters y Setters
    public Long getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(Long idLibro) {
        this.idLibro = idLibro;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
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
    public boolean disponibilidad() {
        return "Disponible".equals(this.estado);
    }

    public void agregarLibro() {
        // Lógica para agregar un libro
    }

    public void eliminarLibro() {
        // Lógica para eliminar un libro
    }

    public void actualizarLibro() {
        // Lógica para actualizar un libro
    }

    public void consultarLibro() {
        // Lógica para consultar un libro
    }
}
