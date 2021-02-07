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
npm run start
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
