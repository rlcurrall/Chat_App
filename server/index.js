/*
 |------------------------------------------------------------------------------
 | Bootstrap the Application
 |------------------------------------------------------------------------------
 |
 | Set all necessary environment variables.
 |
 */
require('./bootstrap');


/*
 |------------------------------------------------------------------------------
 | Create the Server
 |------------------------------------------------------------------------------
 |
 | Create an instance of the server. Boot the server to start processing
 | requests.
 |
 */
const { Server } = require('./app/server');

const server = new Server();

server.boot();
