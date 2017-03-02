# Professional Node Server

![Professional Node Server](http://oi66.tinypic.com/2gy7wy0.jpg)

*Proffesional Node Server* en un servidor NodeJS con todas las funcionalidades necesarias para un desarrollo profesional. Entre sus funcionalidades incluye:

  - Arquitectura estructurada en capas.
  - Entornos de desarrollo, producción y test.
  - Configuración sencilla a través de un fichero de variables de entorno.
  - API REST con ejemplos.
  - Generación automática de datasets para desarrollo.
  - Tests de integración automatizados con Mocha y Chai.
  - Seguridad del servidor con JWT, niveles de acceso a la API y rutas estáticas de ExpressJS.
  - Seguridad de la BD con niveles de acceso para entornos de producción.
  - Balanceo de carga automático.
  - Implementación para uso multiplataforma.
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
* Debido al uso del paquete de encriptación [bcrypt](https://www.npmjs.com/package/bcrypt) debes instalar las dependencias del paquete [node-gyp](https://github.com/nodejs/node-gyp) (Python 2.x y un compilador de C/C++) puedes ver como hacerlo [aquí](https://github.com/nodejs/node-gyp#installation)


## Get started
Clona el proyecto e instala las dependencias:
```sh
$ npm install
```
Arranca un servicio de mongodb:
```sh
$ mongod
```
Si quieres, ejecuta los tests:
```sh
$ npm test
```
Para lanzar el servidor en modo *entorno de desarrollo* ejecuta: 
> En su [apartado](#entorno-de-desarrollo) específico puedes ver los detalles del funcionamiento de este script.

```sh
$ npm run dev
```
Para lanzar el servidor en modo *entorno de producción* ejecuta:

> Por motivos de seguridad para utilizar el *entorno de producción* debes crear un usuario con privilegios en la base de datos y lanzar el servicio *mongod* con el modo de autenticación habilitado. Puedes ver como hacerlo en el apartado de [entorno de producción](#entorno-de-produccion).

```sh
$ npm start
```

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
Para lanzar el servidor en modo *entorno de desarrollo* ejecuta: 
```sh
$ npm run dev
```
Además de levantar el servidor, este comando realiza un paso previo en el que genera un dataset para pruebas. Para crear este dataset utiliza la configuración definida en el el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json)

>El dataset es generado con el paquete *mongo-dataset-generator*. [Aquí](https://github.com/mongodb-js/dataset-generator) puedes consultar la manera de crear tu dataset personalizado.

En este modo el servidor es lanzado con [nodemon](https://www.npmjs.com/package/nodemon) por lo que el servidor se reiniciará con cada cambio en el código que se guarde. 

En este modo además, se mostrará por consola un log con las peticiones recibidas por el servidor usando la configuración *dev* del paquete para logs [morgan](https://www.npmjs.com/package/morgan).

Si simplemente quieres generar el dataset e importarlo a tu base de datos pero no lanzar el servidor puedes ejecutar:
```sh
$ npm run dataset-import
```

## Entorno de producción
Para lanzar el servidor en el modo *entorno de producción*, debes haber dado de alta al usuario que especifiques en el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json). Este usuario debe tener como mínimo [permisos](https://docs.mongodb.com/manual/reference/built-in-roles/) *readWrite*. 

> Si no sabes como crear este usuario puedes aprender cómo en la [documentación oficial](https://docs.mongodb.com/manual/tutorial/enable-authentication/) de *MongoDB*. 

Utilizando la configuración por defecto de este proyecto, podrías crear un usuario de la siguiente manera:

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
Recuerda que para ejecutar el servidor en el modo *entorno de producción*, debes levantar el servicio de base de datos con la seguridad habilitada:
```sh
$ mongod --auth
```
Si tu base de datos está configurada correctamente, puedes lanzar el servidor ejecutando:
```sh
$ npm start
```

>Este comando levanta el proceso utilizando el paquete [pm2](https://www.npmjs.com/package/pm2) y almacena logs rotativos utilizando la configuración fijada en el [package.json](https://github.com/rcalcaraz/professional-node-server/blob/master/package.json) con el estilo estandar de *Apache*. 

Puedes ejecutar todos los comandos de *pm2* que consideres necesarios. Por ejemplo, para monitorizar el estado del servidor en tiempo real utiliza:

```sh
$ pm2 monit
```
![Monitorización](http://oi63.tinypic.com/ehgkma.jpg)
Si quieres lanzar tu aplicación de manera clusterizada para aprovechar todas las CPUs de tu máquina utiliza:
```sh
$ npm start-cluster
```
Para pausar cualquier ejecución:
```sh
$ npm stop
```
Para eliminar todas las instancias lanzadas:
```sh
$ npm run delete-all
```
Para reiniciar el servidor (tras haber realizado *npm stop*)
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
La aplicación se encuentra dividida en varias capas con la intención de promover el bajo acomplamiento. A continuación se puede ver un esquema del sistema.

![Arquitectura](http://oi68.tinypic.com/9rjcdx.jpg)

## API REST
El proyecto incluye a modo de ejemplo una API REST completa con los modelos de datos **user** y **car**. Algunos de los *endpoints* se encuentran protegidos con [Jason Web Tokens](https://www.npmjs.com/package/jsonwebtoken) y niveles de acceso. Esta seguridad es implementada a través de *middlewares* como puede verse en el siguiente ejemplo:

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


>El *Content-Type* de todas las peticiones realizadas a la API deben ser *application/x-www-form-urlencoded*
Para obtener un token debe realizarse una petición **POST** al endpoint **/session** enviado en el body un usuario válido. Todos los ejemplos de llamadas a la API pueden verse en la colección de [Postman](https://www.getpostman.com/) [adjuntada](https://github.com/rcalcaraz/professional-node-server/blob/master/node-professional.postman_collection.json) en el proyecto.

Los *endpoints* utilizan el *middleware* **auth.jwtVerify** si para acceder al recurso es necesario enviar un token válido y **auth.isAdmin** si solo es accesible por un usuario con rol de administrador.

Para obtener un token debe realizarse una petición **POST** al endpoint **/session** enviado en el body un usuario válido. Todos los ejemplos de llamadas a la API pueden verse en la colección de [Postman](https://www.getpostman.com/) [adjuntada](https://github.com/rcalcaraz/professional-node-server/blob/master/node-professional.postman_collection.json) en el proyecto.

### Todos
 - Incluir la configuración para despligues automáticos con **pm2**
 
### License
----
[MIT](https://opensource.org/licenses/MIT)
