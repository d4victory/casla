module.exports = {
  env: 'development',
  mongo: {
    uri: process.env.MONGO_URI || 'localhost'
  }
};
