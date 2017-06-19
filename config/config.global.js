var config = module.exports = {};

config.env = 'development';
config.hostname = 'localhost';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'mongodb://'+config.hostname+':3000/casla_dev';
