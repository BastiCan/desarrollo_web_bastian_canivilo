//Variables para controlar las páginas
let paginaActual = 1;
const registrosPorPagina = 5;

const cargaLista = () => {
    const container = document.getElementById("list-avistamientos");
    container.innerHTML = "";
    
    bdAvistamientos.forEach(item => {
        const fila = document.createElement("div");
        fila.className = "fila-registro";
        fila.innerHTML = `
            <div class="tipo-dato"> ${item.tipo}</div>
            <div class="nombre-dato"> ${item.nombre}</div>
            <div class="lugar-dato"> ${item.lugar}</div>
            <div class="fecha-dato"> ${item.fecha}</div>
            <div class="hora-dato"> ${item.hora}</div>
        `;
        container.appendChild(fila);
    });
};

const actualizarVista = () => {
    const campo = document.getElementById("filtro-campo").value;
    const orden = document.getElementById("filtro-orden").value;
    const tipo = document.getElementById("filtro-tipo").value;

    let datosProcesados = [...bdAvistamientos];

    if (tipo !== "todos") {
        datosProcesados = datosProcesados.filter(item => item.tipo === tipo);
    }

    datosProcesados.sort((a, b) => {
        let valorA = a[campo];
        let valorB = b[campo];

        if (campo === "fecha") {
            const [diaA, mesA, anoA] = valorA.split("/");
            const [diaB, mesB, anoB] = valorB.split("/");
            valorA = new Date(`${anoA}-${mesA}-${diaA}`);
            valorB = new Date(`${anoB}-${mesB}-${diaB}`);
            return orden === "asc" ? valorA - valorB : valorB - valorA;
        }
        return orden === "asc" ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
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
            <div class="tipo-dato">${item.tipo}</div>
            <div class="nombre-dato">${item.nombre}</div>
            <div class="lugar-dato">${item.lugar}</div>
            <div class="fecha-dato">${item.fecha}</div>
            <div class="hora-dato">${item.hora}</div>
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
pressButton.addEventListener("click", function() {
    window.location.href = "/inicio";
});

window.onload = () => {
    actualizarVista();
};