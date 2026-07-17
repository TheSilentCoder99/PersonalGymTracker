async function pintarPlantillas() {

    let htmlPlantillas = "";

    // GUARDO TODAS LAS PLANTILLAS
    let All_plantillas = await obtenerPlantillas();

    // DE CADA PLANTILLA, PINTO SU HTML EN EL DIV QUE LAS CONTIENE
    All_plantillas.forEach(esta_plantilla => {

        // CONSTRUYO LA LISTA DE EJERCICIOS DE ESTA PLANTILLA
        let htmlEjercicios = "";

        esta_plantilla.ejercicios.forEach((ejercicio, indiceEjercicio) => {

            // ACCEDO AL ARRAY DE SERIES DEL EJERCICIO QUE SE ESTÉ RECORRIENDO EN ESE MOMENTO
            let htmlSeries = "";

            ejercicio.series.forEach((serie, indiceSerie) => {
                htmlSeries += `
        <li>
            <input type="number" min="0" step="0.5" value="${serie.kg}" class="kg-plantilla"
                data-ejercicio="${indiceEjercicio}" data-serie="${indiceSerie}">
            kg - <input type="number" min="0" value="${serie.reps}" class="repes-plantilla"
                data-ejercicio="${indiceEjercicio}" data-serie="${indiceSerie}"> reps
        </li>
    `;
            });

            htmlEjercicios += `
    <li>
        ${ejercicio.nombre}
        <ol>${htmlSeries}</ol>
    </li>`;

        });

        // CONSTRUYO UI FINAL
        htmlPlantillas += `
            <div class="plantilla" data-id="${esta_plantilla.id}">

                <button type="button" class="borrar-plantilla" data-id="${esta_plantilla.id}">
                x
                </button>

                <h3>${esta_plantilla.nombre}</h3>

                <button type="button" class="mostrar_ocultar_plantilla">
                Mostrar plantilla
                </button>

                <div class="contenido_plantilla oculto">
                    <ul>${htmlEjercicios}</ul>

                    <button type="button" class="guardar-cambios-plantilla" data-id="${esta_plantilla.id}">
                    Guardar cambios
                    </button>
                </div>

            </div>
        `;
    });

    // PINTO LAS PLANTILLAS EN EL HTML
    const contenedor_plantillas = document.getElementById('All-plantillas');
    contenedor_plantillas.innerHTML = htmlPlantillas;

    // BOTÓN PARA MOSTRAR U OCULTAR EL CONTENIDO DE UNA PLANTILLA
    const botones_mostrar_plantilla = document.querySelectorAll('.mostrar_ocultar_plantilla');
    botones_mostrar_plantilla.forEach(boton_mostrar => {
        boton_mostrar.addEventListener('click', () => {
            const contenedor_a_ocultar = boton_mostrar.nextElementSibling;
            contenedor_a_ocultar.classList.toggle('oculto');
        });
    });

    // ATRAPO TODOS LOS BOTONES DE BORRADO QUE SE GENERAN EN EL INNER HTML
    const botones_borrar = document.querySelectorAll('.borrar-plantilla');
    botones_borrar.forEach(boton_borrar => {
        boton_borrar.addEventListener('click', async () => {

            const idDePlantilla = Number(boton_borrar.dataset.id);

            let resultado_borrado = confirm('¿Quieres borrar esta plantilla?');

            if (resultado_borrado) {
                await eliminarPlantilla(idDePlantilla);
                boton_borrar.closest('.plantilla').remove();
            }
        });
    });

    // BOTÓN PARA GUARDAR LOS CAMBIOS DE KG DE UNA PLANTILLA
    const botones_guardar_cambios = document.querySelectorAll('.guardar-cambios-plantilla');
    botones_guardar_cambios.forEach(boton_guardar => {
        boton_guardar.addEventListener('click', async () => {

            const idDePlantilla = Number(boton_guardar.dataset.id);

            // BUSCO LA PLANTILLA ACTUAL EN LA LISTA YA CARGADA EN MEMORIA
            const plantilla = All_plantillas.find(p => p.id === idDePlantilla);

            // RECORRO SOLO LOS INPUTS DE KG QUE PERTENECEN A ESTA PLANTILLA
            const contenedor_plantilla = boton_guardar.closest('.plantilla');
            const inputs_kg = contenedor_plantilla.querySelectorAll('.kg-plantilla');
            const inputs_repes = contenedor_plantilla.querySelectorAll('.repes-plantilla');

            
            inputs_kg.forEach(input => {
                const indiceEjercicio = Number(input.dataset.ejercicio);
                const indiceSerie = Number(input.dataset.serie);

                plantilla.ejercicios[indiceEjercicio].series[indiceSerie].kg = Number(input.value);
            });

            
            inputs_repes.forEach(input => {
                const indiceEjercicio = Number(input.dataset.ejercicio);
                const indiceSerie = Number(input.dataset.serie);
 
                plantilla.ejercicios[indiceEjercicio].series[indiceSerie].reps = Number(input.value);
            });


            await guardarPlantilla(plantilla);

            alert('¡Cambios guardados!');
        });
    });

}

window.onload = async function () {

    await inicializarBaseDeDatos();
    await pintarPlantillas();

}