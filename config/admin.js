module.exports = function(app, client) {

    //------------------------------USUARIOS----------------------------------------//
    require("./usuarios.js")(app,isAdmin, client);


    //------------------------------TORNEOS----------------------------------------//
    require("./torneos.js")(app,isAdmin, client);

    //------------------------------EQUIPOS----------------------------------------//
    require("./equipos.js")(app,isAdmin, client);


    //------------------------------PARTIDOS----------------------------------------//
    require("./partidos.js")(app,isAdmin, client);

    //------------------------------DIVISIONES----------------------------------------//
    require("./divisiones.js")(app, isAdmin, client);
    require("./posicionEquipo.js")(app, isAdmin, client);
    require("./fixture.js")(app, isAdmin, client);

    //------------------------------CANCHAS----------------------------------------//
    require("./canchas.js")(app,isAdmin, client);

}

// route middleware to make sure a user is ADMIN
function isAdmin(req, res, next) {
    console.log("ENTRE AL ISADMIN")
    console.log("req: "+req)
    // if user is authenticated in the session, carry on
    if ( (req.isAuthenticated()) && ( (req.user.role == "ADMIN") || (req.user.role == "SUPER_ADMIN"))) // SUPER_ADMIN can access everything
        return next();
    console.log("DIO QUE NO ES ADMINNN")
    // if they aren't redirect them to the home page
    res.redirect('/');
}

