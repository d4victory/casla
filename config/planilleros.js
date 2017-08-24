//var moment = require('moment');
var cfg = require('config');

module.exports = function(app) {

    app.get('/planillero', isPlanillero, function(req, res) {
        client.get(cfg.nodeClientUrl+"/partido/estado/N.E", function (partidos, response) {
            client.get(cfg.nodeClientUrl+"/equipo", function (equipos, response) {
                var equiposMap =  {};
                for (var i = 0; i < equipos.length; i++) {
                    equiposMap[equipos[i]._id] = equipos[i].nombre;
                };
                client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
                    var divisionesMap =  {};
                    for (var i = 0; i < divisiones.length; i++) {
                        divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                    };
                    client.get(cfg.nodeClientUrl+"/partido/numeros_fechas", function (numeros_fechas, response) {
                        //res.render('./ejs/planilleros/planillero.ejs', {user: req.user, partidos:partidos, message: req.flash('loginMessage'),
                        //										numeros_fechas:numeros_fechas, divisiones:divisionesMap, equipos:equiposMap, resultado: req.session.statusDelete});
                        res.render('./ejs/partidos/partidos.ejs', {user: req.user,
                            partidos:partidos,
                            message: req.flash('loginMessage'),
                            numeros_fechas:numeros_fechas,
                            divisiones:divisiones,
                            divisionesMap:divisionesMap,
                            equipos:equiposMap,
                            resultado: req.session.statusDelete});
                    });
                });
            });
        });
    });

    app.get('/cargarPartido', isPlanillero, function(req, res) {
        console.log('estoy en GET de /cargarPartido, partidoid='+req.query.partidoid);
        client.get(cfg.nodeClientUrl+"/partido/"+req.query.partidoid, function (partido, response) {
            client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
                res.render('./ejs/partidos/cargarPartido.ejs', {user: req.user, divisiones:divisiones, partido: partido, message: req.flash('loginMessage'), resultado: req.session.statusSaved});
            });
        });
    });

    app.post('/cargarPartido', isPlanillero, function(req, res) {
        console.log('estoy en POST de /cargarPartido, partidoid='+req.query.partidoid);

        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };

        console.log(req.body);

        client.put(cfg.nodeClientUrl+"/partido/"+req.query.partidoid, args, function (data, response) {
            data.data["equipo1Old"] = data.equipo1Old;
            data.data["equipo2Old"] = data.equipo2Old;
            data.data["status"] = data.status;
            data.data["statusOld"] = data.statusOld;
            var args2 = {
                data:  data.data ,
                headers: { "Content-Type": "application/json" }
            };
            client.post(cfg.nodeClientUrl+"/posicionEquipo/updatePosicionEquipo/", args2, function (data, response) {
                console.log("PUT /partido");
                res.redirect('/partidos');
            });
        });
    });

}




// route middleware to make sure a user is logged in (DELEGADO)
function isPlanillero(req, res, next) {

    // if user is authenticated in the session, carry on
    if ((req.isAuthenticated()) && ( (req.user.role == "PLANILLERO") || (req.user.role == "ADMIN") ||(req.user.role == "SUPER_ADMIN")))
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
