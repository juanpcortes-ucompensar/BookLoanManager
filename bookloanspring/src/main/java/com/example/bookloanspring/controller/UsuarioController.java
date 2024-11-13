package com.example.bookloanspring.controller;

import com.example.bookloanspring.model.Usuario;
import com.example.bookloanspring.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
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

    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
        return usuarioActualizado.map(u -> new ResponseEntity<>(u, HttpStatus.OK)) // Si el usuario fue actualizado, devuelve OK
                                 .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Si no se encuentra el usuario, devuelve NOT FOUND
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable int id) {
        boolean eliminado = usuarioService.eliminarUsuario(id);
        return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) // Si se eliminó, devuelve 204 No Content
                         : new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el usuario, devuelve 404 Not Found
    }
}
