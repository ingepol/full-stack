'use strict'

const app = require('./app');
const config = require('./config-module').config();

/**
  Function that starts the node server in the configured port
*/

app.listen(config.port, () => {
  console.log(`API RESTFull corriendo en http://localhost:${config.port}`);
});
