/**
  Configuration module that exposes the environment variables
  to be used where they are needed
*/
exports.config = function() {
   var envJSON = require('./env.variables.json');
   var node_env = process.env.NODE_ENV || 'development';
   return envJSON[node_env];
 }
