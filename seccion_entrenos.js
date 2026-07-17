async function addEjercicio_Entreno(idEntrenamiento, ejercicio, nota) {

    let entreno_actual = await ObtenerEntreno(idEntrenamiento);

    entreno_actual.nota = nota;

    entreno_actual.ejercicios.push(ejercicio);

    await guardarEntrenamiento(entreno_actual);
}

async function guardarNota(idEntrenamiento, nota) {
    let entreno_actual = await ObtenerEntreno(idEntrenamiento);
    entreno_actual.nota = nota;
    await guardarEntrenamiento(entreno_actual);
}


async function pintarEntrenamientos() {

    let htmlEntrenos = "";

    // GUARDO TODOS LOS ENTRENAMIENTOS
    let All_entrenamientos = await obtenerEntrenamientos();

    // DE CADA ENTRENAMIENTO, PINTO SU HTML EN EL DIV QUE LOS CONTIENE
    All_entrenamientos.forEach(este_entreno => {

        // CONSTRUYO LA LISTA DE EJERCICIOS DE ESTE ENTRENO
        let htmlEjercicios = "";

        // ACCEDO AL ARRAY DE EJERCICIOS DEL ENTRENAMIENTO QUE SE ESTÉ RECORRIENDO EN ESE MOMENTO
        este_entreno.ejercicios.forEach(ejercicio => {
            // ACCEDO AL ARRAY DE SERIES DEL EJERCICIO QUE SE ESTÉ RECORRIENDO EN ESE MOMENTO
            let htmlSeries = "";
            ejercicio.series.forEach(serie => {
                htmlSeries += `
        <li>${serie.kg}kg - ${serie.reps} reps</li>
    `;
            });
            // CONSTRUYO EL HTML QUE SE MOSTRARÁ FINALMENTE AL USUARIO ACCEDIENDO AL NOMBRE DEL EJERCICIO (PRIMER FOR-EACH HIJO) Y AÑADIENDO EL HTML CONSTRUIDO DE SERIES(EN EL FOR-EACH NIETO)
            htmlEjercicios += `
    <li>
        <button class="borrar-ejercicio" data-id="${ejercicio.id}" data-entreno="${este_entreno.id}">x</button>
        ${ejercicio.nombre}
        <ol>${htmlSeries}</ol>
    </li>`;

        });

        // CONSTRUYO UI FINAL
        htmlEntrenos += `
            <div class="entrenamiento">

            <button type="button" class="guardar-como-plantilla" data-id="${este_entreno.id}">
                Guardar como rutina de entrenamiento.
                </button>

                <button class="borrar-entrenamiento" data-id="${este_entreno.id}">
                x
                </button>

                <h3>${este_entreno.nombre}</h3>
                <p>${este_entreno.fecha}</p>

                <button class="add-ejercicio" data-id="${este_entreno.id}">
                Seleccionar ejercicios
                </button>


                <div class="formulario_ejercicios oculto">
                </div>

                <button class="mostrar_ocultar">
                 Ejercicios
                </button>

                <div class="mostrar_ejercicios oculto">
                    <ul>${htmlEjercicios}</ul>
                    </div>


                     <button type="button" class="boton_ver_notas">
             Ver notas
             </button>

                        <div class="nota_ejercicio oculto">
                        
                        <textArea class="nota_entreno"></textArea>

                        <div>
                        <p class="nota_ejercicio">${este_entreno.nota || ""}</p>
                        </div>

                        <button type="button" class="add_notas" data-id="${este_entreno.id}">Añadir nota</button>

                        </div>
                        <br>
                        <a href="seccion_ejercicios.html" style="color:lightgreen" target="_blank">Añadir nuevo ejercicio...</a>
            </div>

        `;
    });

    // PINTO LOS ENTRENAMIENTOS EN EL HTML
    const contenedor_entrenos = document.getElementById('All-entrenos');
    contenedor_entrenos.innerHTML = htmlEntrenos;

    const botones_add_notas = document.querySelectorAll('.add_notas');
    botones_add_notas.forEach(boton_nota => {
        boton_nota.addEventListener('click', () => {

            let nota = boton_nota.closest('.nota_ejercicio').querySelector('.nota_entreno').value;

            let contenedor = boton_nota.closest('.nota_ejercicio');

            let id = Number(boton_nota.dataset.id);

            guardarNota(id, nota);

            contenedor.querySelector('p').textContent = nota;

        })
    });

    // ATRAPO TODOS LOS BOTONES DE BORRADO QUE SE GENERAN EN EL INNER HTML
    const botones_borrar = document.querySelectorAll('.borrar-entrenamiento');

    // A CADA BOTÓN LE ASIGNO UN EVENTO PARA QUE BORREN A SU CONTENEDOR ASÍ EL BORRADO SE VE EN TIEMPO REAL
    botones_borrar.forEach(boton_borrar => {
        boton_borrar.addEventListener('click', async () => {

            const idDelEntreno = Number(boton_borrar.dataset.id);

            // PARA QUE EL BORRADO NO SEA BRUSCO, SE PIDE CONFIRMACIÓN AL USUARIO
            let resultado_borrado = confirm('¿Quieres borrar este entrenamiento?');

            if (resultado_borrado) {
                await eliminarEntreno(idDelEntreno);
                boton_borrar.parentElement.remove();
            }
        });
    });

    // ATRAPO TODOS LOS BOTONES DE AÑADIR EJERCICIO QUE SE GENERAN EN EL INNER HTML
const botones_add_ejercicio = document.querySelectorAll('.add-ejercicio');

botones_add_ejercicio.forEach(boton_add_ejercicio => {
    boton_add_ejercicio.addEventListener('click', async () => {

        let acordeon_ejercicios = "";

        await cargarEjercicios();

        let contenedor_formulario_a_rellenar = boton_add_ejercicio.nextElementSibling;


        // SOLO RELLENA EL FORMULARIO LA PRIMERA VEZ
        if (contenedor_formulario_a_rellenar.innerHTML.trim() === '') {


            EjerciciosTotales.forEach(dato => {
                acordeon_ejercicios += `<option value="${dato.nombre}">${dato.nombre}</option>`;
            });


            contenedor_formulario_a_rellenar.innerHTML = `
                <form action="">
                    <label for="nombre_ejercicio">Nombre</label>
                    <br>
                   
                    <select name="nombre_ejercicio" id="nombre_ejercicio">
                        ${acordeon_ejercicios}
                    </select>

                    <br>

                    <label for="num_series">Nº de series</label>
                    <br>

                    <select name="series" id="num_series">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>

                    <br>
                    <br>

                    <div class="contenedor_series">

                    </div>

                    <br>

                    <button class="definir-series" data-id="${boton_add_ejercicio.dataset.id}">
                        Definir series
                    </button>

                    <button class="guardar-ejercicio_definitivo" data-id="${boton_add_ejercicio.dataset.id}">
                        Guardar ejercicio ✅
                    </button>

                </form>
            `;


            let boton_UI = contenedor_formulario_a_rellenar.querySelector('.definir-series');


            boton_UI.addEventListener('click', async (event) => {

                event.preventDefault();

                let series = Number(document.getElementById('num_series').value);

                let html_series_peso = "";

                for (let i = 0; i < series; i++) {

                    let num_series = i + 1;

                    html_series_peso += `
                        <li>
                        Serie ${num_series}:
                        <br>
                        kg: <input type="number" min="1" value="1" class="kg">
                        <br>
                        reps:<input type="number" min="1" max="100" value="1" class="repes">
                        </li>
                    `;
                }


                let div_series =
                    contenedor_formulario_a_rellenar.querySelector('.contenedor_series');


                div_series.innerHTML = html_series_peso;

            });

            let boton_guardar_definitivo = contenedor_formulario_a_rellenar.querySelector('.guardar-ejercicio_definitivo');


            boton_guardar_definitivo.addEventListener('click', async (event) => {

                event.preventDefault();


                let nombre = document.getElementById('nombre_ejercicio').value;


                const inputPeso = contenedor_formulario_a_rellenar.querySelectorAll('.kg');

                const inputRepes = contenedor_formulario_a_rellenar.querySelectorAll('.repes');


                let series = [];


                inputPeso.forEach((input, i) => {

                    series.push({

                        kg: Number(input.value),

                        reps: Number(inputRepes[i].value)

                    });

                });

                let ejercicio = {

                    id: Date.now(),

                    nombre,

                    series

                };

                await addEjercicio_Entreno(Number(boton_guardar_definitivo.dataset.id), ejercicio);

                await pintarEntrenamientos();

            });

        }


        contenedor_formulario_a_rellenar.classList.toggle('oculto');

    });
});

    // BOTÓN PARA MOSTRAR U OCULTAR LAS NOTAS
    let botones_ver_notas = document.querySelectorAll('.boton_ver_notas');
    botones_ver_notas.forEach(ver_notas => {
        ver_notas.addEventListener('click', () => {
            let contenedor_notas = ver_notas.nextElementSibling;
            contenedor_notas.classList.toggle('oculto');

        });
    });

    // BOTÓN PARA MOSTRAR U OCULTAR LOS EJERCICIOS
    const botones_mostrar_ejercicios = document.querySelectorAll('.mostrar_ocultar');
    botones_mostrar_ejercicios.forEach(boton_mostrar => {
        boton_mostrar.addEventListener('click', () => {
            const contenedor_a_ocultar = boton_mostrar.nextElementSibling;
            contenedor_a_ocultar.classList.toggle('oculto');
        });
    });


    const botones_borrar_ejercicio = document.querySelectorAll('.borrar-ejercicio');
    botones_borrar_ejercicio.forEach(boton => {
        boton.addEventListener('click', async () => {

            const idEjercicio = Number(boton.dataset.id);
            const idEntrenamiento = Number(boton.dataset.entreno);

            let resultado_borrado = confirm('¿Quieres borrar este ejercicio?');

            if (resultado_borrado) {
                let entreno = await ObtenerEntreno(idEntrenamiento);
                let indice = entreno.ejercicios.findIndex(e => e.id === idEjercicio);

                entreno.ejercicios.splice(indice, 1);

                await guardarEntrenamiento(entreno);
                await pintarEntrenamientos();
            }
        });
    });

    // BOTÓN PARA GUARDAR UN ENTRENAMIENTO COMO PLANTILLA
    const botones_guardar_plantilla = document.querySelectorAll('.guardar-como-plantilla');
    botones_guardar_plantilla.forEach(boton_plantilla => {
        boton_plantilla.addEventListener('click', async () => {
 
            const idEntrenamiento = Number(boton_plantilla.dataset.id);
 
            // OBTENGO EL ENTRENAMIENTO COMPLETO Y ACTUALIZADO DE LA BD
            const entreno = await ObtenerEntreno(idEntrenamiento);

            if(entreno.ejercicios < 1){
                alert('Esta plantilla está vacía. Debes definir los ejercicios para poder guardarla.');
                return;
            }
 
            // CONSTRUYO LA PLANTILLA A PARTIR DE LOS EJERCICIOS DEL ENTRENAMIENTO (NOMBRE + SERIES CON KG Y REPS)
            const plantilla = {
                id: Date.now(),
                nombre: entreno.nombre,
                ejercicios: entreno.ejercicios.map(ejercicio => ({
                    nombre: ejercicio.nombre,
                    series: ejercicio.series
                }))
            };
 
            await guardarPlantilla(plantilla);
 
            alert('¡Plantilla guardada!');
        });
    });

}




window.onload = async function () {

    await inicializarBaseDeDatos();
    await cargarEjercicios();
    await pintarEntrenamientos();

}