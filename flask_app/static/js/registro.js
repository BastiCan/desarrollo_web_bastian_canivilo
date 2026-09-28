// Validación del formulario
const validarForm = () => {
    const validadorMail = (mail) => mail && mail.includes("@");
    const validadorNombre = (nombre) => nombre && nombre.trim().length > 8 && nombre.includes(" ");
    const validadorRut = (rut) => rut && rut.includes("-") && rut.includes(".");
    const validadorTelefono = (telefono) => telefono && telefono.length == 9;
    const validadorRegion = (region) => region && region !== "";
    const validadorComuna = (comuna) => comuna && comuna.trim().length > 3;
    const validadorCalle_numero = (calle_numero) => calle_numero && calle_numero.trim().length >= 5 && calle_numero.includes(" ");

    // Obtenemos el formulario completo para poder ocultarlo después
    let formulario = document.forms["formulario"];

    // Inputs del DOM por el ID 
    let nombreInput = document.getElementById("nombre");
    let rutInput = document.getElementById("rut");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let regionSelect = document.getElementById("select-region"); 
    let comunaSelect = document.getElementById("select-comuna"); 
    let calle_numeroInput = document.getElementById("calle_numero");

    let inputsInvalidos = [];
    let esValido = true;

    const setInvalidInput = (inputNombre) => {
        inputsInvalidos.push(inputNombre);
        esValido = false;
    };

    // Lógica de validación
    if (!validadorNombre(nombreInput.value)) setInvalidInput("Nombre (Debe contener nombre y apellido)");
    if (!validadorRut(rutInput.value)) setInvalidInput("Rut (Debe incluir guión y puntos)");
    if (!validadorMail(emailInput.value)) setInvalidInput("Email");
    if (!validadorTelefono(telefonoInput.value)) setInvalidInput("Teléfono (9 dígitos)");
    if (!validadorRegion(regionSelect.value)) setInvalidInput("Región");
    if (!validadorComuna(comunaSelect.value)) setInvalidInput("Comuna");
    if (!validadorCalle_numero(calle_numeroInput.value)) setInvalidInput("Calle y Número");

    // Mostrar la validación en la caja
    let validacionBox = document.getElementById("val-box");
    let validacionMessageElem = document.getElementById("val-msg");
    let validacionListElem = document.getElementById("val-list");

    if (!esValido) {
        validacionListElem.textContent = "";
        for (let input of inputsInvalidos) {
            let listaElement = document.createElement("li");
            listaElement.innerText = input;
            validacionListElem.append(listaElement);
        }
        
        validacionMessageElem.innerText = "Los siguientes campos son inválidos:";
        validacionBox.style.backgroundColor = "#ffdddd";
        validacionBox.style.borderLeftColor = "#f44336";
        validacionBox.hidden = false;
    } else {
        formulario.style.display = "none";
        
        validacionMessageElem.innerText = "¡Registro válido! ¿Deseas enviar tus datos o volver?";
        validacionListElem.textContent = "";

        validacionBox.style.backgroundColor = "#ddffdd";
        validacionBox.style.borderLeftColor = "#4CAF50";

        let submitButton = document.createElement("button");
        submitButton.innerText = "Enviar";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
            window.location.href = "../html/inicio.html";
        });

        let backButton = document.createElement("button");
        backButton.innerText = "Volver";
        backButton.addEventListener("click", () => {
            formulario.style.display = "block";
            validacionBox.hidden = true;
        });

        validacionListElem.appendChild(submitButton);
        validacionListElem.appendChild(backButton);
        validacionBox.hidden = false;
    }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validarForm);