package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Devolucion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DevolucionRepository extends JpaRepository<Devolucion, Integer> {
}
