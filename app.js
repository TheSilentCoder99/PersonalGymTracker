window.onload = function () {

    inicializarBaseDeDatos();

    let botonAddSemana = document.getElementById('add-week-btn');

    async function creacionSemanaNueva() {

        const nuevaSemana = {
            id: Date.now(),
            nombre: "Semana 1",
            fechaCreacion: new Date().toISOString(),
            entrenos: []
        }

    await guardarSemana(nuevaSemana);
    const TodasLasSemanas = await obtenerTodasLasSemanas();
    console.log(TodasLasSemanas);

    }

    botonAddSemana.addEventListener('click', creacionSemanaNueva)

}