let ejercicios = [
  { nombre: "Press banca", musculo: "Pecho", descripcion: "Ejercicio básico de empuje horizontal. Ideal para desarrollar fuerza y masa en el pectoral mayor.", multimedia: "" },
  { nombre: "Banca inclinada", musculo: "Pecho alto", descripcion: "Variante del press banca con banco inclinado. Enfoca el trabajo en la parte alta del pectoral y el deltoides anterior.", multimedia: "" },
  { nombre: "Press militar", musculo: "Hombros", descripcion: "Elevación de barra por encima de la cabeza de pie o sentado. Clave para la fuerza del hombro y el desarrollo del deltoides.", multimedia: "" },
  { nombre: "Fondos lastrados", musculo: "Tríceps", descripcion: "Fondos en paralelas con peso extra. Excelente para tríceps y parte inferior del pecho.", multimedia: "" },
  { nombre: "Tríceps en polea", musculo: "Tríceps", descripcion: "Empuje de barra o cuerda en polea alta hacia abajo. Aísla el tríceps de forma segura y efectiva.", multimedia: "" },
  { nombre: "Pájaros en polea alta", musculo: "Pecho", descripcion: "Aperturas con poleas desde posición alta. Trabaja el pectoral en su ángulo más completo, similar a la banca plana.", multimedia: "" },
  { nombre: "Pájaros en polea baja", musculo: "Pecho", descripcion: "Apertura con poleas desde posición baja. Activa sobre todo la parte superior del pectoral.", multimedia: "" },
  { nombre: "Dominadas lastradas", musculo: "Espalda", descripcion: "Dominadas con peso añadido. Trabaja dorsales y fuerza de agarre.", multimedia: "" },
  { nombre: "Jalón al pecho", musculo: "Espalda", descripcion: "Tirón de polea alta hacia el pecho. Ideal para trabajar los músculos dorsales.", multimedia: "" },
  { nombre: "Remo con barra", musculo: "Espalda alta", descripcion: "Tracción horizontal con barra hacia el abdomen. Ideal para desarrollar trapecios, romboides y dorsales.", multimedia: "" },
  { nombre: "Remo sentado", musculo: "Espalda media", descripcion: "Tracción con polea baja y agarre en V. Trabaja la parte media de la espalda y los dorsales inferiores.", multimedia: "" },
  { nombre: "Face pull", musculo: "Espalda alta", descripcion: "Tirón facial con polea alta. Perfecto para deltoides posterior, trapecio y mejorar la postura.", multimedia: "" },
  { nombre: "Curl de bíceps banco inclinado", musculo: "Bíceps", descripcion: "Curl de bíceps acostado boca arriba en banco inclinado. Alarga el bíceps y evita trampas con el torso.", multimedia: "" },
  { nombre: "Curl de bíceps en polea", musculo: "Bíceps", descripcion: "Curl con polea baja y barra recta o cuerda. Mantiene tensión constante durante todo el movimiento.", multimedia: "" },
  { nombre: "Elevaciones laterales en polea", musculo: "Hombros", descripcion: "Elevación lateral con polea baja de pie. Aísla el deltoides medio de forma continua.", multimedia: "" },
  { nombre: "Sentadillas con barra", musculo: "Piernas", descripcion: "Ejercicio rey del tren inferior. Trabaja cuádriceps, glúteos y estabilizadores de forma global.", multimedia: "" },
  { nombre: "Prensa de piernas", musculo: "Cuádriceps", descripcion: "Empuje en máquina de prensa horizontal o inclinada. Aísla bien el cuádriceps sin carga en la espalda.", multimedia: "" },
  { nombre: "Peso muerto rumano", musculo: "Femorales", descripcion: "Peso muerto con piernas semirrígidas. Enfoque máximo en isquiotibiales y glúteo.", multimedia: "" },
  { nombre: "Hiptrust", musculo: "Glúteo", descripcion: "Empuje de cadera con barra apoyada en la pelvis. El mejor ejercicio para activar y desarrollar el glúteo.", multimedia: "" },
  { nombre: "Elevaciones de gemelo", musculo: "Gemelos", descripcion: "Subida de talones de pie o sentado. Ideal para desarrollar sóleo y gemelos en toda su amplitud.", multimedia: "" }
];

