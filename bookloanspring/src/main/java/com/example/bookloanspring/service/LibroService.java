package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.model.Libro.EstadoLibro;
import com.example.bookloanspring.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    // Método para obtener todos los libros
    public List<Libro> getAllLibros() {
        return libroRepository.findAll();
    }

    // Método para buscar libros con filtros
    public List<Map<String, Object>> searchLibros(String titulo, String usuarioPrestante, String autor,
        Long categoriaId, String estadoStr  ,
        Date fechaPrestamoInicio, Date fechaPrestamoFin, Long idLibro) {

        Libro.EstadoLibro estado = null;
        if (estadoStr != null && !estadoStr.isEmpty() && !estadoStr.equalsIgnoreCase("Todos")) {
            estado = Libro.EstadoLibro.valueOf(estadoStr);
        }

        List<Object[]> results = libroRepository.searchLibros(titulo, usuarioPrestante, autor,
                categoriaId, estado, fechaPrestamoInicio, fechaPrestamoFin, idLibro);

        List<Map<String, Object>> librosConInfo = new ArrayList<>();

        for (Object[] result : results) {
            Libro libro = (Libro) result[0];
            EstadoLibro libroEstado = libro.getEstado();

            Map<String, Object> libroMap = new HashMap<>();
            libroMap.put("idLibro", libro.getIdLibro());
            libroMap.put("titulo", libro.getTitulo());
            libroMap.put("autor", libro.getAutor());
            libroMap.put("estado", libroEstado);
            libroMap.put("categoria", result[5]);

            String nombreUsuario = (String) result[1];
            Date fechaPrestamo = (Date) result[2];

            libroMap.put("nombreUsuario", nombreUsuario != null ? nombreUsuario : "-");
            libroMap.put("fechaPrestamo", fechaPrestamo != null ? fechaPrestamo.toString().substring(0, 10) : "-");

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
        List<Libro> libros = null;
        if (idCategoria == null) {
            libros = libroRepository.findAll(); 
        } else {
            libros = libroRepository.findByCategoriaIdCategoria(idCategoria); 
        }
        return libros; 
    }

    public Optional<Libro> actualizarLibro(int id, Libro libro) {
        Optional<Libro> libroExistente = libroRepository.findById((long) id);
        if (libroExistente.isPresent()) {
            Libro libroActualizado = libroExistente.get();
            libroActualizado.setTitulo(libro.getTitulo());
            libroActualizado.setAutor(libro.getAutor());
            libroActualizado.setEstado(libro.getEstado());
            libroActualizado.setCategoria(libro.getCategoria());
            return Optional.of(libroRepository.save(libroActualizado));
        }
        return Optional.empty();
    }

    public boolean eliminarLibro(int id) {
        Optional<Libro> libroExistente = libroRepository.findById((long) id);
        if (libroExistente.isPresent()) {
            libroRepository.delete(libroExistente.get());
            return true;
        }
        return false;
    }

}
