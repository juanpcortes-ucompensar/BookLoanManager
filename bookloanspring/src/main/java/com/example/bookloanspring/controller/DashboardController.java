package com.example.bookloanspring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.model.Prestamo.EstadoPrestamo;
import com.example.bookloanspring.model.Libro.EstadoLibro;
import com.example.bookloanspring.repository.LibroRepository;
import com.example.bookloanspring.repository.PrestamoRepository;
import com.example.bookloanspring.repository.ReservaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
@Autowired
    private LibroRepository libroRepository;

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping("/resumen")
    public ResponseEntity<List<Map<String, Object>>> getResumen() {
        List<Map<String, Object>> resumen = new ArrayList<>();

        long librosDisponibles = libroRepository.countByEstado(EstadoLibro.Disponible);
        long prestamosActivos = prestamoRepository.countByEstado(EstadoPrestamo.Activo);
        long reservasPendientes = reservaRepository.countByEstado("Activa");

        long librosVencidosHoy = prestamoRepository.countVencidosAntesDeHoy(EstadoPrestamo.Activo);

        resumen.add(Map.of("label", "📚 Libros disponibles", "value", librosDisponibles));
        resumen.add(Map.of("label", "🔄 Préstamos activos", "value", prestamosActivos));
        resumen.add(Map.of("label", "⏰ Reservas pendientes", "value", reservasPendientes));
        resumen.add(Map.of("label", "🚨 Libros vencidos hoy", "value", librosVencidosHoy));

        return ResponseEntity.ok(resumen);
    }

    @GetMapping("/vencimientos")
    public ResponseEntity<List<Map<String, Object>>> getVencimientos() {
        Pageable top3 = PageRequest.of(0, 3);
        Page<Prestamo> proximos = prestamoRepository.findProximosVencimientos(EstadoPrestamo.Activo, top3);

        List<Map<String, Object>> vencimientos = proximos.stream().map(prestamo -> {
            long diasRestantes = ChronoUnit.DAYS.between(
                LocalDate.now(),
                prestamo.getFechaDevolucion().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
            );

            Map<String, Object> map = new HashMap<>();
            map.put("libro", prestamo.getLibro().getTitulo());
            map.put("usuario", prestamo.getUsuario().getNombre());
            map.put("diasRestantes", diasRestantes);
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(vencimientos);
    }


    @GetMapping("/actividad")
    public ResponseEntity<List<String>> getActividad() {
        List<String> actividad = new ArrayList<>();
        actividad.add("Maria devolvió \"Sapiens\"");
        actividad.add("Juan reservó \"Cien años de soledad\"");
        actividad.add("Lucía solicitó préstamo de \"El Alquimista\"");
        return ResponseEntity.ok(actividad);
    }
}

