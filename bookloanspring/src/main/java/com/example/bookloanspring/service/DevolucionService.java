package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Devolucion;
import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.repository.DevolucionRepository;
import com.example.bookloanspring.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DevolucionService {

    @Autowired
    private DevolucionRepository devolucionRepository;

    @Autowired
    private PrestamoRepository prestamoRepository;

    public Devolucion registrarDevolucion(int idPrestamo) {
        Prestamo prestamo = prestamoRepository.findById(idPrestamo)
                .orElseThrow(() -> new IllegalArgumentException("Préstamo no encontrado"));

        if (prestamo.getEstado() == Prestamo.EstadoPrestamo.Devuelto) {
            throw new IllegalStateException("Este préstamo ya ha sido devuelto.");
        }

        // Cambiar estado del préstamo
        prestamo.setEstado(Prestamo.EstadoPrestamo.Devuelto);
        prestamoRepository.save(prestamo);

        // Actualizar el estado del libro a 'Disponible'
        Libro libro = prestamo.getLibro();
        libro.setEstado(Libro.EstadoLibro.Disponible);

        // Registrar devolución
        Devolucion devolucion = new Devolucion(new Date(), prestamo);
        return devolucionRepository.save(devolucion);
    }

}
