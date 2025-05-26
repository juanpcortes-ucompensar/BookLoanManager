package com.example.bookloanspring.controller;

import com.example.bookloanspring.dto.HistoricoEventoDTO;
import com.example.bookloanspring.service.HistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historico")
@CrossOrigin(origins = "*")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    @GetMapping
    public List<HistoricoEventoDTO> obtenerHistorico() {
        return historicoService.obtenerHistoricoCompleto();
    }
}

