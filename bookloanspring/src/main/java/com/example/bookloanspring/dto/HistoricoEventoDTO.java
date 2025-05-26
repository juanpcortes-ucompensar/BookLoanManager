package com.example.bookloanspring.dto;

import java.util.Date;

public class HistoricoEventoDTO {
    private String tipo; // "Préstamo" o "Devolución"
    private Date fecha;
    private String usuario;
    private String libro;

    public HistoricoEventoDTO(String tipo, Date fecha, String usuario, String libro) {
        this.tipo = tipo;
        this.fecha = fecha;
        this.usuario = usuario;
        this.libro = libro;
    }

    // Getters y setters
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getLibro() {
        return libro;
    }

    public void setLibro(String libro) {
        this.libro = libro;
    }


}
