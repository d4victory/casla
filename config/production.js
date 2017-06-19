var config = module.exports = {};

config.env = 'production';
config.hostname = 'copaviejogasometro.com';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'casla';
