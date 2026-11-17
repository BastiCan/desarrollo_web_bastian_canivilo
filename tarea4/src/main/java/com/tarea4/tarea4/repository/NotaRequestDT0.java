package com.tarea4.tarea4.repository;

import com.tarea4.tarea4.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotaRequestDT0 extends JpaRepository<Nota, Integer> {
    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.avistamiento.id = :avistamientoId")
    Double obtenerPromedioPorAvistamiento(@Param("avistamientoId") Integer avistamientoId);
}
