const bdAvistamientos = [
    { tipo: "Ave rapaz", nombre: "Cóndor Andino", lugar: "Cajón del Maipo", fecha: "01/09/2026", hora: "10:30" },
    { tipo: "Ave marina", nombre: "Pingüino de Humboldt", lugar: "Reserva Nacional Pingüino de Humboldt", fecha: "28/08/2026", hora: "09:15" },
    { tipo: "Pájaro carpintero", nombre: "Carpintero Negro", lugar: "Parque Nacional Conguillío", fecha: "03/09/2026", hora: "14:20" },
    { tipo: "Ave acuática", nombre: "Cisne de Cuello Negro", lugar: "Santuario Carlos Anwandter", fecha: "02/09/2026", hora: "11:45" },
    { tipo: "Ave zancuda", nombre: "Flamenco Chileno", lugar: "Salar de Atacama", fecha: "04/09/2026", hora: "17:30" },
    { tipo: "Rapaz nocturna", nombre: "Tucúquere", lugar: "Reserva Nacional Altos de Lircay", fecha: "01/09/2026", hora: "21:15" },
    { tipo: "Paseriforme", nombre: "Loica", lugar: "Parque Metropolitano de Santiago", fecha: "05/09/2026", hora: "08:30" },
    { tipo: "Ave marina", nombre: "Pelícano", lugar: "Caleta Portales, Valparaíso", fecha: "04/09/2026", hora: "12:10" },
    { tipo: "Ave corredora", nombre: "Ñandú", lugar: "Torres del Paine", fecha: "25/08/2026", hora: "15:45" },
    { tipo: "Picaflor", nombre: "Picaflor de Arica", lugar: "Valle de Azapa", fecha: "02/09/2026", hora: "16:00" }
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

const ordenarLista = () => {
    const campo = document.getElementById("filtro-campo").value;
    const orden = document.getElementById("filtro-orden").value;    

    bdAvistamientos.sort((a,b) =>{
        let valorA = a[campo];
        let valorB = b[campo];

        if (campo == "fecha") {
            const [diaA, mesA, anoA] = valorA.split("/");
            const [diaB, mesB, anoB] = valorB.split("/");
            valorA = new Date(`${anoA}-${mesA}-${diaA}`);
            valorB = new Date(`${anoB}-${mesB}-${diaB}`);
            return orden == "asc" ? valorA - valorB : valorB - valorA;
        } 
        
        if (orden == "asc") {
            return valorA.localeCompare(valorB);
        } else {
            return valorB.localeCompare(valorA);
        }
    });
    cargaLista();
};

document.getElementById("filtro-campo").addEventListener("change", ordenarLista);
document.getElementById("filtro-orden").addEventListener("change", ordenarLista);

const pressButton = document.getElementById("submit-btn");
pressButton.addEventListener("click", function() {
    window.location.href = "../html/inicio.html";
});

window.onload = () => {
    ordenarLista();
};