var config = require('./config.global');

config.env = 'production';
config.hostname = 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182';
config.mongo.db = 'casla';
config.mongo.uri = config.hostname+'/'+config.mongo.db;

module.exports = config;


