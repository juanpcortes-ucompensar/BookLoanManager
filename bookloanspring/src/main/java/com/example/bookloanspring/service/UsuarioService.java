package com.example.bookloanspring.service;

import com.example.bookloanspring.model.Usuario;
import com.example.bookloanspring.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registrar un nuevo usuario
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Obtener todos los usuarios
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // Consultar un usuario por su ID
    public Optional<Usuario> consultarUsuario(int id) {
        return usuarioRepository.findById(id);
    }

    // Actualizar un usuario
    public Optional<Usuario> actualizarUsuario(int id, Usuario usuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();
            // Actualiza los campos del usuario existente
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setDireccion(usuario.getDireccion());
            usuarioExistente.setTelefono(usuario.getTelefono());
            usuarioExistente.setRol(usuario.getRol());
            return Optional.of(usuarioRepository.save(usuarioExistente));
        }
        return Optional.empty();
    }

    // Eliminar un usuario
    public boolean eliminarUsuario(int id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Usuario> validarLogin(String email, String contrasena) {
        return usuarioRepository.findByEmailAndContrasena(email, contrasena);
    }
}
