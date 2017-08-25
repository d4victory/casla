module.exports = function(app, isAdmin, client) {

  app.get('/fixture/', function(req, res) {
    client.get("/fixture/division/"+req.query.divisionid, function (err, response, partidos) {
      client.get("/division/", function (err, response, divisiones) {
        res.render('./ejs/fixture/fixture.ejs', {
          user: req.user,
          divisiones: divisiones,
          partidos: partidos,
          message: req.flash('loginMessage')
        });
      });
    });
  });

}
