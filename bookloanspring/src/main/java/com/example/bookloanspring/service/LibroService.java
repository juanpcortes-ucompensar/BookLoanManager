package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Categoria;
import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.model.Usuario;
import com.example.bookloanspring.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LibroService {

    private static final Logger logger = LoggerFactory.getLogger(LibroService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private LibroRepository libroRepository;

    // Método para obtener todos los libros
    public List<Libro> getAllLibros() {
        return libroRepository.findAll();
    }

    // Método para buscar libros con filtros
    public List<Map<String, Object>> searchLibros(String titulo, String usuarioPrestante, String autor,
            Long categoriaId, String estado,
            Date fechaPrestamoInicio, Date fechaPrestamoFin, Long idLibro) {

        List<Object[]> results = libroRepository.searchLibros(titulo, usuarioPrestante, autor,
                categoriaId, estado, fechaPrestamoInicio,
                fechaPrestamoFin, idLibro);

        List<Map<String, Object>> librosConInfo = new ArrayList<>();
        for (Object[] result : results) {
            Libro libro = (Libro) result[0]; // Primer objeto es el libro
            Usuario usuario = (Usuario) result[1]; // Segundo objeto es el usuario
            Prestamo prestamo = (Prestamo) result[2]; // Segundo objeto es el usuario

            // Crear un mapa con la información del libro y los datos adicionales
            Map<String, Object> libroMap = new HashMap<>();
            libroMap.put("idLibro", libro.getIdLibro());
            libroMap.put("titulo", libro.getTitulo());
            libroMap.put("autor", libro.getAutor());
            libroMap.put("estado", libro.getEstado());
            libroMap.put("categoria", result[3]);

            // Información adicional
            libroMap.put("nombreUsuario", usuario != null ? usuario.getNombre() : "-");
            libroMap.put("fechaPrestamo", prestamo != null ? prestamo.getFechaPrestamo() : "-");
            
            librosConInfo.add(libroMap);
        }

        return librosConInfo;
    }

    // Método para obtener un libro por ID
    public Optional<Libro> getLibroById(Long id) {
        return libroRepository.findById(id);
    }

    // Método para agregar un libro
    public Libro createLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    // Método para obtener libros por categoría
    public List<Libro> getLibrosByCategoria(Long idCategoria) {
        return libroRepository.findByCategoriaIdCategoria(idCategoria); // Usamos una consulta personalizada
    }

}
