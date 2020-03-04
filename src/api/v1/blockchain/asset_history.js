import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/blockchain/asset_history/{index}:
 *   get:
 *     description: Gets history for an Asset.
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: index
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            name: 'user'
 *            schema:
 *              $ref: '#/components/schemas/ReturnedMolecule'
 */
module.exports = async function get(req, res) {
    const index = req.params.index;

    try {
        const fabric = Container.get('fabric');
        const result = await fabric.query('GetHistoryForAsset', index).catch();
        res.status(200).json(JSON.parse(result));
    } catch (e) {
        res.status(400).json(e);
    }
};