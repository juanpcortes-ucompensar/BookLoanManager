package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Métodos de búsqueda personalizados pueden ser definidos aquí si es necesario
}
