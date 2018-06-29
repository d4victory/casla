module.exports = function(app, isAdmin, client) {

  app.get('/goleadoresDeLaDivision/', function(req, res) {
    client.get("/goleadoresDivision/division/"+req.query.divisionid, function (err, response, goleadoresDivision) {
      client.get("/division/", function (err, response, divisiones) {
        client.get("/division/"+req.query.divisionid, function (err, response, division) {
          res.render('./ejs/divisiones/goleadoresDeLaDivision.ejs', {
            user: req.user,
            goleadoresDivision: goleadoresDivision,
            divisiones: divisiones,
            division: division,
            message: req.flash('loginMessage')
          });
        });
      });
    });
  });
}
