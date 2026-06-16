const CACHE_NAME = "gym-tracker-v1";

const ARCHIVOS_CACHE = [
    "./",
    // INDEX
    "./index.html",
    "./index.js",
    "./estilos_index.css",


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

    console.log("Service Worker activo");

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