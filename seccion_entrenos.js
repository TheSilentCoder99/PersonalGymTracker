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
            </div>
        `;
    });

    // PINTO LOS ENTRENAMIENTOS EN EL HTML
    const contenedor_entrenos = document.getElementById('All-entrenos');
    contenedor_entrenos.innerHTML = htmlEntrenos;

    // ATRAPO TODOS LOS BOTONES DE BORRADO QUE SE GENERAN EN EL INNER HTML
    const botones_borrar = document.querySelectorAll('.borrar-entrenamiento');

    // A CADA BOTÓN LE ASIGNO UN EVENTO PARA QUE BORREN A SU CONTENEDOR
    botones_borrar.forEach(boton_borrar => {
        boton_borrar.addEventListener('click', async () => {

            const idDelEntreno = Number(boton_borrar.dataset.id);

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
        boton_add_ejercicio.addEventListener('click', () => {

            let contenedor_formulario_a_rellenar = boton_add_ejercicio.nextElementSibling;

            // SOLO RELLENA EL FORMULARIO LA PRIMERA VEZ, Y ASIGNA EL LISTENER DEL GUARDAR
            if (contenedor_formulario_a_rellenar.innerHTML.trim() === '') {

                contenedor_formulario_a_rellenar.innerHTML = `
                    <form action="">
                        <label for="nombre_ejercicio">Nombre</label>
                        <br>
                        <input type="text" id="nombre_ejercicio" name="nombre_ejercicio">
                        <br>
                        <label for="num_series">Series</label>
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
                        <button class="guardar-ejercicio" data-id="${boton_add_ejercicio.dataset.id}">
                            ✅
                        </button>
                    </form>`;

                // EL LISTENER DEL GUARDAR VA AQUÍ, DENTRO DEL IF, PARA ASIGNARSE SOLO UNA VEZ
                let boton_guardar = contenedor_formulario_a_rellenar.querySelector('.guardar-ejercicio');

                boton_guardar.addEventListener('click', async (event) => {
                    event.preventDefault();
                    let nombre = document.getElementById('nombre_ejercicio').value;
                    let series = document.getElementById('num_series').value;
                    await addEjercicio_Entreno(Number(boton_guardar.dataset.id), { nombre, series });
                });
            }

            contenedor_formulario_a_rellenar.classList.toggle('oculto');
        });
    });
}

window.onload = async function () {
    await inicializarBaseDeDatos();
    await pintarEntrenamientos();
}