package com.tarea4.tarea4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller 
public class VistaController {
    @GetMapping({"/", "/buscador"})
    public String mostrarBuscador() {
        return "buscador";
    }
}
