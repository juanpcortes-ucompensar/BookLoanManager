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
        String sql = new String(Files.readAllBytes(Paths.get("src/main/resources/datasss.sql")));
        jdbcTemplate.execute(sql);
    }
}
