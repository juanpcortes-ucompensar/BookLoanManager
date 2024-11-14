package com.example.bookloanspring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class DataLoaderService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void loadData() throws Exception {
        // Lee el archivo SQL desde recursos o alguna ruta
        String sql = new String(Files.readAllBytes(Paths.get("src/main/resources/datasss.sql")));

        // Ejecuta el script SQL
        jdbcTemplate.execute(sql);
    }
}
