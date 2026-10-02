let paginaActual = 1;
const elementosPorPagina = 5;

document.addEventListener("DOMContentLoaded", () => {
    renderizarTabla();

    const btnAnterior = document.getElementById("btn-anterior");
    const btnSiguiente = document.getElementById("btn-siguiente");

    if (btnAnterior) {
        btnAnterior.addEventListener("click", () => {
            if (paginaActual > 1) {
                paginaActual--;
                renderizarTabla();
            }
        });
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", () => {
            if ((paginaActual * elementosPorPagina) < bdAvistamientos.length) {
                paginaActual++;
                renderizarTabla();
            }
        });
    }

    const btnInicio = document.getElementById("submit-btn");
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            window.location.href = "/inicio";
        });
    }
});

//Función para renderizar filas por página
function renderizarTabla() {
    const contenedor = document.getElementById("list-avistamientos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const datosPagina = bdAvistamientos.slice(inicio, fin);

    if (datosPagina.length === 0) {
        contenedor.innerHTML = "<p style='padding: 15px; text-align: center;'>No hay avistamientos registrados.</p>";
        return;
    }

    datosPagina.forEach(a => {
        const fila = document.createElement("div");
        fila.className = "colums-title";
        fila.style.cursor = "pointer";
        fila.innerHTML = `
            <span>${a.ave_nombre || 'Ave'}</span>
            <span>${a.lugar}</span>
            <span>${a.fecha_hora}</span>
            <span>${a.descripcion}</span>
        `;
        
        fila.addEventListener("click", () => mostrarDetalle(a));
        contenedor.appendChild(fila);
    });

    const indicador = document.getElementById("indicador-pagina");
    if (indicador) indicador.textContent = `Página ${paginaActual}`;

    const btnAnterior = document.getElementById("btn-anterior");
    const btnSiguiente = document.getElementById("btn-siguiente");
    if (btnAnterior) btnAnterior.disabled = (paginaActual === 1);
    if (btnSiguiente) btnSiguiente.disabled = (fin >= bdAvistamientos.length);
}

//Función para abrir la ventana modal con detalles, fotos y videos
function mostrarDetalle(a) {
    let mediaHTML = "";
    
    if (a.registros && a.registros.length > 0) {
        a.registros.forEach(reg => {
            const ruta = `/static/${reg.ruta_archivo}`;
            if (reg.ruta_archivo.match(/\.(mp4|webm|ogg)$/i)) {
                mediaHTML += `<video src="${ruta}" controls style="max-width: 100%; max-height: 200px; margin: 5px;"></video>`;
            } else {
                mediaHTML += `<img src="${ruta}" alt="${reg.nombre_archivo}" style="max-width: 150px; max-height: 150px; object-fit: cover; margin: 5px; border-radius: 5px;">`;
            }
        });
    } else {
        mediaHTML = "<p>No hay archivos adjuntos.</p>";
    }

    let modal = document.getElementById("modal-detalle");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-detalle";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "10000";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 8px; max-width: 500px; width: 90%; max-height: 85vh; overflow-y: auto; text-align: left; color: #333;">
            <h2 style="margin-top: 0;">Detalle del Avistamiento</h2>
            <p><strong>Ave:</strong> ${a.ave_nombre || 'No especificada'}</p>
            <p><strong>Observador:</strong> ${a.voluntario_nombre || 'Anónimo'}</p>
            <p><strong>Lugar:</strong> ${a.lugar}</p>
            <p><strong>Fecha y Hora:</strong> ${a.fecha_hora}</p>
            <p><strong>Descripción:</strong> ${a.descripcion}</p>
            <hr>
            <h3>Fotos y Videos</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">${mediaHTML}</div>
            <br>
            <button id="btn-cerrar-modal" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
        </div>
    `;
    modal.style.display = "flex";

    document.getElementById("btn-cerrar-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });
}