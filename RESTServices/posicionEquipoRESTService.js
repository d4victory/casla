var PosicionEquipoCtrl = require('../services/posicionEquipoService');

module.exports = function(express,app) {

    /**
     * @swagger
     * definition:
     *   posicionEquipoModel:
     *     properties:
     *       division:
     *         $ref: Division
     *       equipo:
     *         $ref: Equipo
     *       equipoNombre:
     *         type: string
     *       puntos:
     *         type: integer
     *       ganados:
     *         type: integer
     *       empatados:
     *         type: integer
     *       perdidos:
     *         type: integer
     *       jugados:
     *         type: integer
     *       golesFavor:
     *         type: integer
     *       golesContra:
     *         type: integer
     */

    var posicionEquipo = express.Router();

    /**
     * @swagger
     * /posicionEquipo:
     *   get:
     *     tags:
     *       - posicionEquipoModel
     *     description: Returns all equipos con puntos
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of divisiones
     *         schema:
     *           $ref: '#/definitions/posicionEquipoModel'
     */


    posicionEquipo.get('/', PosicionEquipoCtrl.findAllposicionEquipo);



    /**
     * @swagger
     * /posicionEquipo/:id:
     *   get:
     *     tags:
     *       - posicionEquipoModel
     *     description: Returns single equipos de la tabla de posiciones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: equipos's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of divisiones
     *         schema:
     *           $ref: '#/definitions/posicionEquipoModel'
     */

    posicionEquipo.get('/:id', PosicionEquipoCtrl.findEquiposById);

    /**
     * @Swagger
     * /posicionEquipo/division/?{id}:
     *  get:
     *      tags:
     *          - posicionEquipoModel
     *      description: Devuelve todas las posicionEquipo de una division
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
     *              description: An array of posicionEquipo
     *          schema:
     *              $ref: '#/definitions/posicionEquipoModel'
     */

    posicionEquipo.get('/division/:id', PosicionEquipoCtrl.findPosicionEquiposByDivisionId);



    /**
     * @swagger
     * /posicionEquipo/:id:
     *   put:
     *     tags:
     *       - posicionEquipoModel
     *     description: add equipoPosicion
     *     produces:
     *       - application/json
     *     parameters:
     *        schema:
     *           $ref: '#/definitions/posicionEquipoModel'
     *     responses:
     *       200:
     *         description: Successfully updated
     */
    posicionEquipo.post('/', PosicionEquipoCtrl.posicionEquipoAdd);
    posicionEquipo.post('/updatePosicionEquipo', PosicionEquipoCtrl.cargaDePartido);



    /**
     * @swagger
     * /posicionEquipo/:id:
     *   put:
     *     tags:
     *       - posicionEquipoModel
     *     description: Updates a single equipo
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: equipoPosicionId
     *         in: path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/posicionEquipoModel'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    posicionEquipo.put('/:id', PosicionEquipoCtrl.updatePosicionEquipo);

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
    posicionEquipo.delete('/equipo/:id', PosicionEquipoCtrl.posicionEquipoDeleteByEquipoId);


    app.use('/posicionEquipo', posicionEquipo);

};
