var GoleadoresDivisionCtrl = require('../services/goleadoresDivisionService');

module.exports = function(express,app) {

    /**
     * @swagger
     * definition:
     *   goleadoresDivisionModel:
     *     properties:
     *       division:
     *         $ref: Division
     */

    var goleadoresDivision = express.Router();

    /**
     * @Swagger
     * /goleadoresDivision/division/?{id}:
     *  get:
     *      tags:
     *          - goleadoresDivisionModel
     *      description: Devuelve todas las goleadoresDivision de una division específica
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *          description: Division's id
     *          in: path
     *          required: true
     *          type: integer
     *      responses:
     *          200:
     *              description: An array of goleadoresDivision
     *          schema:
     *              $ref: '#/definitions/goleadoresDivisionModel'
     */

    goleadoresDivision.get('/division/:id', GoleadoresDivisionCtrl.findGoleadoresDivisionByDivisionId);

    app.use('/goleadoresDivision', goleadoresDivision);

};
