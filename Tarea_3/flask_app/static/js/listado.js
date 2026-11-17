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
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "10000";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: #1c4e17; border: 2px solid #57e491; padding: 25px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 85vh; overflow-y: auto; text-align: left; color: white;">
            <h2 style="margin-top: 0; color: #57e491;">Detalle del Avistamiento</h2>
            <p><strong>Ave:</strong> ${a.ave_nombre || 'No especificada'}</p>
            <p><strong>Observador:</strong> ${a.voluntario_nombre || 'Anónimo'}</p>
            <p><strong>Lugar:</strong> ${a.lugar}</p>
            <p><strong>Fecha y Hora:</strong> ${a.fecha_hora}</p>
            <p><strong>Descripción:</strong> ${a.descripcion}</p>
            <hr style="border-color: #57e491;">
            <h3 style="color: #57e491;">Fotos y Videos</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">${mediaHTML}</div>
            
            <hr style="border-color: #57e491; margin-top: 20px;">
            <h3 style="color: #57e491;">Comentarios</h3>
            
            <!-- Listado de Comentarios del Avistamiento -->
            <div id="lista-comentarios" style="margin-bottom: 20px; background: #2a5a2a; padding: 10px; border-radius: 5px;">
                <p>Cargando comentarios...</p>
            </div>

            <!-- Formulario para Agregar Comentario -->
            <div style="background: #2a5a2a; padding: 15px; border-radius: 5px;">
                <h4 style="margin-top: 0; color: #57e491;">Agregar Comentario</h4>
                <div id="comentario-error" style="color: #ff8888; font-weight: bold; margin-bottom: 10px;" hidden></div>
                <div id="comentario-exito" style="color: #57e491; font-weight: bold; margin-bottom: 10px;" hidden></div>

                <form id="form-comentario">
                    <label for="comentario-nombre" style="display: block; font-weight: bold; margin-bottom: 5px;">Nombre:</label>
                    <input type="text" id="comentario-nombre" required minlength="3" maxlength="50" style="width: 100%; padding: 8px; margin-bottom: 10px; background: #1c4e17; color: white; border: 1px solid #57e491; border-radius: 4px; box-sizing: border-box;">

                    <label for="comentario-texto" style="display: block; font-weight: bold; margin-bottom: 5px;">Comentario:</label>
                    <textarea id="comentario-texto" rows="3" cols="40" required minlength="5" style="width: 100%; padding: 8px; margin-bottom: 10px; background: #1c4e17; color: white; border: 1px solid #57e491; border-radius: 4px; box-sizing: border-box; resize: vertical;"></textarea>

                    <button type="submit" id="btn-comentario-submit" style="padding: 10px 15px; background: #10441b; color: white; border: 1px solid #57e491; border-radius: 4px; cursor: pointer; font-weight: bold;">Agregar comentario</button>
                </form>
            </div>

            <br>
            <button id="btn-cerrar-modal" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">Cerrar</button>
        </div>
    `;
    modal.style.display = "flex";

    document.getElementById("btn-cerrar-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cargar comentarios asíncronamente
    cargarComentarios(a.id);

    // Evento de envío de comentario asíncrono 
    const formComentario = document.getElementById("form-comentario");
    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        enviarComentario(a.id);
    });
}

// Cargar comentarios 
function cargarComentarios(avistamientoId) {
    const contenedor = document.getElementById("lista-comentarios");
    if (!contenedor) return;

    fetch(`/api/avistamientos/${avistamientoId}/comentarios`)
        .then(res => res.json())
        .then(data => {
            if (!data.comentarios || data.comentarios.length === 0) {
                contenedor.innerHTML = "<p style='margin: 0;'>No hay comentarios aún. ¡Sé el primero en comentar!</p>";
                return;
            }

            let htmlComentarios = "";
            data.comentarios.forEach(c => {
                htmlComentarios += `
                    <div style="border-bottom: 1px dashed #57e491; padding: 8px 0;">
                        <small style="color: #57e491;">${c.fecha} - <strong>${c.nombre}</strong></small>
                        <p style="margin: 5px 0 0 0;">${c.texto}</p>
                    </div>
                `;
            });
            contenedor.innerHTML = htmlComentarios;
        })
        .catch(err => {
            contenedor.innerHTML = "<p style='color: #ff8888;'>Error al cargar los comentarios.</p>";
        });
}

// Enviar comentario 
function enviarComentario(avistamientoId) {
    const nombreInput = document.getElementById("comentario-nombre");
    const textoInput = document.getElementById("comentario-texto");
    const divError = document.getElementById("comentario-error");
    const divExito = document.getElementById("comentario-exito");

    divError.hidden = true;
    divExito.hidden = true;

    const nombre = nombreInput.value.trim();
    const texto = textoInput.value.trim();

    // Validaciones en cliente
    if (nombre.length < 3 || nombre.length > 50) {
        divError.innerText = "El nombre debe contener entre 3 y 50 caracteres.";
        divError.hidden = false;
        return;
    }

    if (texto.length < 5) {
        divError.innerText = "El comentario debe contener al menos 5 caracteres.";
        divError.hidden = false;
        return;
    }

    fetch(`/api/avistamientos/${avistamientoId}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, texto: texto })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            divExito.innerText = "¡Comentario agregado con éxito!";
            divExito.hidden = false;
            nombreInput.value = "";
            textoInput.value = "";
            cargarComentarios(avistamientoId);
        } else {
            divError.innerText = data.error || "Error al agregar el comentario.";
            divError.hidden = false;
        }
    })
    .catch(err => {
        divError.innerText = "Error de conexión con el servidor.";
        divError.hidden = false;
    });
}