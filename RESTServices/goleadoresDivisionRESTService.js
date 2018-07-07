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
   * /posicionEquipo/:id:
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

  /**
   * @swagger
   * /posicionEquipo/:id:
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
  goleadoresDivision.post('/', GoleadoresDivisionCtrl.goleadoresDivisionAdd)
  goleadoresDivision.post('/updateGoleadoresDivision', GoleadoresDivisionCtrl.cargaDePartido)

  /*/!**
   * @swagger
   * /goleadoresDivision/{idJugador}:
   *   delete:
   *     tags:
   *       - GoleadoresDivisionModel
   *     description: Deletes a single goleadoresDivision
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: idJugador
   *         description: idJugador's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *!/
  goleadoresDivision.delete('/jugador/:id', GoleadoresDivisionCtrl.deleteGoleadoresDivision);*/

  app.use('/goleadoresDivision', goleadoresDivision)

}
