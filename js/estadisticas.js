const lienzoTipos = document.getElementById("graficoTipos");

new Chart(lienzoTipos, {
    type: "doughnut", //Forma del Gráfico
    data: {
        labels: ["Aves Marinas", "Rapaces", "Acuáticas", "Paseriformes"],
        datasets: [{
            data: [45, 25, 20, 10]
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

