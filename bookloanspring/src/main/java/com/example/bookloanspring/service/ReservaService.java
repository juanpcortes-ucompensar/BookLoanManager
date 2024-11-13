package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Reserva;
import com.example.bookloanspring.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    // Método para obtener todas las reservas
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    // Método para obtener una reserva por ID
    public Optional<Reserva> getReservaById(Long id) {
        return reservaRepository.findById(id);
    }

    // Método para crear una nueva reserva
    public Reserva createReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    // Método para cancelar una reserva (simulando la cancelación)
    public boolean cancelReserva(Long id) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        if (reservaOptional.isPresent()) {
            Reserva reserva = reservaOptional.get();
            reserva.setEstado("Cancelada");
            reservaRepository.save(reserva);  // Actualizamos el estado
            return true;
        }
        return false;
    }
}
