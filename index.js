const frases = [
    "Cuantos más desafíos superes, más fuerte serás.",
    "No se trata de ser mejor que nadie, sino de ser mejor que tu yo de ayer.",
    "El dolor que sientes hoy será la fuerza que sentirás mañana.",
    "El gimnasio es tu templo, entrena con respeto y pasión.",
    "Hoy no tengo ganas, pero voy a ir igual. Eso es disciplina.",
    "Tu único límite es el que tú mismo te pones.",
    "Suda ahora, brilla después.",
    "El cuerpo logra lo que la mente cree.",
    "No cuentes los días, haz que los días cuenten.",
    "Entrena como si alguien te estuviera mirando y quisiera inspirarse.",
    "Cada repetición te acerca más a tu mejor versión.",
    "El primer paso siempre cuesta, pero el último te cambia la vida.",
    "No esperes resultados diferentes si haces siempre lo mismo.",
    "El deporte no es un castigo, es una celebración de lo que tu cuerpo puede hacer.",
    "La motivación te enciende, la disciplina te mantiene ardiendo.",
    "Cuando creas que ya no puedes, aún te quedan dos más.",
    "El único mal entrenamiento es el que no se hace.",
    "Hoy levanto más que mis excusas.",
    "El sudor es la grasa llorando.",
    "Ser fuerte es levantar peso. Ser más fuerte es levantarte cuando caes.",
    "Tu cuerpo escucha todo lo que dice tu mente. Háblale bien.",
    "No se trata de tener tiempo, se trata de tomarse el tiempo.",
    "El gimnasio es donde conviertes el estrés en fuerza.",
    "Cada día decides si estás más cerca o más lejos de tu meta.",
    "El verdadero fracaso es no intentarlo.",
    "La gloria está en el esfuerzo, no en el resultado.",
    "No compites con nadie, compites con tus límites.",
    "El deporte te enseña que siempre puedes dar un paso más.",
    "Deja de soñar con tu cuerpo ideal y empieza a sudar por él.",
    "La fatiga es solo un mensaje diciendo que estás creciendo.",
    "Entrena tu mente tan duro como tu cuerpo.",
    "Hoy puede ser un día cualquiera o puede ser el día en que cambies todo.",
    "El dolor es temporal, el orgullo es para siempre.",
    "No te detengas cuando estés cansado, detente cuando hayas terminado.",
    "El gimnasio no juzga, transforma.",
    "Las excusas siempre pesan menos que las pesas.",
    "Un cuerpo fuerte alberga una mente fuerte.",
    "El éxito no es para los que nunca fallan, sino para los que nunca se rinden.",
    "No necesitas motivación 24/7, necesitas constancia.",
    "El deporte es la mejor inversión para tu futuro yo.",
    "Cada vez que sudas, estás ganando una batalla interna.",
    "La diferencia entre querer y lograr es el hacer.",
    "No esperes cambios si no cambias nada.",
    "El cansancio de hoy es la energía de mañana.",
    "Tus límites no están donde crees, están donde decides dejar de intentarlo.",
    "Haz ejercicio por salud, no solo por estética.",
    "El gimnasio es mi terapia, mis pesas son mi psicólogo.",
    "Cada gota de sudor limpia una duda.",
    "No eres flojo, solo no has encontrado tu porqué.",
    "El cuerpo no es un museo para cuidarlo, es un campo de batalla para entrenarlo.",
    "Un paso pequeño cada día es un gran salto al final del año.",
    "No te rindas ahora, que justo antes de la cima es donde más duele.",
    "El deporte no cambia tu cuerpo, cambia tu mentalidad.",
    "Hoy entreno para ser difícil de vencer mañana.",
    "El único rival que debes superar es el que ves en el espejo.",
    "El sudor de hoy evita las lágrimas del mañana.",
    "La disciplina pesa menos que el arrepentimiento.",
    "Entrena con propósito, no por costumbre.",
    "Tu peor día en el gimnasio es mejor que el mejor día en el sofá.",
    "El éxito se construye repetición tras repetición.",
    "No busques excusas, busca resultados.",
    "El dolor físico te recuerda que estás vivo y luchando.",
    "El cuerpo se acostumbra a lo que le exiges, exígele grandeza.",
    "No te compares con nadie, compárate con tu potencial.",
    "El mejor momento para empezar fue ayer. El segundo mejor es hoy.",
    "Cada entrenamiento es un ladrillo en la casa de tu mejor versión.",
    "El deporte te da un cuerpo que el 99% de la población no tiene la disciplina para lograr.",
    "No es egoísmo cuidarte, es responsabilidad.",
    "El cansancio honorable es el que viene tras el esfuerzo.",
    "Entrena como si no hubiera un mañana, pero con la vista puesta en un futuro fuerte.",
    "Las pesas no hablan, pero te cambian la vida.",
    "El verdadero ganador es el que nunca deja de intentarlo.",
    "Cada vez que no quieras ir, recuerda por qué empezaste.",
    "El deporte enseña humildad: hoy levantas 100, mañana empezarás de nuevo.",
    "No esperes a sentirte motivado para actuar; actúa y la motivación llegará.",
    "El gimnasio no es un lugar, es una decisión diaria.",
    "Tu fuerza no se mide en kilos, se mide en superación.",
    "El sudor une lo que las palabras separan.",
    "Cada entrenamiento es una oportunidad de reinventarte.",
    "No es falta de tiempo, es falta de prioridad.",
    "El deporte es el arte de convertir lo imposible en posible.",
    "Hazlo por el orgullo de mirarte al espejo y saber que lo intentaste todo.",
    "El cuerpo es el único sitio que tienes para vivir toda la vida, cuídalo.",
    "La pereza es el freno de mano del éxito.",
    "Cada repetición suma, cada día cuenta.",
    "No necesitas un gimnasio lujoso, necesitas ganas de acero.",
    "El deporte no te quita tiempo, te regala años de vida.",
    "Hoy me duelen los músculos, pero duele más la mediocridad.",
    "El camino es duro, pero el destino lo merece.",
    "Levantarte del sofá es la repetición más difícil de todas.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Tu mente se rendirá antes que tu cuerpo. No la escuches.",
    "El gimnasio te enseña que todo es posible con perseverancia.",
    "No hay atajos para un cuerpo fuerte, solo escalones de sudor.",
    "El deporte es la mejor respuesta a la frustración.",
    "La consistencia mata al talento.",
    "Hoy no fue perfecto, pero fui.",
    "El mejor entrenamiento es el que terminas, no el que empiezas.",
    "No se nace fuerte, se hace fuerte.",
    "El deporte es el idioma universal del esfuerzo.",
    "No esperes a que pase algo, haz que pase algo.",
    "El único mal intento es el que no se intenta.",
    "Cada día es una nueva oportunidad para superarte.",
    "Empieza donde estás, usa lo que tienes, haz lo que puedas."
];

