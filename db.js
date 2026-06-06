const NOMBRE_BASE_DE_DATOS = "gymtracker";
const VERSION_BASE_DE_DATOS = 1;
let conexion; // aquí guardaremos la conexión abierta a la BD

// Inicializar (crear si no existe, abrir si ya existe)
function inicializarBaseDeDatos() {
  return new Promise((promesaCumplida, promesaFallida) => {

    const peticionAbrirBD = indexedDB.open(NOMBRE_BASE_DE_DATOS, VERSION_BASE_DE_DATOS);

    // Solo se ejecuta cuando la BD se crea por primera vez
    peticionAbrirBD.onupgradeneeded = (evento) => {
      const baseDeDatos = evento.target.result;
      baseDeDatos.createObjectStore("semanas", { keyPath: "id" });
      // createObjectStore es equivalente a CREATE TABLE en MySQL
      // keyPath: "id" equivale a definir "id" como PRIMARY KEY
    };

    peticionAbrirBD.onsuccess = (evento) => {
      conexion = evento.target.result; // guardamos la conexión para usarla después
      promesaCumplida(conexion);
    };

    peticionAbrirBD.onerror = (evento) => {
      promesaFallida(evento.target.error);
    };

  });
}

// Guardar o actualizar una semana
function guardarSemana(objetoSemana) {
  return new Promise((promesaCumplida, promesaFallida) => {

    const transaccion = conexion.transaction("semanas", "readwrite");
    const almacenDeSemanas = transaccion.objectStore("semanas");
    const peticionGuardar = almacenDeSemanas.put(objetoSemana);
    // put = insertar si no existe, sobreescribir si ya existe
    // equivale a INSERT OR REPLACE en MySQL

    peticionGuardar.onsuccess = () => promesaCumplida();
    peticionGuardar.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}

// Leer todas las semanas
function obtenerTodasLasSemanas() {
  return new Promise((promesaCumplida, promesaFallida) => {

    const transaccion = conexion.transaction("semanas", "readonly");
    const almacenDeSemanas = transaccion.objectStore("semanas");
    const peticionLeerTodo = almacenDeSemanas.getAll();

    peticionLeerTodo.onsuccess = (evento) => promesaCumplida(evento.target.result);
    peticionLeerTodo.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}

// Eliminar una semana por su id (el borrado es en cascada porque
// todo lo que contiene va anidado dentro del objeto)
function eliminarSemana(idDeLaSemana) {
  return new Promise((promesaCumplida, promesaFallida) => {

    const transaccion = conexion.transaction("semanas", "readwrite");
    const almacenDeSemanas = transaccion.objectStore("semanas");
    const peticionEliminar = almacenDeSemanas.delete(idDeLaSemana);
    // equivale a DELETE FROM semanas WHERE id = idDeLaSemana

    peticionEliminar.onsuccess = () => promesaCumplida();
    peticionEliminar.onerror   = (evento) => promesaFallida(evento.target.error);

  });
}