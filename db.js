let conexion;

function inicializarBaseDeDatos() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open("gymtracker", 2);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            db.createObjectStore("entrenamientos", {
                keyPath: "id"
            });
        };

        request.onsuccess = (e) => {
            conexion = e.target.result;
            resolve(conexion);
        };

        request.onerror = (e) => reject(e.target.error);
    });
}

// SIEMPRE ES INICIAR - CONECTAR - EJECUTAR - DEVOLVER
function guardarEntrenamiento(entrenamiento) {
    return new Promise((resolve, reject) => {

        // INICIO UNA TRANSACCIÓN DE LECTURA Y ESCRITURA EN LA "TABLA" ENTRENAMIENTOS
        const transaccion_en_DB = conexion.transaction("entrenamientos", "readwrite");

        // ME CONECTO A LA TABLA ENTRENAMIENTOS
        const tabla_entrenamientos = transaccion_en_DB.objectStore("entrenamientos");

        // METO EL NUEVO ENTRENAMIENTO EN LA TABLA ENTRENAMIENTOS
        const request = tabla_entrenamientos.put(entrenamiento);

        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}

// REFERIDO A TODOS
function obtenerEntrenamientos() {
    return new Promise((resolve, reject) => {

        // INICIO LA TRANSACCIÓN EN MODO DE SOLO LECTURA
        const tx = conexion.transaction("entrenamientos", "readonly");

        // ME CONECTO A LA TABLA ENTRENAMIENTOS PARA HACER LA TRANSACCIÓN
        const store = tx.objectStore("entrenamientos");

        // DEVUELVO TODOS LOS ENTRENAMIENTOS DE LA TABLA ENTRENAMIENTOS
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

function eliminarEntreno (idEntreno) {
  return new Promise((promesaCumplida, promesaFallida) => {

    // Abre una transacción de lectura y escritura para permitir el borrado
    const transaccion = conexion.transaction("entrenamientos", "readwrite");
    
    // Accede al almacén de objetos "entrenamientos"
    const tabla_entrenamientos = transaccion.objectStore("entrenamientos");
    
    // Solicita la eliminación del registro que coincida con el id provisto
    const peticionEliminar = tabla_entrenamientos.delete(idEntreno);

    // Resuelve la promesa indicando que el borrado concluyó con éxito
    peticionEliminar.onsuccess = () => promesaCumplida();
    
    // Rechaza la promesa si la solicitud de borrado falla
    peticionEliminar.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}

function ObtenerEntreno (idEntreno) {
  return new Promise((promesaCumplida, promesaFallida) => {

    // Abre una transacción de lectura y escritura para permitir el borrado
    const transaccion = conexion.transaction("entrenamientos", "readonly");
    
    // Accede al almacén de objetos "entrenamientos"
    const tabla_entrenamientos = transaccion.objectStore("entrenamientos");
    
    // Solicita el registro que coincida con el id provisto
    const peticionObtener = tabla_entrenamientos.get(idEntreno);

    // Resuelve la promesa indicando que concluyó con éxito
    peticionObtener.onsuccess = () => promesaCumplida(peticionObtener.result);
    
    // Rechaza la promesa si la solicitud falla
    peticionObtener.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}