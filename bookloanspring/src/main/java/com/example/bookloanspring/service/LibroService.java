package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    // Método para obtener todos los libros
    public List<Libro> getAllLibros() {
        return libroRepository.findAll();
    }

    // Método para obtener un libro por ID
    public Optional<Libro> getLibroById(Long id) {
        return libroRepository.findById(id);
    }

    // Método para agregar un libro
    public Libro createLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    // Método para obtener libros por categoría
    public List<Libro> getLibrosByCategoria(Long idCategoria) {
        return libroRepository.findByCategoriaIdCategoria(idCategoria); // Usamos una consulta personalizada
    }
}
