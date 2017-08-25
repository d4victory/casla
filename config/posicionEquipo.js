module.exports = function(app, isAdmin, client) {

  app.get('/posicionesDeLaDivision/', function(req, res) {
    client.get("/posicionEquipo/division/"+req.query.divisionid, function (err, response, posicionEquipo) {
      client.get("/division/", function (err, response, divisiones) {
        client.get("/division/"+req.query.divisionid, function (err, response, division) {
          res.render('./ejs/divisiones/posicionesDeLaDivision.ejs', {
            user: req.user,
            posicionEquipo: posicionEquipo,
            divisiones: divisiones,
            division: division,
            message: req.flash('loginMessage')
          });
        });
      });
    });
  });

}
