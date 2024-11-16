package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, Long> {

    // Método para obtener libros por categoría
    List<Libro> findByCategoriaIdCategoria(Long idCategoria);

    // Búsqueda dinámica de libros con filtros
    @Query("SELECT l, u, p, c.nombre FROM Libro l " + // Seleccionamos el libro y el usuario
       "LEFT JOIN l.prestamos p " + 
       "LEFT JOIN p.usuario u " + 
       "LEFT JOIN l.categoria c " + // Unión explícita con la categoría
       "WHERE (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) " +
       "AND (:usuarioPrestante IS NULL OR LOWER(u.nombre) LIKE LOWER(CONCAT('%', :usuarioPrestante, '%'))) " +
       "AND (:autor IS NULL OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :autor, '%'))) " +
       "AND (:categoriaId IS NULL OR c.idCategoria = :categoriaId) " + // Usar c.idCategoria
       "AND (:estado IS NULL OR l.estado = :estado) " +
       "AND (:fechaPrestamoInicio IS NULL OR p.fechaPrestamo >= :fechaPrestamoInicio) " +
       "AND (:fechaPrestamoFin IS NULL OR p.fechaPrestamo <= :fechaPrestamoFin) " +
       "AND (:idLibro IS NULL OR l.idLibro = :idLibro)")
    List<Object[]> searchLibros(
            @Param("titulo") String titulo,
            @Param("usuarioPrestante") String usuarioPrestante,
            @Param("autor") String autor,
            @Param("categoriaId") Long categoriaId,
            @Param("estado") String estado,
            @Param("fechaPrestamoInicio") Date fechaPrestamoInicio,
            @Param("fechaPrestamoFin") Date fechaPrestamoFin,
            @Param("idLibro") Long idLibro
    );

}
