// LÓGICA PARA GENERAR EL PROMPT DE IA A PARTIR DE UN ENTRENAMIENTO

const selector_entrenamiento = document.getElementById('selector-entrenamiento');
const contenedor_prompt = document.getElementById('contenedor-prompt');
const texto_prompt = document.getElementById('texto-prompt');
const boton_copiar = document.getElementById('copiar-prompt');
const mensaje_copiado = document.getElementById('mensaje-copiado');

// RELLENA EL SELECTOR CON TODOS LOS ENTRENAMIENTOS GUARDADOS
async function cargarSelectorEntrenamientos() {

    const entrenamientos = await obtenerEntrenamientos();

    entrenamientos.forEach(entreno => {
        const opcion = document.createElement('option');
        opcion.value = entreno.id;
        opcion.textContent = `${entreno.nombre} — ${entreno.fecha}`;
        selector_entrenamiento.appendChild(opcion);
    });
}

// CONSTRUYE EL TEXTO DEL PROMPT A PARTIR DE UN ENTRENAMIENTO
function generarPrompt(entreno) {

    let detalleEjercicios = "";

    entreno.ejercicios.forEach(ejercicio => {
        detalleEjercicios += `\n- ${ejercicio.nombre}:`;
        ejercicio.series.forEach((serie, i) => {
            detalleEjercicios += `\n   Serie ${i + 1}: ${serie.kg}kg x ${serie.reps} reps`;
        });
    });

    let prompt = `Dame retroalimentación y estadísticas detalladas sobre mi entrenamiento. Compáralo con entrenamientos anteriores que te haya pasado anteriormente.\n\n`;
    prompt += `Entrenamiento: ${entreno.nombre}\n`;
    prompt += `Fecha: ${entreno.fecha}\n`;

    if (entreno.nota) {
        prompt += `Notas: ${entreno.nota}\n`;
    }

    prompt += `Ejercicios:${detalleEjercicios}`;

    return prompt;
}

// AL ELEGIR UN ENTRENAMIENTO, SE GENERA Y MUESTRA SU PROMPT
selector_entrenamiento.addEventListener('change', async () => {

    const idSeleccionado = selector_entrenamiento.value;

    // SI SE VUELVE A LA OPCIÓN VACÍA, SE OCULTA EL PROMPT
    if (idSeleccionado === '') {
        contenedor_prompt.classList.add('oculto');
        return;
    }

    const entreno = await ObtenerEntreno(Number(idSeleccionado));

    texto_prompt.textContent = generarPrompt(entreno);

    contenedor_prompt.classList.remove('oculto');
    mensaje_copiado.classList.add('oculto');
});

// COPIA EL PROMPT AL PORTAPAPELES
boton_copiar.addEventListener('click', async () => {

    await navigator.clipboard.writeText(texto_prompt.textContent);

    mensaje_copiado.classList.remove('oculto');

    setTimeout(() => {
        mensaje_copiado.classList.add('oculto');
    }, 2000);
});

window.onload = async function () {

    await inicializarBaseDeDatos();
    await cargarSelectorEntrenamientos();

}