package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.model.Libro.EstadoLibro;
import com.example.bookloanspring.model.Prestamo.EstadoPrestamo;
import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.repository.LibroRepository;
import com.example.bookloanspring.repository.PrestamoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;
    @Autowired
    private LibroRepository libroRepository;

    public Prestamo realizarPrestamo(Prestamo prestamoRequest) {
        Libro libro = libroRepository.findById(prestamoRequest.getLibro().getIdLibro())
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado"));

        if (libro.getEstado() == EstadoLibro.Prestado) {
            throw new IllegalStateException("Este libro ya está prestado.");
        }

        // Cambiar estado del libro
        libro.setEstado(EstadoLibro.Prestado);
        libroRepository.save(libro);

        Prestamo prestamo = new Prestamo();
        prestamo.setFechaPrestamo(prestamoRequest.getFechaPrestamo());
        prestamo.setFechaDevolucion(prestamoRequest.getFechaDevolucion());
        prestamo.setLibro(libro);
        prestamo.setUsuario(prestamoRequest.getUsuario());
        prestamo.setEstado(EstadoPrestamo.Activo);

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

    public List<Prestamo> listarPrestamosActivos() {
        return prestamoRepository.findByEstado(Prestamo.EstadoPrestamo.Activo);
    }


    // Devolver un libro prestado
    public Optional<Prestamo> devolverLibro(int id) {
        Optional<Prestamo> prestamoOptional = prestamoRepository.findById(id);
        if (prestamoOptional.isPresent()) {
            Prestamo prestamo = prestamoOptional.get();
            prestamo.setEstado(EstadoPrestamo.Devuelto); // Cambiar el estado del préstamo a "Devuelto"
            return Optional.of(prestamoRepository.save(prestamo)); // Guardamos el préstamo con el nuevo estado
        }
        return Optional.empty(); // Si no existe el préstamo, retornamos Optional vacío
    }
}
