module.exports = {
  db: 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla',
  env: 'production',
  hostname: 'keroku-casla.herokuapp.com',
  port: process.env.PORT, // heroku settings
  nodeClientUrl: 'http://keroku-casla.herokuapp.com:' + process.env.PORT,
  mongo: {
    db: 'casla',
    uri: 'mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla',
    username: 'copaviejogasometro',
    password: 'Ka1438657'
  }
};
