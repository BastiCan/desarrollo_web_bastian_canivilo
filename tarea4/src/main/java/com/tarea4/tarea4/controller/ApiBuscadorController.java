package com.tarea4.tarea4.controller;

import com.tarea4.tarea4.dto.AvistamientoBusquedaDT0;
import com.tarea4.tarea4.dto.NotaRequestDT0;
import com.tarea4.tarea4.model.Avistamiento;
import com.tarea4.tarea4.model.Nota;
import com.tarea4.tarea4.repository.AvistamientoRepository;
import com.tarea4.tarea4.repository.NotaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController 
@RequestMapping("/api/avistamientos")
public class ApiBuscadorController {
    private final AvistamientoRepository avistamientoRepository;
    private final NotaRepository notaRepository;

    public ApiBuscadorController(AvistamientoRepository avistamientoRepository, NotaRepository notaRepository) {
        this.avistamientoRepository = avistamientoRepository;
        this.notaRepository = notaRepository;
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<AvistamientoBusquedaDT0>> buscar(@RequestParam(name = "q", defaultValue = "") String q) {
        String patron = q.trim();
        if (patron.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<Avistamiento> resultados = avistamientoRepository.buscarPorPatron(patron);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<AvistamientoBusquedaDT0> respuesta = new ArrayList<>();

        for (Avistamiento a : resultados) {
            Double promedio = notaRepository.obtenerPromedioPorAvistamiento(a.getId());
            String notaTexto = (promedio == null) ? "-" : String.format(Locale.US, "%.1f", promedio);
            respuesta.add(new AvistamientoBusquedaDT0(
                a.getId(),
                a.getVoluntario().getNombre().trim(), 
                a.getFechaHora() != null ? a.getFechaHora().format(fmt) : "", 
                a.getAve().getNombre().trim(), 
                a.getVoluntario().getComuna().getNombre().trim(), 
                notaTexto
            ));
        }

        return ResponseEntity.ok(respuesta); 
    }

    @PostMapping("/{id}/notas")
    public ResponseEntity<?> agregarNota(@PathVariable("id") Integer id, @RequestBody NotaRequestDT0 body) {
        Map<String, Object> res = new HashMap<>();

        if (body == null || body.getNota() == null || body.getNota() < 1 || body.getNota() > 7) {
            res.put("success", false);
            res.put("error", "La nota debe ser un número entero entre 1 y 7");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }

        Optional<Avistamiento> avistamientoOpt = avistamientoRepository.findById(id);
        if (avistamientoOpt.isEmpty()) {
            res.put("success", false);
            res.put("error", "El avistamiento no existe");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

        Nota nuevaNota = new Nota();
        nuevaNota.setAvistamiento(avistamientoOpt.get());
        nuevaNota.setNota(body.getNota());
        notaRepository.save(nuevaNota);

        Double nuevoPromedio = notaRepository.obtenerPromedioPorAvistamiento(id);
        String promedioFormateado = (nuevoPromedio == null) ? "-" : String.format(Locale.US, "%.1f", nuevoPromedio);

        res.put("success", true);
        res.put("notaPromedio", promedioFormateado);
        return ResponseEntity.ok(res);
    }
}
