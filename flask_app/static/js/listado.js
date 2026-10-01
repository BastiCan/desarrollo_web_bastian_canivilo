let paginaActual = 1;
const registrosPorPagina = 5;

const actualizarVista = () => {
    const campo = document.getElementById("filtro-campo").value;
    const orden = document.getElementById("filtro-orden").value;
    const tipo = document.getElementById("filtro-tipo").value;

    let datosProcesados = Array.isArray(bdAvistamientos) ? [...bdAvistamientos] : [];

    if (tipo !== "todos") {
        datosProcesados = datosProcesados.filter(item => item.tipo === tipo || item.ave_tipo === tipo);
    }

    datosProcesados.sort((a, b) => {
        let valorA = a[campo] || "";
        let valorB = b[campo] || "";

        if (campo === "fecha_hora") {
            valorA = new Date(valorA);
            valorB = new Date(valorB);
            return orden === "asc" ? valorA - valorB : valorB - valorA;
        }

        return orden === "asc" 
            ? String(valorA).localeCompare(String(valorB)) 
            : String(valorB).localeCompare(String(valorA));
    });

    const totalPaginas = Math.ceil(datosProcesados.length / registrosPorPagina) || 1;
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const datosPaginados = datosProcesados.slice(inicio, fin);

    const container = document.getElementById("list-avistamientos");
    container.innerHTML = "";
    
    datosPaginados.forEach(item => {
        const fila = document.createElement("div");
        fila.className = "fila-registro";
        fila.innerHTML = `
            <div class="nombre-dato">${item.nombre || item.ave || '-'}</div>
            <div class="lugar-dato">${item.lugar || '-'}</div>
            <div class="fecha-dato">${item.fecha_hora || item.fecha || '-'}</div>
            <div class="descripcion-dato">${item.descripcion || '-'}</div>
        `;
        container.appendChild(fila);
    });

    document.getElementById("indicador-pagina").innerText = `Página ${paginaActual} de ${totalPaginas}`;
    document.getElementById("btn-anterior").disabled = (paginaActual === 1);
    document.getElementById("btn-siguiente").disabled = (paginaActual === totalPaginas);
};

document.getElementById("filtro-campo").addEventListener("change", actualizarVista);
document.getElementById("filtro-orden").addEventListener("change", actualizarVista);
document.getElementById("filtro-tipo").addEventListener("change", () => {
    paginaActual = 1; 
    actualizarVista();
});

document.getElementById("btn-anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        actualizarVista();
    }
});

document.getElementById("btn-siguiente").addEventListener("click", () => {
    paginaActual++;
    actualizarVista();
});

const pressButton = document.getElementById("submit-btn");
if (pressButton) {
    pressButton.addEventListener("click", function() {
        window.location.href = "/inicio";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarVista();
});