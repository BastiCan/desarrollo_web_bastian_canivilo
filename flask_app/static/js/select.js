document.addEventListener("DOMContentLoaded", () => {
    const regionSelect = document.getElementById("select-region");
    const comunaSelect = document.getElementById("select-comuna");
    const datosChileScript = document.getElementById("datos-chile");

    if (!regionSelect || !comunaSelect || !datosChileScript) return;

    const datosChile = JSON.parse(datosChileScript.textContent);

    regionSelect.innerHTML = '<option value=""> Seleccione una región </option>';
    for (const regionId in datosChile) {
        const option = document.createElement("option");
        option.value = regionId; 
        option.textContent = datosChile[regionId].nombre;
        regionSelect.appendChild(option);
    }

    regionSelect.addEventListener("change", (e) => {
        const selectedRegionId = e.target.value;
        comunaSelect.innerHTML = '<option value=""> Seleccione una comuna </option>';

        if (selectedRegionId && datosChile[selectedRegionId]) {
            const comunas = datosChile[selectedRegionId].comunas;
            comunas.forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna.id; 
                option.textContent = comuna.nombre;
                comunaSelect.appendChild(option);
            });
        }
    });
});