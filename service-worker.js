const CACHE_NAME = "gym-tracker-v8";

const ARCHIVOS_CACHE = [
    "./",
    // INDEX
    "./index.html",
    "./index.js",
    "./estilos_index.css",
    // SECCIÓN EJERCICIOS
    "./seccion_ejercicios.html",
    "./seccion_ejercicios.js",
    "./estilos_ejercicios.css",
    // SECCIÓN ENTRENOS
    "./seccion_entrenos.html",
    "./seccion_entrenos.js",
    "./estilos_seccion_entrenos.css",
    //SECCIÓN ESTADÍSTICAS
    "./seccion_estadisticas.html",
    "./seccion_estadisticas.js",
        "./estilos_estadisticas.css",
        //SECCIÓN PREGUNTAR A UNA IA
        "./preguntar_ia.html",
        "./generar_prompt.js",
        "./estilos_prompt.css",
// BASE DE DATOS
    "./db.js",
    // MANIFEST
        "./manifest.json",
        // MANUAL DE USUARIO
        "./manual_usuario.html",
        //SECCIÓN PLANTILLAS
        "seccion_plantillas.html",
        "seccion_plantillas.js",
        "estilos_seccion_plantillas.css",
// Multimedia de ejercicios
"ejercicios_predeterminados/press_banca.jpeg",
"ejercicios_predeterminados/banca_inclinada.webp",
"ejercicios_predeterminados/press_militar.webp",
"ejercicios_predeterminados/fondos_lastrados.jpg",
"ejercicios_predeterminados/triceps_polea.webp",
"ejercicios_predeterminados/pajaros_altos.webp",
"ejercicios_predeterminados/pajaros_bajos.webp",
"ejercicios_predeterminados/jalon_al_pecho.jpeg",
"ejercicios_predeterminados/remon_con_barra.png",
"ejercicios_predeterminados/Seated+Cable+Row1.webp",
"ejercicios_predeterminados/seated-cable-row2.jpg",
"ejercicios_predeterminados/face_pull.webp",
"ejercicios_predeterminados/dumbbell-incline-biceps-curl.webp",
"ejercicios_predeterminados/biceps_polea.webp",
"ejercicios_predeterminados/elevaciones_laterales.webp",
"ejercicios_predeterminados/sentadillas.jpg",
"ejercicios_predeterminados/prensa_piernas.jpeg",
"ejercicios_predeterminados/peso_muerto_rumano.webp",
"ejercicios_predeterminados/hipthrust.jpeg",
"ejercicios_predeterminados/gemelos.webp",
"ejercicios_predeterminados/dominadas_lastradas.jpg",
"ejercicios_predeterminados/Machine-Fly-resized.webp"
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", evento => {

    self.skipWaiting();

    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ARCHIVOS_CACHE);
            })
    );
});

// ACTIVACIÓN DEL SERVICE WORKER
self.addEventListener("activate", evento => {
    evento.waitUntil(
        caches.keys().then(nombres => {
            return Promise.all(
                nombres
                    .filter(nombre => nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))
            );
        }).then(()=> self.clients.claim())
    );
});

// INTERCEPTAR PETICIONES
self.addEventListener("fetch", evento => {
    evento.respondWith(
        caches.match(evento.request)
            .then(respuesta => {
                return respuesta || fetch(evento.request);
            })
    );
});