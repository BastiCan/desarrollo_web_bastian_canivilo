document.addEventListener("DOMContentLoaded", () => {
    const btnInicio = document.getElementById("submit-btn");
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            window.location.href = "/inicio";
        });
    }

    // Carga de datos asíncrona mediante fetch
    fetch("/api/estadisticas")
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener estadísticas");
            return response.json();
        })
        .then(data => {
            renderizarGraficoDias(data.grafico_dias);
            renderizarGraficoTipos(data.grafico_tipos);
            renderizarGraficoVoluntarios(data.grafico_voluntarios);
        })
        .catch(err => console.error("Error al cargar gráficos:", err));
});

//Gráfico de Líneas: Avistamientos por Día
function renderizarGraficoDias(datos) {
    const ctx = document.getElementById('graficoDias');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datos.labels.length ? datos.labels : ['Sin datos'],
            datasets: [{
                label: 'Avistamientos Registrados',
                data: datos.data.length ? datos.data : [0],
                borderColor: '#57e491',
                backgroundColor: 'rgba(87, 228, 145, 0.2)',
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { color: 'white' } },
                y: { ticks: { color: 'white', stepSize: 1 }, beginAtZero: true }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

//Gráfico de Torta: Total de Avistamientos por Tipo de Ave
function renderizarGraficoTipos(datos) {
    const ctx = document.getElementById('graficoTipos');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: datos.labels.length ? datos.labels : ['Sin datos'],
            datasets: [{
                data: datos.data.length ? datos.data : [1],
                backgroundColor: ['#57e491', '#10441b', '#3b7a3b', '#85ffa5', '#2a5a2a', '#a3ffbe']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

//Gráfico de Barras: Voluntarios Registrados por Comuna
function renderizarGraficoVoluntarios(datos) {
    const ctx = document.getElementById('graficoVoluntarios');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels.length ? datos.labels : ['Sin datos'],
            datasets: [{
                label: 'Total Voluntarios',
                data: datos.data.length ? datos.data : [0],
                backgroundColor: '#57e491'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { color: 'white' } },
                y: { ticks: { color: 'white', stepSize: 1 }, beginAtZero: true }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}