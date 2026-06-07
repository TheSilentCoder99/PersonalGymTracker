// / Esperamos a que la página cargue antes de ejecutar nada
window.onload = async function () {

    // Abrimos la conexión con la base de datos
    await inicializarBaseDeDatos();

    // Traemos todas las semanas guardadas en IndexedDB
    const todasLasSemanas = await obtenerTodasLasSemanas();

    // Obtenemos el contenedor donde pintaremos las semanas
    const div_semanas = document.getElementById('All-semanas');

    todasLasSemanas.forEach(semana => {
        div_semanas.innerHTML +=

            `<div class="semana">
      <button class="semana-nombre">${semana.nombre}</button>
      <div class="semana-contenido oculto">
        <div>${semana.entrenos.length}</p>
      </div>
    </div>
  `});

    // Obtenemos todos los botones de semana que existen en la página
    const todosLosBotonesDeSemanas = document.querySelectorAll('.semana-nombre');

    // Recorremos cada botón y le añadimos un listener de click
    todosLosBotonesDeSemanas.forEach(botonDeEjercicio => {

        botonDeEjercicio.addEventListener('click', () => {

            // El contenido está justo debajo del botón en el HTML
            // nextElementSibling significa "el elemento hermano que viene justo después"
            const contenidoDeLaSemana = botonDeEjercicio.nextElementSibling;

            // toggle añade la clase si no está, la quita si ya está
            contenidoDeLaSemana.classList.toggle('oculto');

        });

    })
};