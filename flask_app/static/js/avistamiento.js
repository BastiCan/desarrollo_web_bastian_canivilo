//Ver la validación de los atributos del formulario
const validarNombre = (nombre) => {
    if (!nombre) return false;
    let largoValido = nombre.trim().length >= 4;
    return largoValido;
}

const validarTipo = (tipo) => {
    if (!tipo) return false;
    let largoValido = tipo.trim().length >= 3; 
    return largoValido;
}

const validarLugar = (lugar) => {
    if (!lugar) return false;
    let largoValido = lugar.trim().length >= 3;
    return largoValido;
}

const validarFecha = (fecha) => {
    if (!fecha) return false;
    //Para validar el formato: DD/MM/AAAA
    const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regexFecha.test(fecha.trim())) return false;
    const [dia, mes, anio] = fecha.trim().split("/");
    const fechaIngresada = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);
    const limitePasado = new Date();
    limitePasado.setFullYear(hoy.getFullYear() - 1);
    limitePasado.setHours(0, 0, 0, 0);
    return fechaIngresada <= hoy && fechaIngresada >= limitePasado;
};

const validarHora = (hora) => {
    if (!hora) return false;
    let largoValido = hora.trim().length >= 4;
    let formatoValido = hora.trim().includes(":");
    return largoValido && formatoValido;
};

const validarArchivo = (archivos) => { //Es lo que se adjunta foto o video 
    if (!archivos) return false;
    let largoValido = 1 <= archivos.length && archivos.length <= 3; //Más de uno
    let tipoValido = true;
    for (const archivo of archivos){ //Ver si es una imagen o video 
        let familiaDeArchivo = archivo.type.split("/")[0];
        tipoValido &&= familiaDeArchivo == "image" || familiaDeArchivo == "video";
    }
    return largoValido && tipoValido;
};

//Validar el formulario completo 
const validarForm = () => {
    //Obtenemos cada elemento del formulario
    let formulario = document.forms["formulario"];
    let tipo = formulario["tipo"].value;
    let nombre = formulario["nombre"].value;
    let lugar = formulario["lugar"].value;
    let fecha = formulario["fecha"].value;
    let hora = formulario["hora"].value;
    let archivos = formulario["archivos"].files;

    //Variables auxiliares
    let inputsInvalidos = []; 
    let esValido = true;
    const setInvalidInput = (inputNombre) => {
        inputsInvalidos.push(inputNombre);
        esValido &&=false;
    };

    //Lógica de validación 
    if (!validarTipo(tipo)) {
        setInvalidInput("Tipo");
    }
    if (!validarNombre(nombre)) {
        setInvalidInput("Nombre");
    }
    if (!validarLugar(lugar)) {
        setInvalidInput("Lugar");
    }
    if (!validarFecha(fecha)) {
        setInvalidInput("Fecha (dia/mes/año)");
    }
    if (!validarHora(hora)) {
        setInvalidInput("Hora (23:59)");
    }
    if (!validarArchivo(archivos)) {
        setInvalidInput("Fotos");
    }

    //Mostrar la validación
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
        formulario.style.display = "none";
        
        //Muestra texto de exito 
        validacionMessageElem.innerText = "¡Formulario válido! ¿deseas enviar el avistamiento o volver?";
        validacionListElem.textContent = "";

        //aplicar estilos de exito
        validacionBox.style.backgroundColor = "#ddffdd"; 
        validacionBox.style.borderLeftColor = "#4CAF50";

        //Agregar botones para enviar el avistamiento o volver
        let submitButton = document.createElement("button");
        submitButton.innerText = "Enviar";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () =>{
            window.location.href = "../html/inicio.html";
        });

        let backButton = document.createElement("button");
        backButton.innerText = "Volver";
        backButton.addEventListener("click", () => {
            //Mostrar el forms de nuevo
            formulario.style.display = "block";
            validacionBox.hidden = true;
        });

        validacionListElem.appendChild(submitButton);
        validacionListElem.appendChild(backButton);

        //Hacer visible el mensaje de validación
        validacionBox.hidden = false; 
    }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validarForm);
