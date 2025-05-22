package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.model.Prestamo.EstadoPrestamo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {
    // Métodos adicionales si es necesario
    
    long countByEstado(EstadoPrestamo estado);

    @Query("SELECT COUNT(p) FROM Prestamo p WHERE p.estado = :estado AND p.fechaDevolucion < CURRENT_DATE")
    long countVencidosAntesDeHoy(@Param("estado") EstadoPrestamo estado);

    @Query("SELECT p FROM Prestamo p WHERE p.estado = :estado AND p.fechaDevolucion > CURRENT_DATE ORDER BY p.fechaDevolucion ASC")
    Page<Prestamo> findProximosVencimientos(@Param("estado") Prestamo.EstadoPrestamo estado, Pageable pageable);

    List<Prestamo> findByEstado(Prestamo.EstadoPrestamo estado);
}
