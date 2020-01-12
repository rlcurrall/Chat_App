/*
|-------------------------------------------------------------------------------
| Bootstrap the Application
|-------------------------------------------------------------------------------
|
| Execute any pre-boot processes that need to happen before the server can start
| receiving requests.`
|
*/
require('./bootstrap');

/*
|-------------------------------------------------------------------------------
| Create The Server
|-------------------------------------------------------------------------------
|
| Once all pre-boot processes have completed, we will create a new Server
| instance which will register all components of the application.
|
*/
const Server = require('./app/server');

const server = new Server();

server.boot();
