async function addEjercicio_Entreno(idEntrenamiento, ejercicio) {

    let entreno_actual = await ObtenerEntreno(idEntrenamiento);

    entreno_actual.ejercicios.push(ejercicio);

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
            htmlEjercicios += `<li>${ejercicio.nombre}</li> <ol>${htmlSeries}</ol>`;
        });

        // CONSTRUYO UI FINAL
        htmlEntrenos += `
            <div class="entrenamiento">

                <button class="borrar-entrenamiento" data-id="${este_entreno.id}">
                x
                </button>

                <h3>${este_entreno.nombre}</h3>
                <p>${este_entreno.fecha}</p>

                <button class="add-ejercicio" data-id="${este_entreno.id}">
                Añadir ejercicios
                </button>

                <div class="formulario_ejercicios oculto">
                </div>

                <button class="mostrar_ocultar">
                 Ejercicios
                </button>

                <div class="mostrar_ejercicios oculto">
                    <ul>${htmlEjercicios}</ul>
                    </div>
            </div>
        `;
    });


    // PINTO LOS ENTRENAMIENTOS EN EL HTML
    const contenedor_entrenos = document.getElementById('All-entrenos');
    contenedor_entrenos.innerHTML = htmlEntrenos;

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

            let contenedor_formulario_a_rellenar = boton_add_ejercicio.nextElementSibling;

            // SOLO RELLENA EL FORMULARIO LA PRIMERA VEZ, Y ASIGNA EL LISTENER DEL GUARDAR
            if (contenedor_formulario_a_rellenar.innerHTML.trim() === '') {

                contenedor_formulario_a_rellenar.innerHTML = `
                    <form action="">
                        <label for="nombre_ejercicio">Nombre</label>
                        <br>
                        <input type="text" id="nombre_ejercicio" name="nombre_ejercicio">
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
                        <!-- Este primer botón crea la UI-->
                        <button class="guardar-ejercicio" data-id="${boton_add_ejercicio.dataset.id}">
                            Definir series
                        </button>

                        <!-- Este segundo botón es el que guarda los entrenamientos-->
                         <button class="guardar-ejercicio_definitivo" data-id="${boton_add_ejercicio.dataset.id}">
                           Guardar ejercicio ✅
                        </button>

                    </form>
                    `;

                // EL LISTENER DEL GUARDAR VA AQUÍ, DENTRO DEL IF, PARA ASIGNARSE SOLO UNA VEZ
                let boton_guardar = contenedor_formulario_a_rellenar.querySelector('.guardar-ejercicio');

                // Este primer botón lo único que hace es pintar la UI. No guarda nada en la BD
                boton_guardar.addEventListener('click', async (event) => {

                    event.preventDefault();

                    // TOMO EL VALOR DEL NÚMERO DE SERIES ELEGIDAS POR EL USUARIO
                    let series = Number(document.getElementById('num_series').value);

                    // genero tantos input de peso y series como series haya elegido el usuario al crear el ejercicio
                    let html_series_peso = "";

                    for (let i = 0; i < series; i++) {

                        let num_series = i + 1;

                        html_series_peso += `
                                        <li>Serie ${num_series}:
                                        <br>
                                        kg: <input type="number" min="1" value="1" class="kg">
                                        <br>  
                                        reps:<input type="number" min="1" max="100" value="1" class="repes">
                                        </li>
                                        `;
                    }

                    let div_series =
                        contenedor_formulario_a_rellenar.querySelector('.contenedor_series');

                    // DIBUJO TODA ESTA PARTE CON LAS SERIES GENERADAS
                    div_series.innerHTML = html_series_peso;

                });
                

            //     // ESTE SEGUNDO BOTÓN YA SÍ QUE GUARDA EL ENTRENO Y LAS SERIES
                  let boton_guardar_definitivo = contenedor_formulario_a_rellenar.querySelector('.guardar-ejercicio_definitivo');

            boton_guardar_definitivo.addEventListener('click', async (event) => {
                

                event.preventDefault();

                let nombre = document.getElementById('nombre_ejercicio').value;

                // TOMO LOS VALORES DE PESO RELLENADOS POR EL USUARIO
                const inputPeso = contenedor_formulario_a_rellenar.querySelectorAll('.kg');

                // TOMO LOS VALORES DE REPES RELLENADOS POR EL USUARIO
                 const inputRepes = contenedor_formulario_a_rellenar.querySelectorAll('.repes');

                //  CREO UN ARRAY DE SERIES QUE SERÁ RELLENADO CON CADA VALOR DE PESO Y REPES
                 let series = [];

                // PARA CREAR LAS SERIES, RECORRO LOS VALORES DE PESO Y REPES A LA MISMA VEZ, O SEA, EL MISMO INDICE. DE CADA PESO TOMO EL VALOR Y LA POSICIÓN
                inputPeso.forEach((input, i) => {
                series.push({
        // EL VALOR LO UTILIZO AQUÍ, PARA AÑADIRLO EN KG
                kg: Number(input.value),
        // LA POSICIÓN LA UTILIZO AQUÍ, PARA TOMAR EL VALOR DEL Nº DE REPES DE LA MISMA POSICIÓN
                reps: Number(inputRepes[i].value)
    });
});

// CREO ESTE EJERCICIO
let ejercicio = {
    nombre,
    series
};

            await addEjercicio_Entreno(Number(boton_guardar_definitivo.dataset.id), ejercicio);
                await pintarEntrenamientos();
            });

            }

    
            // QUITA O PONE LA CLASE OCULTO A ESTE ELEMENTO DEPENDIENDO DE SI LA TIENE O NO. ESTA CLASE ESTÁ DEFINIDA EN EL CSS Y SIRVE PARA, DE BASE, OCULTAR EL ELEMENTO QUE LA RECIBE
            contenedor_formulario_a_rellenar.classList.toggle('oculto');
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

}

window.onload = async function () {
    await inicializarBaseDeDatos();
    await pintarEntrenamientos();
}