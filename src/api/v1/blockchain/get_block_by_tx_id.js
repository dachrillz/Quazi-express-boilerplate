import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/blockchain/get_block_by_tx_id/{txid}:
 *   get:
 *     description: Gets history for an Asset.
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: txid
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
    const txid = req.params.txid;
    const helpers = Container.get('helpers');
    try {
        const fabric = Container.get('fabric');
        const result = await fabric.queryBlockByTxID(txid).catch();
        result.block_hash = helpers.block_hash(result.header);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}