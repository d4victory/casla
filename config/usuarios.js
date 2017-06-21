module.exports = function(app,isAdmin) {
    
    var cfg = require('../config');
    
    app.get('/usuarios', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/user/notAdmins", function (data, response) {
            client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
                client.get("http://"+cfg.hostname+"/equipo", function (equipos, response) {
                    var equiposMap =  {};
                    for (var i = 0; i < equipos.length; i++) {
                        equiposMap[equipos[i]._id] = equipos[i].nombre;
                    };
                    var equiposSinDelegado =  {};
                    for (var i = 0; i < equipos.length; i++) {
                        if (equipos[i].delegado == undefined){
                            equiposSinDelegado[equipos[i]._id] = true;
                        } else {
                            equiposSinDelegado[equipos[i]._id] = false;
                        }
                    };

                    res.render('./ejs/usuarios/usuarios.ejs', { message: req.flash('signupMessage'), users: data, equiposMap:equiposMap,
                        equiposSinDelegado:equiposSinDelegado,divisiones:divisiones, equipos: equipos, user: req.user, resultado: req.session.statusDelete});
                });
            });
        });
    });

    app.get('/agregarUsuarios', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
            res.render('./ejs/usuarios/agregarUsuarios.ejs', {user: req.user,divisiones:divisiones, message: req.flash('loginMessage')});
        });
    });

    app.post('/deleteUser', isAdmin, function(req, res) {
        client.delete("http://"+cfg.hostname+"/user/"+req.body.userid, function (data, response) {
            console.log("DELETE /user/"+req.body.userid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/usuarios');
        });
    });

    app.post('/delegarEquipo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.put("http://"+cfg.hostname+"/user/"+req.body.userid, args, function (data, response) {
            console.log("PUT /user/"+req.body.userid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/usuarios');
        });
    });
}
