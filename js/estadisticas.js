//Primer Gráfico
const lienzoTipos = document.getElementById("graficoTipos");

new Chart(lienzoTipos, {
    type: "doughnut", //Forma del Gráfico
    data: {
        labels: ["Aves Marinas", "Rapaces", "Acuáticas", "Paseriformes"],
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                "#57e491",
                "#10441b",
                "#2a5a2a",
                "#8cc414"
            ],
            borderColor: "#1c4e17",
            borderWidth: 2
        }]
    },
    options: {
        color: "#ffffff",
    }
});

//Segundo Gráfico
const lienzoLugares = document.getElementById("graficoLugares");

new Chart(lienzoLugares, {
    type: "bar", //Gráfico de barra
    data: {
        labels: ["Torres del Paine", "Cajón del Maipo", "Conguillío",
                 "Salar de Atacama", "Parque Metropolitano", "Valle de Azapa",
                "Altos de Lircay"],
        datasets: [{
            label: "Cantidad de Aves Vistas",
            data: [35, 28, 15, 12, 10, 8, 5],
            backgroundColor: "#57e491",
            borderRadius: 4,
            barPercentage: 0.9,
            categoryPercentage: 1.0
        }]
    },
    options: {
        indexAxis: "y",
        color: "#ffffff",
        aspectRatio: 1.1,
        scales: {
            x: {ticks: {color: "#ffffff" }},
            y: {ticks: {color: "#ffffff" }}
        }
    }
});

//Tercer Gráfico
const lienzoVoluntarios = document.getElementById("graficoVoluntarios");

new Chart(lienzoVoluntarios, {
    type: "pie", //Gráfico de torta
    data: {
        labels: ["Metropolitana", "Valparaíso", "Magallanes", "Araucanía", "Antofagasta"],
        datasets: [{
            data: [120, 85, 40, 60, 25], 
            backgroundColor: [
                "#57e491", 
                "#10441b", 
                "#2a5a2a", 
                "#8cc414", 
                "#1c4e17"
            ],
            borderColor: "#57e491",
            borderWidth: 1
        }]
    },
    options: {
        color: "#ffffff"
    }
});

const pressButton = document.getElementById("submit-btn");
pressButton.addEventListener("click", function() {
    window.location.href = "../html/inicio.html";
});