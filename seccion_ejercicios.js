let ejerciciosPredeterminados = [
  { nombre: "Press banca", musculo: "Pecho", descripcion: "Ejercicio básico de empuje horizontal. Ideal para desarrollar fuerza y masa en el pectoral mayor.", imagenes: [] },
  { nombre: "Banca inclinada", musculo: "Pecho alto", descripcion: "Variante del press banca con banco inclinado. Enfoca el trabajo en la parte alta del pectoral y el deltoides anterior.", imagenes: []},
  { nombre: "Press militar", musculo: "Hombros", descripcion: "Elevación de barra por encima de la cabeza de pie o sentado. Clave para la fuerza del hombro y el desarrollo del deltoides.", imagenes: [] },
  { nombre: "Fondos lastrados", musculo: "Tríceps", descripcion: "Fondos en paralelas con peso extra. Excelente para tríceps y parte inferior del pecho.", imagenes: []},
  { nombre: "Tríceps en polea", musculo: "Tríceps", descripcion: "Empuje de barra o cuerda en polea alta hacia abajo. Aísla el tríceps de forma segura y efectiva.", imagenes: [] },
  { nombre: "Pájaros en polea alta", musculo: "Pecho", descripcion: "Aperturas con poleas desde posición alta. Trabaja el pectoral en su ángulo más completo, similar a la banca plana.", imagenes: [] },
  { nombre: "Pájaros en polea baja", musculo: "Pecho", descripcion: "Apertura con poleas desde posición baja. Activa sobre todo la parte superior del pectoral.", imagenes: []},
  { nombre: "Dominadas lastradas", musculo: "Espalda", descripcion: "Dominadas con peso añadido. Trabaja dorsales y fuerza de agarre.", imagenes: [] },
  { nombre: "Jalón al pecho", musculo: "Espalda", descripcion: "Tirón de polea alta hacia el pecho. Ideal para trabajar los músculos dorsales.", imagenes: []},
  { nombre: "Remo con barra", musculo: "Espalda alta", descripcion: "Tracción horizontal con barra hacia el abdomen. Ideal para desarrollar trapecios, romboides y dorsales.", imagenes: [] },
  { nombre: "Remo sentado", musculo: "Espalda media", descripcion: "Tracción con polea baja y agarre en V. Trabaja la parte media de la espalda y los dorsales inferiores.", imagenes: [] },
  { nombre: "Face pull", musculo: "Espalda alta", descripcion: "Tirón facial con polea alta. Perfecto para deltoides posterior, trapecio y mejorar la postura.", imagenes: []},
  { nombre: "Curl de bíceps banco inclinado", musculo: "Bíceps", descripcion: "Curl de bíceps acostado boca arriba en banco inclinado. Alarga el bíceps y evita trampas con el torso.", imagenes: [] },
  { nombre: "Curl de bíceps en polea", musculo: "Bíceps", descripcion: "Curl con polea baja y barra recta o cuerda. Mantiene tensión constante durante todo el movimiento.", imagenes: [] },
  { nombre: "Elevaciones laterales en polea", musculo: "Hombros", descripcion: "Elevación lateral con polea baja de pie. Aísla el deltoides medio de forma continua.", imagenes: [] },
  { nombre: "Sentadillas con barra", musculo: "Piernas", descripcion: "Ejercicio rey del tren inferior. Trabaja cuádriceps, glúteos y estabilizadores de forma global.", imagenes: [] },
  { nombre: "Prensa de piernas", musculo: "Cuádriceps", descripcion: "Empuje en máquina de prensa horizontal o inclinada. Aísla bien el cuádriceps sin carga en la espalda.", imagenes: [] },
  { nombre: "Peso muerto rumano", musculo: "Femorales", descripcion: "Peso muerto con piernas semirrígidas. Enfoque máximo en isquiotibiales y glúteo.", imagenes: [] },
  { nombre: "Hiptrust", musculo: "Glúteo", descripcion: "Empuje de cadera con barra apoyada en la pelvis. El mejor ejercicio para activar y desarrollar el glúteo.", imagenes: [] },
  { nombre: "Elevaciones de gemelo", musculo: "Gemelos", descripcion: "Subida de talones de pie o sentado. Ideal para desarrollar sóleo y gemelos en toda su amplitud.", imagenes: [] }
];

let ejerciciosDB = [];
let EjerciciosTotales = [];

async function cargarEjercicios() {
    
     ejerciciosDB = await obtenerEjercicios();
     EjerciciosTotales = [

        ...ejerciciosPredeterminados,
        ...ejerciciosDB
     ]

}

