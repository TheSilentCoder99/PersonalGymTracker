let conexion;

function inicializarBaseDeDatos() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open("gymtracker", 9);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            
    if (!db.objectStoreNames.contains("entrenamientos")) {
        db.createObjectStore("entrenamientos", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("ejercicios")) {
        db.createObjectStore("ejercicios", { keyPath: "id" });
    }

        if (!db.objectStoreNames.contains("plantillas")) {
        db.createObjectStore("plantillas", { keyPath: "id" });
    }


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

function guardarEjercicio(ejercicio) {
    return new Promise((resolve, reject) => {
        const tx = conexion.transaction("ejercicios", "readwrite");
        const store = tx.objectStore("ejercicios");
        const request = store.put(ejercicio);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}

function obtenerEjercicios() {
    return new Promise((resolve, reject) => {
        const tx = conexion.transaction("ejercicios", "readonly");
        const store = tx.objectStore("ejercicios");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

function eliminarEjercicio (idEjercicio) {
  return new Promise((promesaCumplida, promesaFallida) => {

    // Abre una transacción de lectura y escritura para permitir el borrado
    const transaccion = conexion.transaction("ejercicios", "readwrite");
    
    // Accede al almacén de objetos "ejercicios"
    const tabla_ejercicios = transaccion.objectStore("ejercicios");
    
    // Solicita la eliminación del registro que coincida con el id provisto
    const peticionEliminar = tabla_ejercicios.delete(idEjercicio);

    // Resuelve la promesa indicando que el borrado concluyó con éxito
    peticionEliminar.onsuccess = () => promesaCumplida();
    
    // Rechaza la promesa si la solicitud de borrado falla
    peticionEliminar.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}

// PLANTILLAS
function guardarPlantilla(plantilla) {
    return new Promise((resolve, reject) => {
        const tx = conexion.transaction("plantillas", "readwrite");
        const store = tx.objectStore("plantillas");
        const request = store.put(plantilla);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}
 
function obtenerPlantillas() {
    return new Promise((resolve, reject) => {
        const tx = conexion.transaction("plantillas", "readonly");
        const store = tx.objectStore("plantillas");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
    });
}
 
function eliminarPlantilla (idPlantilla) {
  return new Promise((promesaCumplida, promesaFallida) => {
 
    // Abre una transacción de lectura y escritura para permitir el borrado
    const transaccion = conexion.transaction("plantillas", "readwrite");
    
    // Accede al almacén de objetos "plantillas"
    const tabla_plantillas = transaccion.objectStore("plantillas");
    
    // Solicita la eliminación del registro que coincida con el id provisto
    const peticionEliminar = tabla_plantillas.delete(idPlantilla);
 
    // Resuelve la promesa indicando que el borrado concluyó con éxito
    peticionEliminar.onsuccess = () => promesaCumplida();
    
    // Rechaza la promesa si la solicitud de borrado falla
    peticionEliminar.onerror   = (evento) => promesaFallida(evento.target.error);
 
  });
}

function ObtenerPlantilla(idPlantilla) {
  return new Promise((promesaCumplida, promesaFallida) => {

    // Abre una transacción de lectura y escritura para permitir el borrado
    const transaccion = conexion.transaction("plantillas", "readonly");
    
    // Accede al almacén de objetos "entrenamientos"
    const tabla_plantillas = transaccion.objectStore("plantillas");
    
    // Solicita el registro que coincida con el id provisto
    const peticionObtener = tabla_plantillas.get(idPlantilla);

    // Resuelve la promesa indicando que concluyó con éxito
    peticionObtener.onsuccess = () => promesaCumplida(peticionObtener.result);
    
    // Rechaza la promesa si la solicitud falla
    peticionObtener.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}