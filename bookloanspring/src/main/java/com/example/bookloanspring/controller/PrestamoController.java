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

    // Realizar un nuevo préstamo
    @PostMapping
    public ResponseEntity<Prestamo> realizarPrestamo(@RequestBody Prestamo prestamo) {
        Prestamo nuevoPrestamo = prestamoService.realizarPrestamo(prestamo);
        return new ResponseEntity<>(nuevoPrestamo, HttpStatus.CREATED);
    }

    // Obtener todos los préstamos
    @GetMapping
    public ResponseEntity<List<Prestamo>> listarPrestamos() {
        List<Prestamo> prestamos = prestamoService.listarPrestamos();
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
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
}
