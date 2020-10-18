// Variables
const btn_generar = document.getElementById('btnAdd');
const formulario = document.querySelector('.formulario');
const btn_registrar = document.querySelector('.add_reg');
const contenedor_li = document.querySelector('#table .contenedor-li');
let num = document.querySelector('.num');
let arreglo_registros = [];


cargarEventListener();

// Event Listener
function cargarEventListener() {
    btn_generar.addEventListener('click', showModal);
    btn_registrar.addEventListener('click', cargarFormulario);
    contenedor_li.addEventListener('click', eliminarReg);
}


// Funciones

// Mostrar modal para registrar elementos
function showModal(e) {
    e.preventDefault();
    const modal = document.getElementById('modal-create');
    const close_modal = document.querySelector('#modal-create .close-modal');

    modal.classList.add('show_modal');
    document.getElementById('marca').focus();

    // Close modal with Arrow Function
    close_modal.addEventListener('click', () => {
        modal.classList.remove('show_modal');
    });

}
// REGISTER FORM
function cargarFormulario(e) {

    e.preventDefault();

    // Items form
    let marca = document.getElementById('marca');
    let modelo = document.getElementById('modelo');
    let year = document.getElementById('year');
    let id = Date.now();


    if (marca.value != '' && modelo.value != '' && year.value != '') {

        // Forma 01:crear objeto
        let registroObj = new registro(marca.value, modelo.value, year.value, id);

        // Forma 02:Crear obejto
        // const registroObj = {
        //     marca: marca.value,
        //     modelo: modelo.value,
        //     year: year.value,
        //     id: id
        // }

        // Agregar el objeto creado al arreglo
        arreglo_registros = [...arreglo_registros, registroObj];
        console.log(arreglo_registros);
        console.log(registroObj.id);

        numRegistros();
        crearHTML();

        formulario.reset();

        marca.focus();

    } else {
        mostrarError('Falta llenar algunos campos!');
    }
}

// Eliminar registro de la tabla
function eliminarReg(e) {
    e.preventDefault();

    if (e.target.classList.contains('close-item')) {

        const obj = parseInt(e.target.getAttribute('data-id'));

        // console.log(obj);

        arreglo_registros = arreglo_registros.filter((registroObj) => registroObj.id !== obj);
        numRegistros();
        crearHTML();

    }
}

// OBJECT CONSTRUCTOR FUNCTION
function registro(marca, modelo, year, id) {
    this.marca = marca;
    this.modelo = modelo;
    this.year = year;
    this.id = id;
}

// SHOW ERROR MESSAGE
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el Contenido
    const contenido = document.querySelector('#modal-create .container .box-modal');
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// CREATE AND ADD ITEMS 
function crearHTML() {

    limpiarHTML();

    arreglo_registros.forEach((registroObj, i) => {
        const { marca, modelo, year, id } = registroObj;
        const row = document.createElement('li');

        row.innerHTML = `
                <p>${i+1}</p>
                <p>${marca}</p>
                <p>${modelo}</p>
                <p>${year}</p>
                <a href="" title="Eliminar" data-id="${id}" class="close-item">X</a>
        `;

        contenedor_li.appendChild(row);
    });

}

function numRegistros() {
    let numRegistros = arreglo_registros.length;
    num.innerHTML = `${numRegistros}`;
}

function limpiarHTML() {
    while (contenedor_li.firstChild) {
        contenedor_li.removeChild(contenedor_li.firstChild)
    }

}