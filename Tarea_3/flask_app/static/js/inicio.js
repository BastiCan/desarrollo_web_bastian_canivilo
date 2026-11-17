const registro = document.getElementById("registro");
if (registro) {
    registro.addEventListener("click", function() {
    window.location.href = "/registro";
    });
}


const avistamiento = document.getElementById("avistamiento");
if (avistamiento) {
    avistamiento.addEventListener("click", function() {
    window.location.href = "/avistamiento";
    });
}


const listado = document.getElementById("listado");
if (listado) {
    listado.addEventListener("click", function() {
    window.location.href = "/listado";
    });
}


const estadistica = document.getElementById("estadistica");
if (estadistica) {
    estadistica.addEventListener("click", function() {
    window.location.href = "/estadisticas";
    });
}
