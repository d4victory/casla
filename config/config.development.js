var config = require('./config.global');

config.env = 'development';

config.hostname = 'localhost';
config.mongo.db = 'casla';

config.mongo.uri = 'mongodb://'+config.hostname+'/'+config.mongo.db;

module.exports = config;