// DESDE EL INDEX PUEDO IR A OTRAS SECCIONES. ESTE CÓDIGO ES PARA NO CREAR LISTENER PARA CADA BOTÓN. SE OBTIENE DESDE EL CONTENEDOR PADRE. SE ESCUCHAN LOS CLICK DENTRO DE ÉL A CADA BOTÓN. SE EXTRAE LA URL QUE CONTIENE CADA BOTON EN SU DATA-URL Y SE GUARDA EN UNA VARIABLE QUE USAMOS PARA REDIRIGIRNOS A LA VENTANA CORRESPONDIENTE.
const contenedor_botones = document.getElementById("botones-nav");

// Escuchamos el evento click
contenedor_botones.addEventListener("click", (evento) => {

    // Verificamos que el clic haya sido en un botón con la clase correcta
    const boton = evento.target.closest(".boton-nav");

    // Si no es uno de nuestros botones, ignoramos el clic
    if (!boton) return

    // Obtenemos la ruta guardada en el atributo data-url
    const destino = boton.dataset.url;

    // Cambiamos a la ventana que apunte ese botón
    window.location.href = destino;
});


// PEGO LOS DATOS DEL FORMULARIO AL JS
const fecha_entreno = document.getElementById('fecha_nueva_semana');
const nombre_entreno = document.getElementById('nombre_entreno');
const boton_crear_entreno = document.getElementById('crear-entrenamiento');

// FUNCIÓN QUE CREA UN ENTRENAMIENTO Y LO GUARDA EN EL ARRAY DE ENTRENAMIENTOS QUE YA ESTABA CREADO
async function crearEntrenamiento(nombre, fecha) {
    const entrenamiento = {
        id: Date.now(),
        nombre,
        fecha,
        ejercicios: []
    };

    // GUARDO EL ENTRENAMIENTO EN LA BD
    await guardarEntrenamiento(entrenamiento);
}

// 2. Escuchas el clic del botón
boton_crear_entreno.addEventListener('click', function (event) {
    // Evita que la página se recargue si el botón está dentro de un <form>
    event.preventDefault();
    // 3. OBTENGO LOS VALORES JUSTO AHORA (cuando el usuario ya escribió)

    // SI LA FECHA SE DEJA VACÍA, SE TOMA POR DEFECTO EL DÍA ACTUAL
    if(fecha_entreno.value === '') {

        const hoy = new Date();
        const year = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
        const dia = String(hoy.getDate()).padStart(2, '0');
        fecha_entreno.value = `${year}-${mes}-${dia}`;
    }

    let fecha_ingresada = fecha_entreno.value;
    let nombre_ingresado = nombre_entreno.value;
    crearEntrenamiento(nombre_ingresado, fecha_ingresada);

    nombre_entreno.value = "";
    fecha_entreno.value = "";

});

window.onload = async function () {

    // CREO O ABRO LA BD PARA PODER HACER OPS RELACIONADAS CON ELLA
    await inicializarBaseDeDatos();

    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    document.getElementById("frase_aleatoria").textContent = frases[indiceAleatorio];
}