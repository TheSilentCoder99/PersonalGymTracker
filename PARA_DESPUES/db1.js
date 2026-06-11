// // SE PREPARA LA CONEXIÓN CON LA BD
// // Nombre de la base de datos IndexedDB
// const NOMBRE_BASE_DE_DATOS = "gymtracker";

// // Versión actual de la base de datos (debe ser un número entero mayor que 0)
// const VERSION_BASE_DE_DATOS = 1;

// // Variable global para almacenar el objeto IDBDatabase una vez abierta la conexión
// let conexion; 

// /**
//  * Inicializa la base de datos (la abre o la crea si no existe)
//  * @returns {Promise<IDBDatabase>} Promesa con la instancia de la conexión
//  */
// function inicializarBaseDeDatos() {
//   return new Promise((promesaCumplida, promesaFallida) => {

//     // Solicita la apertura de la base de datos con el nombre y versión indicados
//     const peticionAbrirBD = indexedDB.open(NOMBRE_BASE_DE_DATOS, VERSION_BASE_DE_DATOS);

//     // Se ejecuta solo si la base de datos no existe o si la versión solicitada es mayor que la actual
//     peticionAbrirBD.onupgradeneeded = (evento) => {

//       // Obtiene la instancia de la base de datos desde el resultado del evento
//       const baseDeDatos = evento.target.result;

//       // Crea un almacén de objetos (equivalente a una tabla en SQL) llamado "semanas"
//       // Define la propiedad "id" como la clave primaria (keyPath) para identificar cada registro
//       baseDeDatos.createObjectStore("semanas", { keyPath: "id" });
//     };

//     // Se ejecuta cuando la conexión se ha abierto correctamente
//     peticionAbrirBD.onsuccess = (evento) => {
//       // Almacena el acceso a la base de datos en la variable global
//       conexion = evento.target.result; 
//       // Resuelve la promesa devolviendo la conexión activa
//       promesaCumplida(conexion);
//     };

//     // Se ejecuta si hay un fallo de permisos, bloqueo o error al abrir la base de datos
//     peticionAbrirBD.onerror = (evento) => {
//       // Rechaza la promesa devolviendo el objeto de error específico
//       promesaFallida(evento.target.error);
//     };

//   });
// }


// // CRUD PARA SEMANAS
// /**
//  * Guarda un registro nuevo o actualiza uno existente en el almacén
//  * @param {Object} objetoSemana - Datos de la semana a persistir (debe incluir la propiedad 'id')
//  * @returns {Promise<void>}
//  */
// function guardarSemana(objetoSemana) {
//   return new Promise((promesaCumplida, promesaFallida) => {

//     // Abre una transacción de lectura y escritura específica para el almacén "semanas"
//     const transaccion = conexion.transaction("semanas", "readwrite");
    
//     // Obtiene el acceso al almacén de objetos dentro de la transacción activa
//     const almacenDeSemanas = transaccion.objectStore("semanas");
    
//     // Solicita insertar el objeto (si el 'id' no existe) o actualizarlo (si el 'id' ya existe)
//     const peticionGuardar = almacenDeSemanas.put(objetoSemana);

//     // Confirma la operación resolviendo la promesa si el guardado es exitoso
//     peticionGuardar.onsuccess = () => promesaCumplida();
    
//     // Captura cualquier fallo en la inserción/actualización y rechaza la promesa
//     peticionGuardar.onerror   = (evento) => promesaFallida(evento.target.error);

//   });
// }

// /**
//  * Recupera todos los registros almacenados en "semanas"
//  * @returns {Promise<Array>} Promesa con la lista de objetos recuperados
//  */
// function obtenerTodasLasSemanas() {
//   return new Promise((promesaCumplida, promesaFallida) => {

//     // Abre una transacción en modo solo lectura (optimiza el rendimiento)
//     const transaccion = conexion.transaction("semanas", "readonly");
    
//     // Obtiene el acceso al almacén "semanas"
//     const almacenDeSemanas = transaccion.objectStore("semanas");
    
//     // Solicita la extracción de todos los registros del almacén de manera asíncrona
//     const peticionLeerTodo = almacenDeSemanas.getAll();

//     // Devuelve el array con todos los datos encontrados al resolver la promesa
//     peticionLeerTodo.onsuccess = (evento) => promesaCumplida(evento.target.result);
    
//     // Maneja errores de lectura rechazando la promesa con el motivo del fallo
//     peticionLeerTodo.onerror   = (evento) => promesaFallida(evento.target.error);

//   });
// }

// /**
//  * Elimina un registro específico basado en su identificador único
//  * @param {*} idDeLaSemana - Clave primaria del objeto a eliminar
//  * @returns {Promise<void>}
//  */
// function eliminarSemana(idDeLaSemana) {
//   return new Promise((promesaCumplida, promesaFallida) => {

//     // Abre una transacción de lectura y escritura para permitir el borrado
//     const transaccion = conexion.transaction("semanas", "readwrite");
    
//     // Accede al almacén de objetos "semanas"
//     const almacenDeSemanas = transaccion.objectStore("semanas");
    
//     // Solicita la eliminación del registro que coincida con el id provisto
//     const peticionEliminar = almacenDeSemanas.delete(idDeLaSemana);

//     // Resuelve la promesa indicando que el borrado concluyó con éxito
//     peticionEliminar.onsuccess = () => promesaCumplida();
    
//     // Rechaza la promesa si la solicitud de borrado falla
//     peticionEliminar.onerror   = (evento) => promesaFallida(evento.target.error);

//   });
// }
