const CACHE_NAME = "gym-tracker-v6";

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

// BASE DE DATOS
    "./db.js",
    // MANIFEST
        "./manifest.json",
        // MANUAL DE USUARIO
        "./manual_usuario.html",
        //Multimedia de ejercicios
        "ejercicios_predeterminados/press_banca.jpeg",
        "ejercicios_predeterminados/banca_inclinada.webp",
        "ejercicios_predeterminados/press_militar.webp",
        "ejercicios_predeterminados/fondos_lastrados.jpg",
        "ejercicios_predeterminados/triceps_polea.webp",
        "ejercicios_predeterminados/pajaros_altos.webp",
        "ejercicios_predeterminados/pajaros_bajos.webp",
        "Dominadas-lastradas-subida-explosiva.png",
        
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", evento => {
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
        })
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