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
    type: "bar",
    data: {
        labels: ["Torres del Paine", "Cajón del Maipo", "Conguillío", "Salar de Atacama"],
        datasets: [{
            label: "Cantidad de Aves Vistas",
            data: [35, 28, 15, 12],
            backgroundColor: "#57e491",
            borderRadius: 4
        }]
    },
    options: {
        indexAxis: "y",
        color: "#ffffff",
        scales: {
            x: {ticks: {color: "#ffffff" }},
            y: {ticks: {color: "#ffffff" }}
        }
    }
});