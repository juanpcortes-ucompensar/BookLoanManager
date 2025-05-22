package com.example.bookloanspring.controller;

import com.example.bookloanspring.model.Devolucion;
import com.example.bookloanspring.service.DevolucionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/devoluciones")
public class DevolucionController {

    @Autowired
    private DevolucionService devolucionService;

    @PostMapping("/{idPrestamo}")
    public ResponseEntity<?> registrarDevolucion(@PathVariable int idPrestamo) {
        try {
            // Intentamos registrar la devolución
            Devolucion devolucion = devolucionService.registrarDevolucion(idPrestamo);
            return ResponseEntity.ok(devolucion.getIdDevolucion());
        } catch (IllegalArgumentException e) {
            // Manejo de error si no se encuentra el préstamo
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Préstamo no encontrado");
        } catch (IllegalStateException e) {
            // Manejo de error si el préstamo no está activo
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
