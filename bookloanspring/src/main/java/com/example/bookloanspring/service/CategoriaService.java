package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Categoria;
import com.example.bookloanspring.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Crear una nueva categoría
    public Categoria agregarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Obtener todas las categorías
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    // Consultar una categoría por su ID
    public Optional<Categoria> consultarCategoria(Long idCategoria) {  // Cambiado de int a Long
        return categoriaRepository.findById(idCategoria); // Devuelve Optional
    }

    // Actualizar una categoría
    public Optional<Categoria> actualizarCategoria(Long idCategoria, Categoria categoria) {  // Cambiado de int a Long
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(idCategoria);
        
        if (categoriaExistente.isPresent()) {
            Categoria cat = categoriaExistente.get();
            cat.setNombre(categoria.getNombre()); // Asumiendo que quieres actualizar el nombre
            return Optional.of(categoriaRepository.save(cat)); // Guardar la categoría actualizada
        }
        
        return Optional.empty(); // Si no se encuentra la categoría, devolver Optional.empty()
    }

    // Eliminar una categoría
    public boolean eliminarCategoria(Long idCategoria) {  // Cambiado de int a Long
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(idCategoria);
        
        if (categoriaExistente.isPresent()) {
            categoriaRepository.delete(categoriaExistente.get());
            return true;
        }
        
        return false; // Si no se encuentra la categoría, devolver false
    }
}
