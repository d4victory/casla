var config = module.exports = {};

config.env = 'development';
config.hostname = 'localhost';
config.mongo.db = 'casla_dev';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'mongodb://'+config.hostname+':3000/'+config.mongo.db+';
