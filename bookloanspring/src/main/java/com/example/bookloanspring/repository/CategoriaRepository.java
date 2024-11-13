package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {  // Cambiar a Long
    // Métodos adicionales si es necesario
}
