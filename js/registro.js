//Validación del formulario
const validarForm = () => {
    const validadorMail = (mail) => mail && mail.includes("@");
    //Puede variar ya que quiero que el usuario ponga su nombre y apellido
    const validadorNombre = (nombre) => nombre && nombre.trim().length > 8 && nombre.includes(" ");
    //Funciona para el rut Chileno
    const validadorRut = (rut) => rut && rut.includes("-") && rut.includes(".");
    const validadorTelefono = (telefono) => telefono && telefono.length == 9;
    const validadorRegion = (region) => region && !region.includes("Seleccione una región:");
    const validadorComuna = (comuna) => comuna && comuna.trim().length > 3;
    //Falta cond de poner numeros, tipo se puede poner puras letras lol
    const validadorCalle_numero = (calle_numero) => calle_numero && calle_numero.trim().length >= 5 && calle_numero.includes(" ")

    //Inputs del DOM por el ID
    let nombreInput = document.getElementById("nombre");
    let rutInput = document.getElementById("rut");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let regionSelect = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let calle_numeroInput = document.getElementById("calle_numero");

    let isValid = false;
    let msg = "";

    if (!validadorMail(emailInput.value)) {
        msg += "Mail malo\n";
        emailInput.style.borderColor = "red";
    } else {
        emailInput.style.borderColor = "";
    }

    if (!validadorNombre(nombreInput.value)) {
        msg += "Nombre malo\n";
        nombreInput.style.borderColor = "red";
    } else {
        nombreInput.style.borderColor = ";"
    }

    if (!validadorRut(rutInput.value)) {
        msg += "Rut malo\n";
        rutInput.style.borderColor = "red";
    } else {
        rutInput.style.borderColor = "";
    }

    if (!validadorTelefono(telefonoInput.value)) {
        msg += "Telefono malo\n";
        telefonoInput.style.borderColor = "red";
    } else {
        telefonoInput.style.borderColor = "";
    }

    if (!validadorRegion(regionSelect.value)) {
        msg += "Región no valida\n";
        regionSelect.style.borderColor = "red";
    } else {
        regionSelect.style.borderColor = "";
    }

    if (!validadorComuna(comunaInput.value)) {
        msg += "Comuna Invalida\n";
        comunaInput.style.borderColor = "red";
    } else {
        comunaInput.style.borderColor = "";
    }

    if (!validadorCalle_numero(calle_numeroInput.value)) {
        msg += "Dirección no valida\n";
        calle_numeroInput.style.borderColor = "red";
    } else {
        calle_numeroInput.style.borderColor = "";
    }

    if (msg === "") {
        msg = "Felicidades te acabas de registrar!";
        isValid = true;
    }
    alert(msg);

    if (isValid) {
        window.location.href = "../html/inicio.html";
    }
};

let submitBtn = document.getElementById("envio");
submitBtn.addEventListener("click", validarForm);