package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, Long> {  // Cambiar de Integer a Long

    // Método para obtener libros por categoría
    List<Libro> findByCategoriaIdCategoria(Long idCategoria);
}
