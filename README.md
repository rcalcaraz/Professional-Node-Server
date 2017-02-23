# Professional Node Server

![Professional Node Server](http://oi66.tinypic.com/2gy7wy0.jpg)

Este proyecto consiste en un servidor NodeJS con todas las funcionalidades básicas necesarias para un desarrollo profesional. Entre sus funcionalidades incluye:

  - Arquitectura estructurada en capas.
  - Entornos de desarrollo, producción y test.
  - Configuración sencilla a través de un fichero de variables de entorno.
  - API REST con ejemplos.
  - Generación automática de datasets para desarrollo.
  - Tests de integración automatizados con Mocha y Chai.
  - Seguridad del servidor con JWT, niveles de acceso a la API y rutas estáticas de ExpressJS.
  - Seguridad y niveles de acceso a la BD para entornos de producción.
  - Balanceo de carga automático.
  - Implementado para uso multiplataforma.
  - Logs de acceso, error y monitorización en vivo.
 
## Índice
- [Requisitos previos](#requisitos-previos)
- [Get started](#get-started)
- [Configuración](#configuración)
- [Entorno de desarrollo](#entorno-de-desarrollo)
- [Entorno de producción](#entorno-de-producción)
- [Tests](#tests)
- [Arquitectura](#arquitectura)
- [API REST](#api-rest)
- [License](#license)


## Requisitos previos

* [Node JS](https://nodejs.org/es/)
* [Mongo DB](https://docs.mongodb.com/) 
* Debido al uso del paquete de encriptación [bcrypt](https://www.npmjs.com/package/bcrypt) es necesario instalar las dependencias del paquete [node-gyp](https://github.com/nodejs/node-gyp) (Python 2.x y un compilador de C/C++) puedes ver como hacerlo [aquí](https://github.com/nodejs/node-gyp#installation)


## Get started
Clona el proyecto e instala las dependencias ejecutando:
```sh
$ npm install
```
Arranca un servicio de mongodb
```sh
$ mongod
```
Para ejecutar los tests simplementa lanza el comando:
```sh
$ npm test
```
En el apartado de [entorno de desarrollo](#entorno-de-desarrollo) puedes ver los detalles de la ejecución. Si simplemente quieres lanzar el script ejecuta:
```sh
$ npm run dev
```
Para lanzar el servidor en un entorno de producción, por motivos de seguridad debes crear un usuario con privilegios en la base de datos y lanzar el servicio *mongod* con el modo de autenticación habilitado. Puedes ver como hacerlo en el apartado de [entorno de producción](#entorno-de-produccion).
```sh
$ npm start
```
Existen más scripts que puedes ejecutar. Puedes ver los detalles en el aparatdo [scripts](#scripts)

## Configuración
Toda la configuración necesaria se encuentra centralizada en el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json). Puedes cambiar la configuración para adaptarla a tus necesidades. En la siguiente tabla puedes ver en detalle el significado de cada una de las variables:

| Variable | Descripción | Valor por defecto |
| ------ | ------ | ------ |
| db_dev_name | Nombre de la base de datos para el entorno de desarrollo | develop-db |
| db_host | Servidor de la base de datos | localhost | 
| db_port | Puerto de escucha de la base de datos | 27017 |
| db_prod_name | Nombre de la base de datos para el entorno de producción | production-db |
| db_prod_user | Usuario de la base de datos para el entorno de producción | myUser |
| db_prod_pass | Contraseña del usuario de la base de datos para el entorno de producción  | pass |
| db_prod_authentication | Nombre de la base de datos de autenticación para el entorno de producción | production-db |
| db_test_name |  Nombre de la base de datos ejecutar los tests | test |
| first_dataset_collection | Nombre de la primera colección de la que generar datasets en el entorno de desarrollo | user |
| first_dataset_elements | Número de elementos de la primera colección para ser generados automáticamente en un dataset en el entorno de desarrollo | 10 |
| first_dataset_output_path | Ruta del archivo para almacenar el dataset de la primera colección | ./dataset/user_dataset.json |
| first_dataset_schema_path | Ruta del archivo donde se encuentra el esquema para generar un dataset de la primera colección  | ./dataset/user_schema.json |
| log_access_path | Ruta para almacenar el log de accesos en el entorno de producción | ./log/access.log |
| log_error_path | Ruta para almacenar el log de errores en el entorno de producción | ./log/error.log |
| log_rotation_days | Dias para la rotación de logs en el entorno de producción | 1 |
| jwt_secret | Clave secreta para la generación de jason web tokens | secret |
| node_port | Puerto por el que escuchará peticiones el servidor | 3000 |
| node_host | Host donde se albergará el servidor | localhost |
| second_dataset_collection | Nombre de la segunda colección de la que generar datasets para el entorno de desarrollo  | car |
| second_dataset_elements | Número de elementos de la segunda colección para ser generados automáticamente en un dataset en el entorno de desarrollo | 10 |
| second_dataset_schema_path |  Ruta del archivo para almacenar el dataset de la segunda colección | ./dataset/car_schema.json |
| second_dataset_output_path | Ruta del archivo donde se encuentra el esquema para generar un dataset de la segunda colección | ./dataset/car_dataset.json |

## Entorno de desarrollo
Puedes lanzar el servidor utilizando el entorno de desarrollo con:
```sh
$ npm run dev
```
Este comando internamente crea un dataset generado a través de la configuración definida en el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json). El dataset es generado con el paquete *mongo-dataset-generator*. Puedes comprobar [aquí](https://github.com/mongodb-js/dataset-generator) los detalles sobre como crear esquemas de generación válidos para tu modelo de datos.

El script es lanzado con [nodemon](https://www.npmjs.com/package/nodemon) por lo que el servidor se reiniciará con cada cambio en el código que se guarde. Paralelamente se mostrará por consola un log con las peticiones recibidas por el servidor usando la configuración *dev* del paquete para logs [morgan](https://www.npmjs.com/package/morgan).

Si simplemente quieres generar el dataset e importarlo a tu base de datos pero no lanzar el servidor puedes ejecutar:
```sh
$ npm run dataset-import
```


## Entorno de producción
Para ejecutar este entorno, tu base de datos de producción debe ser contener al usuario y contraseña fijados en la configuración como mínimo con [permisos](https://docs.mongodb.com/manual/reference/built-in-roles/) *readWrite*.

Si no sabes como crear este usuario puedes utilizar el [tutorial oficial](https://docs.mongodb.com/manual/tutorial/enable-authentication/) de *MongoDB*. Para la configuración por defecto del proyecto, desde la consola de mongo logueado como administrador puedes crear el siguiente usuario:
```sh
$ mongod --auth &
$ mongo -u admin -p admin --authenticationDatabase="admin"
> use production-db
> db.createUser(
  {
    user: "myUser",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "production-db" } ]
  }
);
```
Recuerda que para ejecutar el servidor en el entorno de producción, debes levantar el servicio de base de datos con la seguridad habilitada:
```sh
$ mongod --auth
```
Ya puedes levantar tu servidor con:
```sh
$ npm start
```
Este comando levanta el proceso utilizando el paquete [pm2](https://www.npmjs.com/package/pm2). Almacena logs rotativos utilizando la configuración fijada en el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json) con el estilo estandar de *Apache*. Puedes ejecutar todos los comandos de *pm2* que consideres necesarios. Por ejemplo, para monitorizar el estado del servidor en tiempo real utiliza:
```sh
$ pm2 monit
```
![Monitorización](http://oi63.tinypic.com/ehgkma.jpg)
Si quieres lanzar tu aplicación de manera clusterizada para aprovechar todas las CPUs de tu máquina utiliza:
```sh
$ npm start-cluster
```
Para parar cualquiera de estas dos ejecuciones (simple o clusterizada) ejecuta:
```sh
$ npm stop
```
Para eliminar las instancias lanzadas por completo en ambas ejecuciones:
```sh
$ npm run delete-all
```
Por último para reiniciar el servidor tras haber realizado *npm stop*
```sh
$ npm restart
```
```sh
$ npm run restart-cluster
```
## Tests
Para lanzar los tests simplemente debes invocar el siguiente comando:
```sh
$ npm test
```
Se lanzarán tests automatizados con [mocha](https://www.npmjs.com/package/mocha) y [chai](https://www.npmjs.com/package/chai)

![Tests](http://oi68.tinypic.com/9k04s6.jpg)

## Arquitectura
La aplicación se encuentra dividida en varias capas con la intención de promover el bajo acomplamiento de las mismas. A continuación se puede ver un esquema de la misma.

![Arquitectura](http://oi68.tinypic.com/9rjcdx.jpg)

## API REST
El proyecto incluye a modo de ejemplo una API REST completa con los modelos **user** y **car** para mongoose. Parte de estas rutas están protegidas con [Jason Web Tokens](https://www.npmjs.com/package/jsonwebtoken) y niveles de acceso.

El *Content-Type* de todas las peticiones realizadas a la API deben ser *application/x-www-form-urlencoded*

Un ejemplo de la definición de las rutas sería el siguiente:

```sh
// ./server/routes/car.js
 app.route("/cars")
        .get(auth.jwtVerify, carRest.getAll)
        .post(auth.jwtVerify, carRest.create);
    app.route("/cars/:id")
        .get(auth.jwtVerify, carRest.getById)
        .put(auth.jwtVerify, carRest.update)
        .delete(auth.jwtVerify, auth.isAdmin, carRest.delete);
```
Las rutas pueden utilizar el *middleware* **auth.jwtVerify** si acceder al recurso necesita enviarse un token válido y **auth.isAdmin** si para tener acceso al recurso el token debe haber sido generado por un usuario con rol de administrador.

Para obtener un token debe realizarse una petición **POST** al endpoint **/session** enviado en el body un usuario válido. Todos los ejemplos de llamadas a la API pueden verse en la colección de [Postman](https://www.getpostman.com/) adjuntada en el proyecto.



### Todos
 - Incluir la configuración para despligues automáticos con **pm2**
 
### License
----
[MIT](https://opensource.org/licenses/MIT)
