package com.example.bookloanspring.controller;

import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<?> realizarPrestamo(@RequestBody Prestamo request) {
        try {
            Prestamo nuevoPrestamo = prestamoService.realizarPrestamo(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPrestamo.getIdPrestamo());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Obtener un préstamo por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Prestamo> obtenerPrestamo(@PathVariable int id) {
        // Buscar el préstamo usando el servicio, que devuelve Optional
        Optional<Prestamo> prestamo = prestamoService.consultarPrestamo(id);
        return prestamo.map(p -> new ResponseEntity<>(p, HttpStatus.OK)) // Si lo encuentra, devuelve 200 OK
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Si no lo encuentra, devuelve 404 NOT FOUND
    }

    // Devolver un libro prestado
    @PutMapping("/{id}/devolver")
    public ResponseEntity<Prestamo> devolverLibro(@PathVariable int id) {
        // Intentamos devolver el libro
        Optional<Prestamo> prestamoDevuelto = prestamoService.devolverLibro(id);
        return prestamoDevuelto.map(p -> new ResponseEntity<>(p, HttpStatus.OK)) // Si el libro fue devuelto, 200 OK
                               .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Si no se encuentra, 404 NOT FOUND
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Prestamo>> listarPrestamosActivos() {
        List<Prestamo> prestamos = prestamoService.listarPrestamosActivos();
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

}
