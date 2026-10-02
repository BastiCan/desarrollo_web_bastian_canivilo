document.addEventListener("DOMContentLoaded", () => {
    const btnInicio = document.getElementById("submit-btn");
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            window.location.href = "/inicio";
        });
    }
    
    // 1. Gráfico: Avistamientos por Tipo
    const ctxTipos = document.getElementById('graficoTipos');
    if (ctxTipos) {
        new Chart(ctxTipos, {
            type: 'doughnut',
            data: {
                labels: ['Ave marina', 'Ave rapaz', 'Ave acuática', 'Paseriforme'],
                datasets: [{
                    data: [12, 19, 7, 15],
                    backgroundColor: ['#57e491', '#10441b', '#2a5a2a', '#85ffa5']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: 'white' } } }
            }
        });
    }

    // 2. Gráfico: Top Lugares
    const ctxLugares = document.getElementById('graficoLugares');
    if (ctxLugares) {
        new Chart(ctxLugares, {
            type: 'bar',
            data: {
                labels: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena'],
                datasets: [{
                    label: 'Avistamientos',
                    data: [25, 18, 12, 9],
                    backgroundColor: '#57e491'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { ticks: { color: 'white' } },
                    y: { ticks: { color: 'white' } }
                },
                plugins: { legend: { labels: { color: 'white' } } }
            }
        });
    }

    // 3. Gráfico: Voluntarios por Región
    const ctxVoluntarios = document.getElementById('graficoVoluntarios');
    if (ctxVoluntarios) {
        new Chart(ctxVoluntarios, {
            type: 'pie',
            data: {
                labels: ['Metropolitana', 'Valparaíso', 'Biobío', 'Coquimbo'],
                datasets: [{
                    data: [40, 20, 15, 10],
                    backgroundColor: ['#57e491', '#10441b', '#3b7a3b', '#85ffa5']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: 'white' } } }
            }
        });
    }

    // 4. Gráfico: Avistamientos por Mes
    const ctxMeses = document.getElementById('graficoMeses');
    if (ctxMeses) {
        new Chart(ctxMeses, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Avistamientos',
                    data: [5, 12, 18, 14, 22, 30],
                    borderColor: '#57e491',
                    backgroundColor: 'rgba(87, 228, 145, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { ticks: { color: 'white' } },
                    y: { ticks: { color: 'white' } }
                },
                plugins: { legend: { labels: { color: 'white' } } }
            }
        });
    }
});