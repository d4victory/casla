var GoleadoresDivisionCtrl = require('../services/goleadoresDivisionService')

module.exports = function (express, app) {

  /**
   * @swagger
   * definition:
   *   goleadoresDivisionModel:
   *     properties:
   *       division:
   *         $ref: Division
   */

  var goleadoresDivision = express.Router()

  /**
   * @swagger
   * /goleadoresDivision/division/:id:
   *   delete:
   *     tags:
   *       - DivisionModel
   *     description: Deletes a single division
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: equipo's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   */
  goleadoresDivision.get('/', GoleadoresDivisionCtrl.findAllGoleadoresDivision);

  /**
   * @swagger
   * /goleadoresDivision/:id:
   *   delete:
   *     tags:
   *       - DivisionModel
   *     description: Deletes a single division
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: equipo's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   */

  goleadoresDivision.get('/division/:id', GoleadoresDivisionCtrl.findGoleadoresDivisionByDivisionId)

  app.use('/goleadoresDivision', goleadoresDivision)

}
