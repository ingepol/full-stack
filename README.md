# Full Stack
## Prueba
Está compuesto por dos aplicaciones, un backend escrito en NodeJS el cual expondrá una API REST para la interacción con 
la aplicación frontend.

## Solucion
La solución cuenta con dos aplicaciones, con arquitecturas mvc cuya distirbución, agrupación de carpetas y archivos permiten 
una mayor escabilibidad: 
- Un API Restfull hecha con nodejs, express y mongo. 
- Un client web hecho con angulajs y para el responsive el framework [ED-GRID](http://ed-grid.com/)
Para finalmente tener una aplicación full stack MEAN (MongoDB, Express, Angular y Node.js)

### Api Rest
Estructura de carpetas:
- **Models:** Contiene los schemas utilizados para representar la información y obtener la conexión a la base de datos mongo por medico 
de un modulo de conexion (connection-db.js).  Para el ejemplo contiene el modelo Hotel (hotel.js).
- **Controllers:** Contiene cada uno de los controladores que se encargaran de realizar alguna consulta por medio de un modelo 
concreto a la base de datos.  Para el ejemplo contiene el controlador de Hotel (hotelCtrl.js).
- **Routes:** Contiene cada uno de las rutas (endpoints-recursos) que seran expuestas por nuestra API para que sean consumidas por 
un cliente Web.  Para el ejemplo contiene las rutas encargadas de administrar los Hoteles (hotelRoute.js).
- **Libs:** Contiene librerias o modulos propios para realizar alguna tarea de configuracion o de conexión a la base de datos.
- Archivo env.variables.json contiene un JSON con las variable de entorno para los diferente aminientes development, test, production.

### Prerequisitos

NodeJs 8.9.4, Npm 5.6.0 y mongo 3.4.

Para trabajar con la base de datos mongo pueden utilizar un contenedor docker (tener encuenta modificar el parametro db del ambiente
correspondiente, encontrado en el archivo env.variables.json ), este es el comando para ejecutar el contenedor:

```bash
docker run -it 
-e MONGODB_ADMIN_USER=admin 
-e MONGODB_ADMIN_PASS=adminP4ss 
-e MONGODB_APPLICATION_DATABASE=appdb 
-e MONGODB_APPLICATION_USER=appuser 
-e MONGODB_APPLICATION_PASS=appP4ss -es 
-p 27017:27017 alexpunct/mongo:3.4
```
**_Nota:_** Cada vez que se ejecuta el contenedor se borra la info)

### Instalar y ejecutar
```bash
npm install
npm start
npm run env NODE_ENV=production - ejecutar para producción ( configurar ambiente en env.variables.json)
NODE_ENV=development node server.js || node server.js - ejecutar para desarrollo
```

### Client Web
Aplicación angular que dentro la carpeta **app** tiene una distribucción tipo mvc.   Tiene una carepeta para contener los componentes,
modelos, servicios y vistas.  La carpeta **assets** contiene los recursos como imaganes e iconos y la carpeta **styles** que contien
archivos sass.

Para que la aplicación sea responsive se utilizo el framework EDGrid.


### Instalar y ejecutar
```bash
npm install
npm start
npm run-script build -  Compilar y construir la aplicación para desplegar en un ambiente de producción con archivos minificados y ofuscados
```


