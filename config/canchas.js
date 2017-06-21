module.exports = function(app,isAdmin) {
    
    var cfg = require('../config');

    app.post('/nuevaCancha', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
        client.get("http://"+cfg.hostname+"/torneo/"+req.body.torneoid, function (torneo, response) {
            res.render('./ejs/canchas/agregarCancha.ejs', {user: req.user, torneo: torneo, divisiones:divisiones, message: req.flash('loginMessage')});
        });
        });
    });

    app.post('/agregarCancha', isAdmin, function(req, res) {
        console.log('estoy en /agregarCancha');
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://"+cfg.hostname+"/cancha", args, function (data, response) {
            res.redirect('/canchasDelTorneo?torneoid='+data.torneo._id);
        });
    });

    app.get('/canchasDelTorneo', isAdmin, function(req, res) {
        console.log('estoy en /canchasDelTorneo');
        client.get("http://"+cfg.hostname+"/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
                client.get("http://"+cfg.hostname+"/cancha/torneo/"+req.query.torneoid, function (canchas, response) {
                    res.render('./ejs/canchas/canchasDelTorneo.ejs', {user: req.user, canchas: canchas, divisiones:divisiones,
                        torneo:torneo,  message: req.flash('loginMessage')});
                });
            });
        });

    });

    //app.post('/deleteDivision', isAdmin, function(req, res) {
    //    client.delete("http://localhost:3000/division/"+req.body.divisionid, function (data, response) {
    //        req.session.statusDelete = response.statusCode;
    //        res.redirect('/divisionesDelTorneo?torneoid='+data);
    //    });  
    //});
}
