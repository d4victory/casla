var config = require('./config.global');

config.env = 'production';
//config.hostname = 'copaviejogasometro';
//config.mongo.db = 'mongodb://'+config.hostname+':Ka1438657@ds123182.mlab.com:23182/casla';
config.mongo.db = 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla';

module.exports = config;


