# NODEPOP

Este proyecto proporciona una API que proporciona diferentes funcionalidades:
[Versión Base]
- Sobre la visualización de productos y su filtrado. 
- Creación de nuevos productos.
- Visualización de Tags.

[Versión Extendida - Engloba funciones de la Versión Base]
- Actualización de productos (por interfaz gráfica, vía website).
- Borrado de productos ( por interfaz gráfica, vía website)

Las técnologías implementadas para desarrollarla son la siguientes:
- Javascript
- Node.js
- MongoDB
- HTML
- CSS

# Iniciando el proyecto

## Iniciamos la Base de Datos
- Iniciar servidor MongoDB

```bash
npm run initdb
```

## Iniciamos la aplicación 

```bash
npx pm2 start

/**
* En esta segunda versión de Nodepop arrancamos el proyecto con
* con el gestor de proyectos PM2, arranacando de manera simultanea:
* - Nodepop.
* - Microservicio generateThumbnail 
**/
```

## Detalles de rutas

### Rutas Api

localhost:3000/api/products
 - Proporciona una llamada GET que muestra todos los productos.
 - Propociona una llamada POST que permite crear un nuevo producto.
    ==> Referencia de prubas POSTMAN (./documentation/NODEPOP.api_methods.json).

localhost:3000/api/products/tags
- Proporciona  una llamada GET que muestra todos los tags alamacenados en la Base de datos.
    ==> Referencia de prubas POSTMAN (./documentation/NODEPOP.api_methods.json).


# Ampliación Backend Avanzado
TODO => Tras la ampliación de la app, algunos aspectos del front original hay que ajustarlos como es el caso de la petición por axios al backend para solicitar todos los tags.<br>
También se va a implemtar dos tipos de visualizaciones del front en rejilla y lista. Par mostrar las imágenes en formato extendido en un caso y usando los thmbnails generados en el otro. )observar iconos  insertados para tal fin, a falta de darles funcionalidad).
## Autenticación
- Autenticación en API:<br>
    Impelementación de autenticación don JWT para los middlewares de la API.<br>
    Métodos de prueba:<br>
    1. POSTMAN: POST => http://localhost:3000/api/login { email, password}
    2. NAVEGADOR: http://localhost:300/api/login Tenemos un formulario para probar la implementación y obtenemos un json como respuesta con el token así como instrucciones para hacer peticiones al API desde postman.<br>
    Usuarios => /libs/initDB/user.json<br>
    ```bash
    "email":"user@example.com",
    "password":"1234"
    ```
    
## Internacionalización
- Implementación de internacionalización con i18n. 
- Idiomas implementados en la parte de frontentd Inglés y Español.

## Subida de imágenes
- Implementación de subida de imágenes con Multer en endpoint de API "createProduct", junto con microservicio para creación de thumbnails:
```bash
thumbnailGeneratorService.js
thumbnailGeneratorRequester.js
```
Se puede consultar el listado de imágenes thumbnails existentes en http://localhost:3000/api/products/thumbnails

## Testing
- Por implementar
## BONUS TRACK (creación de módulo libre)
https://www.npmjs.com/package/batch_image_processor

# URL Despliegue en servidores
## Despligue Node + Mongo: http://ec2-35-174-54-33.compute-1.amazonaws.com/
```bash
    "email":"user@example.com",
    "password":"1234"
 ```
## Despliegue React: http://35.174.54.33/
