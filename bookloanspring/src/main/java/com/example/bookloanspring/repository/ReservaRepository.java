package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Métodos personalizados si es necesario
}
