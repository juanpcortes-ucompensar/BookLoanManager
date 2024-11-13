package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {  // Cambiar de Integer a Long
}
