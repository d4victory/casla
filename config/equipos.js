module.exports = function(app,isAdmin, client) {

    app.get('/equipos', isAdmin, function(req, res) {
        client.get("/equipo", function (err, response, equipos) {
            client.get("/division", function (err, response, divisiones) {
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
        client.get("/division", function (err, response, divisiones) {
            res.render('./ejs/equipos/agregarEquipos.ejs', {user: req.user,divisiones:divisiones, message: req.flash('loginMessage')});
        });
    });

    app.post('/agregarEquipo', isAdmin, function(req, res) {
        client.post({url: "/equipo/", body: req.body}, function (err, response, data) {
            console.log("POST /equipo");
            res.redirect('/equipos');
        });
    });

    app.post('/updateEquipo', isAdmin, function(req, res) {
        client.post({url: "/posicionEquipo/", body: req.body}, function (err, response, data) {
            client.put({url: "/equipo/"+req.body.equipoid, body: req.body}, function (err, response, data) {
                console.log("PUT /equipo");
                res.redirect('/equipos');
            });
        });
    });


    app.post('/deleteEquipo', isAdmin, function(req, res) {
        client.delete("/equipo/"+req.body.equipoid, function (err, response, data) {
            client.delete("/posicionEquipo/equipo/"+req.body.equipoid, function (err, response, info) {
                console.log("DELETE /equipo/"+req.body.equipoid);
                req.session.statusDelete = response.statusCode;
                res.redirect('/equipos');
            });
        });
    });

}
