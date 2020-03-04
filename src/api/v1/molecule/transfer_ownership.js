import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/molecule/transfer_ownership/{name}&{newOwnerId}:
 *   patch:
 *     description: Registers a new user
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: newOwnerId
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
module.exports = async function patch(req, res) {
    const index = req.params.name;
    const new_owner = req.params.newOwnerId;

    try {
        const fabric = Container.get('fabric');
        const result = await fabric.invoke('TransferOwnership', index, new_owner).catch();
        res.status(200).json(JSON.parse(result.toString()));
    } catch (e) {
        res.status(400).json(e);
    }
};