function pintarEjercicios(){

    // Añadir multimedias para cada ejercicio en el array ejercicios
let div_ejercicios = document.getElementById('lista-ejercicios');

  div_ejercicios.innerHTML = "";

// EL CONTENIDO MULTIMEDIA SE CONSTRUYE DINÁMICAMENTE. EL PROBLEMA ES QUE SOLO ADMITIRÁ VIDEOS DE YOUTUBE. PODRÍAS AÑADIR UNA CONDICIÓN QUE MUESTRE UN IFRAME DE YT O UN VIDEO TUYO PROPIO.
ejercicios.forEach(dato => {
    div_ejercicios.innerHTML +=

    `<div class="ejercicio">
      <button class="ejercicio-nombre">${dato.nombre} — ${dato.musculo}</button>
      <div class="ejercicio-contenido oculto">
      <br>
        <p>${dato.descripcion}</p>

     <video width="640" height="360" controls poster="imagen-miniatura.jpg">
  <source src="${dato.multimedia}" type="video/mp4">
  <source src="${dato.multimedia}" type="video/webm">
  Tu navegador no soporta el formato de video.
</video>

      </div>
    </div>
  `});

// Obtenemos todos los botones de ejercicio que existen en la página
const todosLosBotonesDeEjercicio = document.querySelectorAll('.ejercicio-nombre');

// Recorremos cada botón y le añadimos un listener de click
todosLosBotonesDeEjercicio.forEach(botonDeEjercicio => {

  botonDeEjercicio.addEventListener('click', () => {

    // El contenido está justo debajo del botón en el HTML
    // nextElementSibling significa "el elemento hermano que viene justo después"
    const contenidoDelEjercicio = botonDeEjercicio.nextElementSibling;

    // toggle añade la clase si no está, la quita si ya está
    contenidoDelEjercicio.classList.toggle('oculto');



  });

});

}

window.onload =  function () {

pintarEjercicios();

// MAPEO EL DIV QUE CONTIENE EL FORMULARIO DEL NUEVO EJERCICIO


// AL PULSAR EL BOTÓN DE AGREGAR EJERCICIO, SE MUESTRA O SE OCULTA EL FORMULARIO DE MOSTRAR EL EJERCICIO
const botonAgregarEjercicio = document.querySelector('.agregar-ejercicio');

let div_add_ejercicio = botonAgregarEjercicio.nextElementSibling;

botonAgregarEjercicio.addEventListener('click',()=>{

div_add_ejercicio.classList.toggle('oculto');

});


let boton_guardar_ejercicio = document.getElementById('boton_guardar_ejercicio');

  // AL PULSAR EL BOTÓN DE GUARDAR EJERCICIO, SE COMPRUEBA QUE AL MENOS EL NOMBRE TENGA CONTENIDO, SE CREA EL OBJETO Y SE AÑADE AL ARRAY DE OBJETOS EJERCICIOS
boton_guardar_ejercicio.addEventListener('click',()=>{

   let input_nombre_nuevo = document.getElementById('nombre_ejercicio').value;

   let input_musculo_nuevo = document.getElementById('musculo_ejercicio').value;

      let input_descripcion_nueva = document.getElementById('descripción_ejercicio').value;

         let input_multimedia_nueva = document.getElementById('multimedia_ejercicio').value;


  if(input_nombre_nuevo === ''){
    alert('El nombre del nuevo ejercicio no puede estar vacío.');
    return;
  };

let este_ejercicio = {
    nombre: input_nombre_nuevo,
    musculo: input_musculo_nuevo,
    descripcion: input_descripcion_nueva,
    multimedia: input_multimedia_nueva
};

  ejercicios.push(este_ejercicio);

  pintarEjercicios();

  alert('¡Ejercicio añadido!');

});

}


