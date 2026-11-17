const validarLugar = (lugar) => lugar && lugar.trim().length >= 3;
const validarFechaHora = (fechaHora) => fechaHora && fechaHora.trim() !== "";
const validarSeleccion = (valor) => valor && valor.trim() !== "";

//Validar el formulario completo 
const validarForm = () => {
    //Obtenemos cada elemento del formulario
    let formulario = document.forms["formulario"];
    let voluntario = formulario["select_voluntario"] ? formulario["select_voluntario"].value : "";
    let ave = formulario["select-ave"] ? formulario["select-ave"].value : "";
    let lugar = formulario["lugar"] ? formulario["lugar"].value : "";
    let fechaHora = formulario["fecha_hora"] ? formulario["fecha_hora"].value : "";

    let inputsInvalidos = []; 
    let esValido = true;

    const setInvalidInput = (inputNombre) => {
        inputsInvalidos.push(inputNombre);
        esValido = false;
    };

    if (!validarSeleccion(voluntario)) setInvalidInput("Voluntario");
    if (!validarSeleccion(ave)) setInvalidInput("Ave");
    if (!validarLugar(lugar)) setInvalidInput("Lugar (mínimo 3 caracteres)");
    if (!validarFechaHora(fechaHora)) setInvalidInput("Fecha y Hora");

    let validacionBox = document.getElementById("val-box");
    let validacionMessageElem = document.getElementById("val-msg");
    let validacionListElem = document.getElementById("val-list");

    if (!esValido) {
        validacionListElem.textContent = "";
        for (input of inputsInvalidos) {
            let listaElement = document.createElement("li");
            listaElement.innerText = input;
            validacionListElem.append(listaElement);
        }
        //Muestra texto de error
        validacionMessageElem.innerText = "Los siguientes campos son inválidos"
        
        //aplicar estilos de error 
        validacionBox.style.backgroundColor = "#ffdddd"; 
        validacionBox.style.borderLeftColor = "#f44336";

        //Hacer visible el mensaje de validación
        validacionBox.hidden = false;
    } else {
        //Enviamos los datos a la base de datos
        formulario.submit();
    }
};

let submitBtn = document.getElementById("submit-btn");
if (submitBtn) {
    submitBtn.addEventListener("click", validarForm);
}