function pintarEjercicios(lista = EjerciciosTotales){

let div_ejercicios = document.getElementById('lista-ejercicios');

  div_ejercicios.innerHTML = "";

lista.forEach(dato => {

    let htmlImagenes = "";

    // SI EL EJERCICIO CONTIENE IMÁGENES, SE CREA SU ETIQUETA CON LA URL DINÁMICAMENTE PARA MOSTRARLA DESPUÉS EN EL CARROUSSEL
    if (dato.imagenes && dato.imagenes.length > 0) {

        dato.imagenes.forEach(imagen => {
            const url = URL.createObjectURL(imagen);
            htmlImagenes += `<img src="${url}" class="carrusel-imagen">`;
        });
    }

    div_ejercicios.innerHTML +=
    `<div class="ejercicio">

        <button class="ejercicio-nombre">${dato.nombre} — ${dato.musculo}</button>

        <div class="ejercicio-contenido oculto">
            <br>

            <p>${dato.descripcion}</p>

            <div class="carrusel">

                <button type="button" class="carrusel-btn carrusel-prev">&#8592;</button>

                <div class="carrusel-imagenes">
                    ${htmlImagenes}
                </div>

                <button type="button" class="carrusel-btn carrusel-next">&#8594;</button>

            </div>
        </div>
    </div>`;
});

// LÓGICA DEL CARROUSSEL
document.querySelectorAll('.carrusel').forEach(carrusel => {
    const imagenes = carrusel.querySelectorAll('.carrusel-imagen');
    if (imagenes.length === 0) return;

    let indice = 0;

    imagenes.forEach((img, i) => {
        img.style.display = i === 0 ? 'block' : 'none';
    });

    carrusel.querySelector('.carrusel-prev').addEventListener('click', () => {
        imagenes[indice].style.display = 'none';
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        imagenes[indice].style.display = 'block';
    });

    carrusel.querySelector('.carrusel-next').addEventListener('click', () => {
        imagenes[indice].style.display = 'none';
        indice = (indice + 1) % imagenes.length;
        imagenes[indice].style.display = 'block';
    });
});



const todosLosBotonesDeEjercicio = document.querySelectorAll('.ejercicio-nombre');

todosLosBotonesDeEjercicio.forEach(botonDeEjercicio => {

  botonDeEjercicio.addEventListener('click', () => {

    const contenidoDelEjercicio = botonDeEjercicio.nextElementSibling;

    contenidoDelEjercicio.classList.toggle('oculto');

  });

});

}

window.onload = async function () {

await inicializarBaseDeDatos();

await cargarEjercicios();

pintarEjercicios();

// OBTENGO LOS DATOS DEL INPUT
const buscador = document.getElementById('buscador_ejercicios');

// CREO UN EVENTO EN EL BUSCADOR
buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    // SI ALGÚN ELEMENTO DEL ARRAY EJERCICIOS INCLUYE EL CONTENIDO DEL TEXTO, ÉSTE ELEMENTO ES EL ÚNICO QUE SE PINTA
    const resultado = EjerciciosTotales.filter(dato => 
        dato.nombre.toLowerCase().includes(texto) || dato.musculo.toLowerCase().includes(texto)
    );
    pintarEjercicios(resultado);
});



const botonAgregarEjercicio = document.querySelector('.agregar-ejercicio');

let div_add_ejercicio = botonAgregarEjercicio.nextElementSibling;

botonAgregarEjercicio.addEventListener('click',()=>{

div_add_ejercicio.classList.toggle('oculto');

});

let boton_guardar_ejercicio = document.getElementById('boton_guardar_ejercicio');

boton_guardar_ejercicio.addEventListener('click',async()=>{

   let input_nombre_nuevo = document.getElementById('nombre_ejercicio').value;

   let input_musculo_nuevo = document.getElementById('musculo_ejercicio').value;

      let input_descripcion_nueva = document.getElementById('descripción_ejercicio').value;

      let input_multimedia_nueva = document.getElementById('multimedia_ejercicio');

      const archivos = Array.from(input_multimedia_nueva.files);

  if(input_nombre_nuevo === ''){
    alert('El nombre del nuevo ejercicio no puede estar vacío.');
    return;
  };

let este_ejercicio = {
    id: Date.now(),
    nombre: input_nombre_nuevo,
    musculo: input_musculo_nuevo,
    descripcion: input_descripcion_nueva,
    imagenes: archivos
};

  await guardarEjercicio(este_ejercicio);
  await cargarEjercicios();
  pintarEjercicios();

  document.getElementById('nombre_ejercicio').value = '';
    document.getElementById('musculo_ejercicio').value = '';
  document.getElementById('descripción_ejercicio').value = '';
    document.getElementById('multimedia_ejercicio').value = '';

  alert('¡Ejercicio añadido!');

});

}