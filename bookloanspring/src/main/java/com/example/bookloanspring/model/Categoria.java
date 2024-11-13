package com.example.bookloanspring.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria; // Cambié a Long para mayor compatibilidad con JPA

    private String nombre;

    @OneToMany(mappedBy = "categoria")
    private List<Libro> libros;

    // Constructor por defecto
    public Categoria() {}

    // Constructor con parámetros
    public Categoria(String nombre) {
        this.nombre = nombre;
    }

    // Getters y Setters
    public Long getIdCategoria() {  // Asegúrate de que el tipo sea Long
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Libro> getLibros() {
        return libros;
    }

    public void setLibros(List<Libro> libros) {
        this.libros = libros;
    }

    // Métodos específicos
    public void agregarCategoria() {
        // Lógica para agregar una nueva categoría
    }

    public void eliminarCategoria() {
        // Lógica para eliminar una categoría
    }

    public void actualizarCategoria() {
        // Lógica para actualizar una categoría
    }

    public void consultarCategoria() {
        // Lógica para consultar una categoría
    }

    public List<Libro> listarLibrosPorCategoria() {
        return libros;
    }
}
