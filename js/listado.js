const bdAvistamientos = [
    {tipo: "lol", nombre: "paloma", lugar: "mi casa", fecha: "10/10/2001", hora: "10:10"}
];

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

window.onload = cargaLista;