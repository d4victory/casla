module.exports = {
  env: 'production',
  port: process.env.PORT, // heroku settings
  requestBase: 'http://localhost:' + process.env.PORT,
  mongo: {
    db: 'adnfutbol',
    uri: 'mongodb://adnfutboluser:Ka1438657@ds145881.mlab.com:45881/adnfutbol',
    username: 'adnfutboluser',
    password: 'Ka1438657'
  }
};
