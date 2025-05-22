package com.example.bookloanspring.repository;

import com.example.bookloanspring.model.Libro;
import com.example.bookloanspring.model.Libro.EstadoLibro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, Long> {

    // Método para obtener libros por categoría
    List<Libro> findByCategoriaIdCategoria(Long idCategoria);

    // Búsqueda dinámica de libros con filtros
    @Query("SELECT l, " +
       "       CASE WHEN l.estado = 'Prestado' THEN up.nombre ELSE '-' END, " +
       "       CASE WHEN l.estado = 'Prestado' THEN p.fechaPrestamo ELSE NULL END, " +
       "       CASE WHEN l.estado = 'Reservado' THEN ur.nombre ELSE '-' END, " +
       "       CASE WHEN l.estado = 'Reservado' THEN r.fechaReserva ELSE NULL END, " +
       "       c.nombre " +
       "FROM Libro l " +
       "LEFT JOIN l.prestamos p ON p.estado = 'Activo' " +
       "LEFT JOIN p.usuario up " +
       "LEFT JOIN l.reservas r ON r.estado = 'Activa' " +
       "LEFT JOIN r.usuario ur " +
       "LEFT JOIN l.categoria c " +
       "WHERE (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) " +
       "AND (:usuarioPrestante IS NULL OR LOWER(up.nombre) LIKE LOWER(CONCAT('%', :usuarioPrestante, '%'))) " +
       "AND (:autor IS NULL OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :autor, '%'))) " +
       "AND (:categoriaId IS NULL OR c.idCategoria = :categoriaId) " +
       "AND (:estado IS NULL OR l.estado = :estado) " +
       "AND (:fechaPrestamoInicio IS NULL OR p.fechaPrestamo >= :fechaPrestamoInicio) " +
       "AND (:fechaPrestamoFin IS NULL OR p.fechaPrestamo <= :fechaPrestamoFin) " +
       "AND (:idLibro IS NULL OR l.idLibro = :idLibro)")
    List<Object[]> searchLibros(
            @Param("titulo") String titulo,
            @Param("usuarioPrestante") String usuarioPrestante,
            @Param("autor") String autor,
            @Param("categoriaId") Long categoriaId,
            @Param("estado") EstadoLibro estado,
            @Param("fechaPrestamoInicio") Date fechaPrestamoInicio,
            @Param("fechaPrestamoFin") Date fechaPrestamoFin,
            @Param("idLibro") Long idLibro
    );



    long countByEstado(EstadoLibro estado);


}
