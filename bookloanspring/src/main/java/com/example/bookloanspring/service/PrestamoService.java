package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    // Realizar un nuevo préstamo
    public Prestamo realizarPrestamo(Prestamo prestamo) {
        // Realiza el préstamo y guarda en la base de datos
        return prestamoRepository.save(prestamo);
    }

    // Obtener todos los préstamos
    public List<Prestamo> listarPrestamos() {
        // Devuelve la lista de préstamos
        return prestamoRepository.findAll();
    }

    // Consultar un préstamo por su ID
    public Optional<Prestamo> consultarPrestamo(int id) {
        // Busca el préstamo por ID
        return prestamoRepository.findById(id);
    }

    // Devolver un libro prestado
    public Optional<Prestamo> devolverLibro(int id) {
        Optional<Prestamo> prestamoOptional = prestamoRepository.findById(id);
        if (prestamoOptional.isPresent()) {
            Prestamo prestamo = prestamoOptional.get();
            prestamo.setEstado("Devuelto"); // Cambiar el estado del préstamo a "Devuelto"
            return Optional.of(prestamoRepository.save(prestamo)); // Guardamos el préstamo con el nuevo estado
        }
        return Optional.empty(); // Si no existe el préstamo, retornamos Optional vacío
    }
}
