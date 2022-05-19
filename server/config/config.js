//check env
var env = process.env.NODE_ENV || 'development';
// fetch env config
console.log('env = ' + env);
var config = require('./config.json')
var envConfig = config[env];
console.log(' env config');
console.log(envConfig);
//adding config to env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
