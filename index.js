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
    port = config.port,
    options = require("options"),
    request = require('request');
// paginate        = require('express-paginate');

// Config request
var client = request.defaults({
  baseUrl: config.requestBase,
  json: true
});

//configuro Swagger
var swagger = require('./config/swaggerConfig')(app);

//configuro logger
var logger = require('./logger');

// Connection to DB
mongoose.connect(config.mongo.uri, { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connection with database: ' + config.mongo.uri + ' was successfully.');
});

// pass passport for configuration
require('./config/passport')(passport, logger);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
require('./config/admin')(app, client);
require('./config/delegados')(app, client);
require('./config/planilleros')(app, client);
//require('./config/jugadorRoutes')(express,app, client);

// Start server
app.listen(port, function () {
    console.log(process.version)
    logger.info("Node server running on port:" + port);
    logger.debug('Debugging info');
});
