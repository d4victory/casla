module.exports = {
  env: 'production',
  port: process.env.PORT, // heroku settings
  requestBase: 'http://localhost:' + process.env.PORT,
  mongo: {
    db: 'casla',
    uri: 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla',
    username: 'copaviejogasometro',
    password: 'Ka1438657'
  }
};
