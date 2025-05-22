package com.example.bookloanspring.model;

import com.example.bookloanspring.model.Usuario.Rol;

public class LoginResponse {
    private String email;
    private String nombre;
    private Rol rol;
    private String token;

    public LoginResponse(String email, String nombre, Rol rol, String token) {
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol){
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token){
        this.token = token;
    }
}
