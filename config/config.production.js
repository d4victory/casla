var config = require('./config.global');

config.env = 'production';

config.mongo.dbUsername = 'copaviejogasometro'
config.mongo.dbPassword = 'Ka1438657'
config.hostname = 'ds123182.mlab.com:23182';
config.mongo.db = 'casla';

config.mongo.uri = 'mongodb://'+config.mongo.dbUsername+':'+config.mongo.dbPassword+'@'+config.hostname+'/'+config.mongo.db;

module.exports = config;


