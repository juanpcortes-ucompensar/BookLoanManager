package com.example.bookloanspring.controller;

import com.example.bookloanspring.model.LoginRequest;
import com.example.bookloanspring.model.LoginResponse;
import com.example.bookloanspring.model.Usuario;
import com.example.bookloanspring.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") 
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    
    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    // Obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.consultarUsuario(id);
        return usuario.map(u -> new ResponseEntity<>(u, HttpStatus.OK)) // Si el usuario existe, devuelve OK
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Si no existe, devuelve NOT FOUND
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(usuario);
            System.out.println("Usuario recibido (JSON): " + json);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Optional<Usuario> usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
        return usuarioActualizado.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable int id) {
        boolean eliminado = usuarioService.eliminarUsuario(id);
        return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) // Si se eliminó, devuelve 204 No Content
                         : new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el usuario, devuelve 404 Not Found
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.validarLogin(loginRequest.getEmail(), loginRequest.getContrasena());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // En producción se usará un token JWT o similar
            String token = "fake-token";

            // Crear el objeto de respuesta
            LoginResponse response = new LoginResponse(
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol(),
                token
            );

            return ResponseEntity.ok(response);
        } else {
            // Credenciales inválidas
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña inválidos");
        }
    }
}
