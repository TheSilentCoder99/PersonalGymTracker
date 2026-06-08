// CONSTRUYE EL HTML DE LAS SERIES DE UN EJERCICIO
// Recibe: el array de series de un ejercicio concreto
// Devuelve: el HTML con todas las series en formato lista
function construirSeries(seriesDelEjercicio) {
    let htmlSeries = "";

    seriesDelEjercicio.forEach(serie => {
        htmlSeries += `<li>${serie.reps} reps — ${serie.kg} kg</li>`;
    });

    return htmlSeries;
}

// CONSTRUYE EL HTML DE LOS EJERCICIOS DE UN ENTRENO
// Recibe: el array de ejercicios de un entreno concreto
// Devuelve: el HTML con todos los ejercicios y sus series dentro
function construirEjercicios(ejerciciosDelEntreno) {
    let htmlEjercicios = "";

    ejerciciosDelEntreno.forEach(ejercicio => {
        htmlEjercicios += `
            <div class="ejercicio">
                <p>${ejercicio.nombre}</p>
                <ol>${construirSeries(ejercicio.series)}</ol>
            </div>
        `;
    });

    return htmlEjercicios;
}

// CONSTRUYE EL HTML DE LOS ENTRENOS DE UNA SEMANA
// Recibe: el array de entrenos de una semana concreta
// Devuelve: el HTML con todos los entrenos y sus ejercicios dentro
function construirEntrenos(entrenosDeLaSemana) {
    let htmlEntrenos = "";

    entrenosDeLaSemana.forEach(entreno => {
        htmlEntrenos += `
            <div class="entreno">
                <p>${entreno.nombre}</p>
                ${construirEjercicios(entreno.ejercicios)}
            </div>
        `;
    });

    return htmlEntrenos;
}

// PUNTO DE ENTRADA DE LA PÁGINA
window.onload = async function () {

    await inicializarBaseDeDatos();

    const todasLasSemanas = await obtenerTodasLasSemanas();

    const divSemanas = document.getElementById('All-semanas');

    todasLasSemanas.forEach(semana => {
        divSemanas.innerHTML += `
            <div class="semana">
                <button class="semana-nombre">${semana.nombre}</button>
                <div class="semana-contenido oculto">
                    ${construirEntrenos(semana.entrenos)}
                </div>
                <button class="boton-eliminar-semana" data-id="${semana.id}">Eliminar</button>

            </div>
        `;
    });

    // TODOS LOS BOTONES DE BORRADO
    const todosLosBotonesDeBorrar = document.querySelectorAll('.boton-eliminar-semana');

    // Recorremos cada botón y le añadimos un listener de click
    todosLosBotonesDeBorrar.forEach(botonDeBorrar => {

        botonDeBorrar.addEventListener('click', async () => {

            // El contenido está justo debajo del botón en el HTML
            // nextElementSibling significa "el elemento hermano que viene justo después"
            const contenidoDeLaSemana = botonDeBorrar.nextElementSibling;

            // EL ID DE LA SEMANA GUARDADO EN EL BOTÓN. SE CONVIERTE A NÚMERO PRIMERO PORQUE SINO SE PASA COMO STRING
            const idDeLaSemana = Number(botonDeBorrar.dataset.id);
            
            await eliminarSemana(idDeLaSemana);


            // SE ELIMINA EL ELEMENTO PADRE DEL BOTÓN.
botonDeBorrar.parentElement.remove();
        });

    })

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