package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {
    // Métodos adicionales si es necesario
}
