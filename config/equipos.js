var cfg = require('config');

module.exports = function(app,isAdmin) {

    app.get('/equipos', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/equipo", function (equipos, response) {
            client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
                var divisionesMap =  {};
                for (var i = 0; i < divisiones.length; i++) {
                    divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                };
                res.render('./ejs/equipos/equipos.ejs', { message: req.flash('signupMessage'), equipos: equipos, divisionesMap:divisionesMap,
                    divisiones:divisiones, user: req.user, resultado: req.session.statusDelete});
            });
        });
    });

    app.get('/agregarEquipos', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
            res.render('./ejs/equipos/agregarEquipos.ejs', {user: req.user,divisiones:divisiones, message: req.flash('loginMessage')});
        });
    });

    app.post('/agregarEquipo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post(cfg.nodeClientUrl+"/equipo/", args, function (data, response) {
            console.log("POST /equipo");
            res.redirect('/equipos');
        });
    });

    app.post('/updateEquipo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };

        console.log(args);
        client.post(cfg.nodeClientUrl+"/posicionEquipo/", args, function (data, response) {
            client.put("http://localhost:3000/equipo/"+req.body.equipoid, args, function (data, response) {
                console.log("PUT /equipo");
                res.redirect('/equipos');
            });
        });
    });


    app.post('/deleteEquipo', isAdmin, function(req, res) {
        client.delete(cfg.nodeClientUrl+"/equipo"+req.body.equipoid, function (data, response) {
            client.delete(cfg.nodeClientUrl+"/posicionEquipo/equipo/"+req.body.equipoid,function (info, resp) {
            console.log("DELETE /equipo/"+req.body.equipoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/equipos');
            });
        });
    });
}
