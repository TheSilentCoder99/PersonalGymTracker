async function pintarEntrenamientos() {
    let htmlEntrenos = "";

    // GUARDO TODOS LOS ENTRENAMIENTOS
    let All_entrenamientos = await obtenerEntrenamientos();

    // DE CADA ENTRENAMIENTO, PINTO SU HTML EN EL DIV QUE LOS CONTIENE
    All_entrenamientos.forEach(este_entreno => {
        htmlEntrenos += `
            <div class="entrenamiento">
                <button class="borrar-entrenamiento" data-id="${este_entreno.id}">x</button>
                <h3>${este_entreno.nombre}</h3>
                <p>${este_entreno.fecha}</p>
            </div>
        `;
    });

    // PINTO LOS ENTRENAMIENTOS EN EL HTML
    const contenedor_entrenos = document.getElementById('All-entrenos');
    contenedor_entrenos.innerHTML = htmlEntrenos;

    // ATRAPO TODOS LOS BOTONES DE BORRADO QUE SE GENERAN EN EL INNER HTML
    const botones_borrar = document.querySelectorAll('.borrar-entrenamiento');

    // A CADA BOTÓN LE ASIGNO UN EVENTO PARA QUE BORREN A SU CONTENEDOR, ES DECIR, A SU ENTRENO
    botones_borrar.forEach(boton_borrar => {
        boton_borrar.addEventListener('click', async () => {

            // EL ID QUE SE USA EN LA FUNCIÓN DE BORRAR, LO TENÍA GUARDADO EN EL BOTÓN, EN SU DATA-ID
            const idDelEntreno = Number(boton_borrar.dataset.id);

            await eliminarEntreno(idDelEntreno);
            
            boton_borrar.parentElement.remove();
        });
    });
}




window.onload = async function () {
    // CREO O ABRO LA BD PARA PODER HACER OPS RELACIONADAS CON ELLA
    await inicializarBaseDeDatos();
    await pintarEntrenamientos();
}