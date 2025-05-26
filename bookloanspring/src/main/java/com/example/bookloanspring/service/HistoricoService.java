package com.example.bookloanspring.service;

import com.example.bookloanspring.dto.HistoricoEventoDTO;
import com.example.bookloanspring.model.Devolucion;
import com.example.bookloanspring.model.Prestamo;
import com.example.bookloanspring.repository.DevolucionRepository;
import com.example.bookloanspring.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HistoricoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private DevolucionRepository devolucionRepository;

    public List<HistoricoEventoDTO> obtenerHistoricoCompleto() {
        List<HistoricoEventoDTO> eventos = new ArrayList<>();

        // Eventos de préstamos
        for (Prestamo p : prestamoRepository.findAll()) {
            eventos.add(new HistoricoEventoDTO(
                    "Préstamo",
                    p.getFechaPrestamo(),
                    p.getUsuario().getNombre(),
                    p.getLibro().getTitulo()
            ));
        }

        // Eventos de devoluciones
        for (Devolucion d : devolucionRepository.findAll()) {
            eventos.add(new HistoricoEventoDTO(
                    "Devolución",
                    d.getFechaDevolucion(),
                    d.getPrestamo().getUsuario().getNombre(),
                    d.getPrestamo().getLibro().getTitulo()
            ));
        }

        // Ordenar cronológicamente (más recientes al final)
        return eventos.stream()
                .sorted(Comparator.comparing(HistoricoEventoDTO::getFecha))
                .collect(Collectors.toList());
    }
}
