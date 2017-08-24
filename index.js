// Setup node-config to read env configs from '/config/environments'
var path = require ('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '/config/environments');


var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    config = require('config'),
    port = process.env.PORT || config.port,
    options = require("options"),
    Client = require('node-rest-client').Client;
// paginate        = require('express-paginate');

//configuro el cliente REST
/*
var clientOptions = {
    // proxy configuration
    proxy: {
        host: "ds123182.mlab.com", // proxy host
        port: 23182, // proxy port
        user: "copaviejogasometro", // proxy username if required
        password: "Ka1438657" // proxy pass if required
    },
    // aditional connection options passed to node http.request y https.request methods
    // (ie: options to connect to IIS with SSL)
    connection: {
        //secureOptions: constants.SSL_OP_NO_TLSv1_2,
        ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM'
        //honorCipherOrder: true
    },
    // will replace content-types used to match responses in JSON and XML parsers
    mimetypes: {
        json: ["application/json", "application/json;charset=utf-8"],
        xml: ["application/xml", "application/xml;charset=utf-8"]
    },
    //user: "admin", // basic http auth username if required
    //password: "123", // basic http auth password if required
    requestConfig: {
        timeout: 5000, //request timeout in milliseconds
        noDelay: true, //Enable/disable the Nagle algorithm
        keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
        keepAliveDelay: 5000 //and optionally set the initial delay before the first keepalive probe is sent
    },
    responseConfig: {
        timeout: 5000 //response timeout
    }
};
*/

client = new Client({
  proxy: {
    host: config.hostname,
    port: config.port,
    user: config.mongo.dbUsername,
    password: config.mongo.dbPassword
  },
});

//configuro Swagger
var swagger = require('./config/swaggerConfig')(app);

//configuro logger
var logger = require('./logger');

// Connection to DB
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
                ciphers: 'DES-CBC3-SHA'};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connection with database: ' + config.mongo.uri + ' was successfully.');
});

mongoose.connect(config.mongo.uri, { useMongooseUri: true});

//mongoose.connect(cfg.mongo.uri,options, function (err, res) {
//    if (err) throw err;
//    console.log('Connected to Database:' + cfg.mongo.uri);
//});

//mongoose.connect('mongodb://localhost/casla', function(err, res) {
//  if(err) throw err;
//  console.log('Connected to Database');
//});

require('./config/passport')(passport, logger); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// required for passport
app.use(session({secret: 'lancha-dante'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var models = require('./models/includingModels')(app, mongoose);

// routes ======================================================================
require('./config/routes.js')(express, app, passport, client, logger); // load our routes and pass in our app and fully configured passport
require('./config/admin')(app);
require('./config/delegados')(app);
require('./config/planilleros')(app);
//require('./config/jugadorRoutes')(express,app);

// Start server
app.listen(port, function () {
    console.log(process.version)
    logger.info("Node server running on port:" + port);
    logger.debug('Debugging info');
});
