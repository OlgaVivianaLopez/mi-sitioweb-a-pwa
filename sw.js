/* creamos cache */
const CACHE_NAME= "v1_cache_programador_fitness",
urlsToCache=[
    "./",
    "https://fonts.googleapis.com/css?family=Raleway:400,700",
    "https://font.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2",
    "https://use.fontawesome.com.com/releases/v5.0.7/css/all.css",
    "httsp://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2",
    "./style.css",
    "./script.js",
    "./img/Mi sitio Web PWA.png",
    "./img/favicon.png"
]

/*eventos del service worked*/

/* almacena en cache*/
self.addEventListener("install",e=>{
e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
    return cache.addAll(urlsToCache)
    .then(()=>self.skipWaiting())
    })
    .catch(err=>console.log("Fallo registro de cache", err))
)
})


/*sin conexion: busca info en cache*/
self.addEventListener("activate",e=>{
const cacheWhitelist=[CACHE_NAME]

e.waitUntil(
    caches.keys()
    .then(cachesNames =>{
        /*eliminamos el cache que no sirve*/
        cachesNames.map(cacheName=>{
        if(cacheWhitelist.indexOf(cacheName) ===-1){
            return caches.delete(cacheName)
        }
    })
})
/*le indica al sw activar el cache actual*/
.then(()=>self.clients.claim())
)
})

/*recupera/actualiza recursos del navegador*/
self.addEventListener("fetch",e=>{
e.respondWith(
    caches.match(e.request)
    .then(res=>{
        if(res){
            /*recuperar del cache*/
            return res
        }
        /*recupera de la peticion a la url*/
        return fetch(e.request)
    })
)
    
})