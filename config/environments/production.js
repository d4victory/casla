module.exports = {
  db: 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla',
  env: 'production',
  port: process.env.PORT, // heroku settings
  nodeClientUrl: 'http://localhost:' + process.env.PORT,
  mongo: {
    db: 'casla',
    uri: 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla',
    username: 'copaviejogasometro',
    password: 'Ka1438657'
  }
};
