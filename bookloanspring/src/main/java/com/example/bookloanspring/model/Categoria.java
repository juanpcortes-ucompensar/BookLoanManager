package com.example.bookloanspring.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria; 

    private String nombre;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnore // Ignorar la lista de libros al serializar
    private List<Libro> libros;

    // Getters y Setters
    public Long getIdCategoria() {
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
