
import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/molecule/search:
 *   post:
 *     description: Uploads a new molecule
 *     produces:
 *      - application/json
 *     requestBody:
 *       description: "CouchDB Selector"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selector:
 *                 type: object
 *     responses:
 *       200:
 *         description: molecule response
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  Key:
 *                    type: string
 *                  Record:
 *                    $ref: '#/components/schemas/ReturnedMolecule'
 */
module.exports = async function post(req, res) {
    const selector = req.body;
    const asStringified = JSON.stringify(selector);

    try {
        const fabric = Container.get('fabric');
        const result = await fabric.query('QueryMolecules', asStringified).catch();
        res.status(200).json(JSON.parse(result.toString()));
    } catch (e) {
        res.status(400).json(e);
    }
};