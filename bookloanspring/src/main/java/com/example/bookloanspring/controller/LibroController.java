package com.example.bookloanspring.controller;

import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.service.LibroService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:3000")
public class LibroController {

    @Autowired
    private LibroService libroService;

    // Método para obtener todos los libros (sin filtros)
    @GetMapping
    public ResponseEntity<List<Libro>> getAllLibros() {
        List<Libro> libros = libroService.getAllLibros();
        return ResponseEntity.ok(libros);
    }

    // Método para realizar la búsqueda con filtros
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchLibros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String usuarioPrestante,
            @RequestParam(required = false) String autor,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaPrestamoInicio,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaPrestamoFin,
            @RequestParam(required = false) Long idLibro) {

        // Busca los libros con los filtros aplicados
        List<Map<String, Object>> libros = libroService.searchLibros(
                titulo, usuarioPrestante, autor, categoriaId, estado, fechaPrestamoInicio, fechaPrestamoFin, idLibro);
        return ResponseEntity.ok(libros);
    }

    // Método para obtener un libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable Long id) {
        Optional<Libro> libro = libroService.getLibroById(id);
        return libro.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Método para agregar un libro
    @PostMapping
    public ResponseEntity<Libro> createLibro(@RequestBody Libro libro) {
        Libro nuevoLibro = libroService.createLibro(libro);
        return ResponseEntity.status(201).body(nuevoLibro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable int id, @RequestBody Libro libro) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(libro);
            System.out.println("Usuario recibido (JSON): " + json);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Optional<Libro> libroActualizado = libroService.actualizarLibro(id, libro);
        return libroActualizado.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar un libro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable int id) {
        boolean eliminado = libroService.eliminarLibro(id);
        return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) // Si se eliminó, devuelve 204 No Content
                         : new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el usuario, devuelve 404 Not Found
    }

    // Método para obtener libros por categoría
    @GetMapping("/categoria")
    public ResponseEntity<List<Libro>> getLibrosByCategoria(@RequestParam(required = false) Long idCategoria) {
        List<Libro> libros = libroService.getLibrosByCategoria(idCategoria);
        return libros.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(libros);
    }
}
