# Professional Node Server

[![Professional Node Server](https://lh5.googleusercontent.com/X28PrEa7sry3Khz4XNIrxrqi54l3_oLiy4fnKBbW4FhLRMM6ijXDMXj7oNR-2tql4P2LeSS8nEhyvQY=w1347-h584)](https://nodesource.com/products/nsolid)

Este proyecto consiste en un servidor NodeJS con todas las funcionalidades básicas necesarias para un desarrollo profesional. Incluye:

  - Arquitectura estructurada en capas.
  - Entornos de desarrollo, producción y test.
  - Configuración sencilla a través de un fichero de variables de entorno.
  - API REST con ejemplos.
  - Generación automática de datasets para desarrollo.
  - Tests de integración automatizados con Mocha y Chai.
  - Seguridad del servidor con JWT, niveles de acceso a la API y rutas estáticas de ExpressJS.
  - Seguridad y niveles de acceso a la BD.
  - Balanceo de carga automático.
  - Implementado para uso multiplataforma.
  - Logs de acceso, error y monitorización en vivo

# Requisitos previos

* [Node JS](https://nodejs.org/es/)
* [Mongo DB](https://docs.mongodb.com/) 

Antes de comenzar debes configurar tu base de datos de MongoDB para aprovechar las medidas de seguridad. Para lograrlo sigue los siguientes pasos:

Arranca el servicio de base de datos sin la configuración de seguridad. Accede a la base de datos *admin* y crea un usuario que permita configurar roles de otros usuarios.
```sh
$ mongod
$ mongo
use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```
> En este tutorial utilizaremos las bases de datos **development-db** para el entorno de producción, **production-db** para el entorno de producción y **test** para ejecutar los tests. Puedes cambiarlas por las bases de datos que consideres oportuno.

Una vez creado este usuario podemos loguearnos con él y crear nuestros usuarios de acceso a la base de datos. 
```sh
$ mongo -u "admin" -p "admin" --authenticationDatabase "admin"
use development-db
db.createUser(
  {
    user: "myDeveloper",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "development-db" } ]
  }
);
use production-db
db.createUser(
  {
    user: "myUser",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "production-db" } ]
  }
);
use test
db.createUser(
  {
    user: "myTester",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "test" } ]
  }
);
```
Una vez hayas creado los usuarios que permiten acceder con seguridad a las bases de datos relanza el proceso de mongo con las opciones de seguridad habilitadas:
```sh
$ mongod --auth
```
# Instalación
Una vez clonado el proyecto sitúate en la raiz e instala todos los paquetes necesarios ejecutando:
```sh
npm install
```
# Ejecución
Los scripts de ejcución se describen en el package.json. Existen scripts para una ejecución en entorno de desarrollo, en entorno de producción y para la ejecucion de tests. Todos ellos comparten un archivo .env de configuración que debes editar con tu configuración personal.

| Variable | Descripción | Valor por defecto |
| ------ | ------ | ------ |
| DB_HOST | La IP del Host donde se encuentra la base de datos | localhost |
| DB_PORT | El puerto de escucha de la base de datos | 27017 | 
| DB_USER | El nombre de usuario con acceso a la base de datos de producción | myUser |
| DB_PASS | La contraseña del de usuario con acceso a la base de datos de producción | pass
| DB_AUTHENTICATION | Nombre de la base de datos de autenticación | production-db |
| DB_NAME | Nombre de la base de datos de producción | production-db |
| NODE_PORT | Puerto por el que escuchará el servidor | 3000 |
| NODE_HOST | IP del Host donde está alojado el servidor | localhost |
| JWT_SECRET | Palabra secreta par la encriptación de los Tokens | secret |
| LOG_ROTATION_DAYS | Dias para la rotación de logs | 1 |

## Desarrollo
Para ejecutar el servidor en un entorno de desarrollo lanza exclusivamente el siguiente comando:
```sh
npm run dev
```

De manera automática antes de la ejecución para desarrollo se lanzan dos scripts, uno para generar un dataset y otro para importarlo en la base de datos.
```sh
 "predev": "npm run -s dataset && npm run -s import"
```
El script que genera el dataset hace uso de los modelos de datos descritos en la carpeta dataset. Puedes cambiar estos modelos para adaptarlos a tus necesidades. [Más info](https://github.com/mongodb-js/dataset-generator)
```sh
 "dataset": "mongodb-dataset-generator ./dataset/user_schema.json -n 10 -o ./dataset/user_dataset.json && mongodb-dataset-generator ./dataset/car_schema.json -n 10 -o ./dataset/car_dataset.json"
```
Una vez generados los datasets estos deben ser importados a la base de datos de desarrollo. Si has utilizado un nombre diferente para el usuario, pass o contraseña de los seguidos en este tutorial **debes sustirlos**.
```sh
 "import": "mongoimport -u myDeveloper -p pass --authenticationDatabase=development-db --db development-db --collection user --drop --type json --file ./dataset/user_dataset.json --jsonArray && mongoimport -u myDeveloper -p pass --authenticationDatabase=development-db --db development-db --collection car --drop --type json --file ./dataset/car_dataset.json --jsonArray",
```
Por último se lanza el script de ejecución para desarrollo. Al igual que en el script anterior **debes sustituir** los nombres de variables de entorno por las variables que hayas utilizado
```sh
"dev": "cross-env NODE_ENV=dev DB_NAME=development-db DB_USER=myDeveloper DB_PASS=pass DB_AUTHENTICATION=development-db nodemon ./app.js",
```
En este modo de ejecución todos los *logs* son mostrados por consola con la configuración *dev* de [Morgan](https://www.npmjs.com/package/morgan)

## Producción
Para lanzar el servidor en un entorno de producción ejecuta:
```sh
npm start
```
Puedes reiniciar el servidor lanzando:
```sh
npm run restart
```
También existe un comando alternativo para lanzar el servidor clusterizándolo automáticamente entre las diferentes *CPUs* con que cuente tu máquina:
```sh
npm run start-cluster
```
Puedes reiniciar el cluster lanzando:
```sh
npm run restart-cluster
```
Para parar el en cualquiera de los dos modos:
```sh
npm stop
```
El entorno de ejecución utiliza [pm2](http://pm2.keymetrics.io/) y puedes hacer uso de cualquier comando de este paquete que te sea de utilidad, por ejemplo puedes ver una pantalla de monitorización completa ejecutando:
```sh
pm2 monit
```
![Monitor pm2](http://pm2.keymetrics.io/images/pm2-monit.png)]
Este modo de ejecución guarda logs de error y de acceso en la carpeta logs con estilo tradicional de Apache.
## Test
Para lanzar los tests de integración ejecuta:
```sh
npm test
```
Si has cambiado los nombres de usuarios y bases de datos, debes modificar el script *test* del package.json
```sh
 "test": "cross-env NODE_ENV=test DB_NAME=test DB_USER=myTester DB_PASS=pass DB_AUTHENTICATION=test mocha --reporter list"
```
### Todos
 - Explicar middlewares de seguridad para la API
 - Simplificar Readme
 - Figura con la arquitectura y directorios
 - Crear colección de POSTMan
 - Actualizar git
 - pm2 deployment
 
License
----
MIT 
