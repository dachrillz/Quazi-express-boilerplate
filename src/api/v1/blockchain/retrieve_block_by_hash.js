import {Container} from 'typedi';


/**
 * @swagger
 * /api/v1/blockchain/retrieve_block_by_hash/{blockHash}:
 *   get:
 *     description: Gets history for an Asset.
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: blockHash
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 */
module.exports = async function get(req, res) {
    const blockHash = req.params.blockHash;
    const helpers = Container.get('helpers');
    try {
        const fabric = Container.get("fabric");
        const result = await fabric.queryBlockByHash(blockHash).catch();
        result.block_hash = helpers.block_hash(result.header);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}