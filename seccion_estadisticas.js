
window.onload = async function () {
    await inicializarBaseDeDatos();

    let entrenamientos = await obtenerEntrenamientos();

    let peso_maximo_ejercicio = 0;

    let peso_levantado_acumulado = 0;

    let volumen_por_entreno = 0;

    let total_entrenos = 0;

    let total_ejercicios = 0;


entrenamientos.forEach(entreno => {

            // LOǴICA DEL TOTAL DE ENTRENOS, OK
           total_entrenos++;

    entreno.ejercicios.forEach(ejercicio => {

        total_ejercicios++;

        ejercicio.series.forEach(serie => {

           
            // LÓGICA DEL PESO MÁXIMO, OK
            if(serie.kg > peso_maximo_ejercicio ){
                peso_maximo_ejercicio = serie.kg;
            }

            // LÓGICA DEL VOLUMEN POR ENTRENO
            if((serie.kg * serie.reps) > volumen_por_entreno){
                volumen_por_entreno = (serie.kg * serie.reps);
            }

            peso_levantado_acumulado += serie.kg;
            
        });
    });
})

let info_estadisticas = 
`<ol>
      <li>Peso máximo levantado: <span class="num">${peso_maximo_ejercicio} kg</span></li>
        <li>Peso levantado acumulado: <span class="num">${peso_levantado_acumulado} kg</span></li>
       <li>Volumen de entreno acumulado: <span class="num">${volumen_por_entreno} kg</span></li>
       <li>Total de entrenos: <span class="num">${total_entrenos} entrenos</span></li>
       <li>Total de ejercicios: <span class="num">${total_ejercicios} ejercicios.</span></li>
    </ol>`;

    const div_info_estadisticas = document.querySelector('.mostrar_estadisticas');

    div_info_estadisticas.innerHTML = info_estadisticas;

}
