package com.example.bookloanspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.example.bookloanspring.repository")
@EntityScan(basePackages = "com.example.bookloanspring.model")
@SpringBootApplication
public class BookLoanManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookLoanManagerApplication.class, args);
	}

}
