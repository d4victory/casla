module.exports = function(app,isAdmin, client) {

  app.get('/usuarios', isAdmin, function(req, res) {
    client.get("/user/notAdmins", function (err, response, data) {
      client.get("/division", function (err, response, divisiones) {
        client.get("/equipo", function (err, response, equipos) {
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

          res.render('./ejs/usuarios/usuarios.ejs', {
            message: req.flash('signupMessage'),
            users: data,
            equiposMap: equiposMap,
            equiposSinDelegado: equiposSinDelegado,
            divisiones: divisiones,
            equipos: equipos,
            user: req.user,
            resultado: req.session.statusDelete
          });
        });
      });
    });
  });

  app.get('/agregarUsuarios', isAdmin, function(req, res) {
    client.get("/division", function (err, response, divisiones) {
      res.render('./ejs/usuarios/agregarUsuarios.ejs', {
        user: req.user,
        divisiones: divisiones,
        message: req.flash('loginMessage')
      });
    });
  });

  app.post('/deleteUser', isAdmin, function(req, res) {
    client.delete("/user/"+req.body.userid, function (err, response, data) {
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
    client.put({url: "/user/"+req.body.userid, body: req.body}, function (err, response, data) {
      console.log("PUT /user/"+req.body.userid);
      req.session.statusDelete = response.statusCode;
      res.redirect('/usuarios');
    });
  });

  app.get('/usuarios', isAdmin, function(req, res) {
    client.get("/user/notAdmins", function (err, response, data) {
      client.get("/division", function (err, response, divisiones) {
        client.get("/equipo", function (err, response, equipos) {
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

          res.render('./ejs/usuarios/usuarios.ejs', {
            message: req.flash('signupMessage'),
            users: data,
            equiposMap: equiposMap,
            equiposSinDelegado: equiposSinDelegado,
            divisiones: divisiones,
            equipos: equipos,
            user: req.user,
            resultado: req.session.statusDelete
          });
        });
      });
    });
  });

  app.get('/agregarUsuarios', isAdmin, function(req, res) {
    client.get("/division", function (err, response, divisiones) {
      res.render('./ejs/usuarios/agregarUsuarios.ejs', {
        user: req.user,
        divisiones: divisiones,
        message: req.flash('loginMessage')
      });
    });
  });

  app.post('/deleteUser', isAdmin, function(req, res) {
    client.delete("/user/"+req.body.userid, function (err, response, data) {
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
    client.put({url: "/user/"+req.body.userid, body: req.body}, function (err, response, data) {
      console.log("PUT /user/"+req.body.userid);
      req.session.statusDelete = response.statusCode;
      res.redirect('/usuarios');
    });
  });
}
