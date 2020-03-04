import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/blockchain/blockchain_info:
 *   get:
 *     description: Get current state of blockchain.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 */
module.exports = async function get(req, res) {
    try {
        const fabric = Container.get("fabric");
        const result = await fabric.queryBlockchainInfo().catch();
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}