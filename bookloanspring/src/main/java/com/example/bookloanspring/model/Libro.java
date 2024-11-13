package com.example.bookloanspring.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLibro;  // Cambiar a Long, ya que es el tipo recomendado para ID's autogenerados

    private String titulo;
    private String autor;
    private String ISBN;
    private String estado; // disponible, prestado, reservado

    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categoria categoria;

    @OneToMany(mappedBy = "libro")
    private List<Prestamo> prestamos;

    @OneToMany(mappedBy = "libro")
    private List<Reserva> reservas;

    // Constructor por defecto
    public Libro() {}

    // Constructor con parámetros
    public Libro(String titulo, String autor, String ISBN, String estado, Categoria categoria) {
        this.titulo = titulo;
        this.autor = autor;
        this.ISBN = ISBN;
        this.estado = estado;
        this.categoria = categoria;
    }

    // Getters y Setters
    public Long getIdLibro() {  // Cambiar a Long
        return idLibro;
    }

    public void setIdLibro(Long idLibro) {  // Cambiar a Long
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

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
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
        return "disponible".equals(this.estado);
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
