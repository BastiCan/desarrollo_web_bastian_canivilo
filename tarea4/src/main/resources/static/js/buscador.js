let avistamientoSeleccionadoId = null;

document.addEventListener("DOMContentLoaded", () => {
    const formBusqueda = document.getElementById("form-busqueda");
    const inputBusqueda = document.getElementById("input-busqueda");
    const formEvaluar = document.getElementById("form-evaluar");
    const btnCancelarModal = document.getElementById("btn-cancelar-modal");

    formBusqueda.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    inputBusqueda.addEventListener("input", () => {
        const termino = inputBusqueda.value.trim();
        realizarBusqueda(termino);
    });

    btnCancelarModal.addEventListener("click", cerrarModal);

    formEvaluar.addEventListener("submit", (e) => {
        e.preventDefault();
        enviarEvaluacion();
    });
});

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function destacarCoincidencia(textoOriginal, patron) {
    const textoSeguro = escaparHTML(textoOriginal);
    if (!patron) return textoSeguro;

    const patronEscapadoRegex = patron.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patronSeguroHTML = escaparHTML(patronEscapadoRegex);
    const regex = new RegExp(`(${patronSeguroHTML})`, "gi");

    return textoSeguro.replace(regex, "<mark>$1</mark>");
}

function realizarBusqueda(termino) {
    const mensajeEstado = document.getElementById("mensaje-estado");
    const contenedorTabla = document.getElementById("contenedor-tabla");
    const tbody = document.getElementById("tbody-resultados");

    if (termino.length === 0) {
        contenedorTabla.hidden = true;
        tbody.innerHTML = "";
        mensajeEstado.textContent = "Ingresa caracteres para comenzar la búsqueda.";
        mensajeEstado.hidden = false;
        return;
    }

    fetch(`/api/avistamientos/buscar?q=${encodeURIComponent(termino)}`)
        .then((res) => {
            if (!res.ok) throw new Error("Error en la búsqueda");
            return res.json();
        })
        .then((resultados) => {
            tbody.innerHTML = "";

            if (!resultados || resultados.length === 0) {
                contenedorTabla.hidden = true;
                mensajeEstado.textContent = `No se encontraron avistamientos que coincidan con "${termino}".`;
                mensajeEstado.hidden = false;
                return;
            }

            mensajeEstado.hidden = true;
            contenedorTabla.hidden = false;

            resultados.forEach((item) => {
                const tr = document.createElement("tr");

                const tdVoluntario = document.createElement("td");
                tdVoluntario.innerHTML = destacarCoincidencia(item.voluntarioNombre, termino);

                const tdDia = document.createElement("td");
                tdDia.textContent = item.dia;

                const tdAve = document.createElement("td");
                tdAve.innerHTML = destacarCoincidencia(item.aveNombre, termino);

                const tdComuna = document.createElement("td");
                tdComuna.innerHTML = destacarCoincidencia(item.comunaNombre, termino);

                const tdNota = document.createElement("td");
                const spanNota = document.createElement("span");
                spanNota.id = `nota-avistamiento-${item.id}`;
                spanNota.className = "nota-badge";
                spanNota.textContent = item.nota;
                tdNota.appendChild(spanNota);

                const tdAccion = document.createElement("td");
                const btnEvaluar = document.createElement("button");
                btnEvaluar.type = "button";
                btnEvaluar.className = "btn-evaluar";
                btnEvaluar.textContent = "Evaluar";
                btnEvaluar.addEventListener("click", () => abrirModal(item));
                tdAccion.appendChild(btnEvaluar);

                tr.append(tdVoluntario, tdDia, tdAve, tdComuna, tdNota, tdAccion);
                tbody.appendChild(tr);
            });
        })
        .catch(() => {
            contenedorTabla.hidden = true;
            mensajeEstado.textContent = "Ocurrió un error al consultar los avistamientos.";
            mensajeEstado.hidden = false;
        });
}

function abrirModal(item) {
    avistamientoSeleccionadoId = item.id;

    const modal = document.getElementById("modal-evaluar");
    const detalle = document.getElementById("modal-detalle-avistamiento");
    const selectNota = document.getElementById("select-nota");
    const modalError = document.getElementById("modal-error");

    detalle.textContent = `Ave: ${item.aveNombre} | Voluntario: ${item.voluntarioNombre} (${item.comunaNombre})`;
    selectNota.value = "";
    modalError.hidden = true;
    modal.hidden = false;
}

function cerrarModal() {
    avistamientoSeleccionadoId = null;
    document.getElementById("modal-evaluar").hidden = true;
}

function enviarEvaluacion() {
    const selectNota = document.getElementById("select-nota");
    const modalError = document.getElementById("modal-error");
    const valorNota = Number(selectNota.value);

    if (!Number.isInteger(valorNota) || valorNota < 1 || valorNota > 7) {
        modalError.textContent = "Debes seleccionar una nota entera entre 1 y 7.";
        modalError.hidden = false;
        return;
    }

    fetch(`/api/avistamientos/${avistamientoSeleccionadoId}/notas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: valorNota })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                const celdaNota = document.getElementById(`nota-avistamiento-${avistamientoSeleccionadoId}`);
                if (celdaNota) {
                    celdaNota.textContent = data.notaPromedio;
                }
                cerrarModal();
            } else {
                modalError.textContent = data.error || "No se pudo guardar la nota.";
                modalError.hidden = false;
            }
        })
        .catch(() => {
            modalError.textContent = "Error de conexión con el servidor.";
            modalError.hidden = false;
        });
}