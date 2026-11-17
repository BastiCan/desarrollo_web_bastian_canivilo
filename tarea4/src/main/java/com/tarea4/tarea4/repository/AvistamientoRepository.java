package com.tarea4.tarea4.repository;

import com.tarea4.tarea4.model.Avistamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AvistamientoRepository extends JpaRepository<Avistamiento, Integer> {
    @Query("""
        SELECT a FROM Avistamiento a
        JOIN FETCH a.ave ave
        JOIN FETCH a.voluntario vol
        JOIN FETCH vol.comuna com
        WHERE LOWER(ave.nombre) LIKE LOWER(CONCAT('%', :q, '%'))
            OR LOWER(vol.nombre) LIKE LOWER(CONCAT('%', :q, '%'))
            OR LOWER(com.nombre) LIKE LOWER(CONCAT('%', :q, '%'))
        ORDER BY a.fechaHora DESC
    """)
    List<Avistamiento> buscarPorPatron(@Param("q") String q);
}
