var config = require('./config.global');

config.env = 'production';
config.hostname = 'mongodb://copaviejogasometro:Ka1438657@ds115752.mlab.com:15752';
config.mongo.db = 'heroku_15ct5z8j';
config.mongo.uri = config.hostname+'/'+config.mongo.db;

module.exports = config;


