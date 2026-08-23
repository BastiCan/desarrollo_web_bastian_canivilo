//Validación del formulario
const validarForm = () => {
    const validadorMail = (mail) => mail && mail.includes("@");
    //Puede variar ya que quiero que el usuario ponga su nombre y apellido
    const validadorNombre = (nombre) => nombre && nombre.length > 8 && nombre.includes("");
    //Funciona para el rut Chileno
    const validadorRut = (rut) => rut && rut.includes("-") && rut.includes(".");
    const validadorTelefono = (telefono) => telefono && telefono.length == 9;

    //Inputs del DOM por el ID
    let nombreInput = document.getElementById("nombre");
    let rutInput = document.getElementById("rut");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let regionInput = document.getElementById("region");
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
        rutInput.style.borderColor = ";"
    }

    if (!validadorTelefono(telefonoInput.value)) {
        msg += "Telefono malo\n";
        telefonoInput.style.borderColor = "red";
    } else {
        telefonoInput.style.borderColor = "";
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