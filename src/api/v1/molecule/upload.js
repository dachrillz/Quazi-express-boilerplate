import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/molecule/upload:
 *   post:
 *     description: Uploads a new molecule
 *     produces:
 *      - application/json
 *     requestBody:
 *       description: "Molecule information"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Molecule'
 *     responses:
 *       200:
 *         description: molecule response
 *         content:
 *          application/json:
 *            name: 'molecule'
 *            schema:
 *              $ref: '#/components/schemas/ReturnedMolecule'
 */
module.exports = async function(req, res) {
    const data = req.body;
    data['doctype'] = 'json';
    const jsonString = JSON.stringify(data);

    try {
        const fabric = Container.get('fabric');
        const result = await fabric.invoke('UploadMolecule', jsonString);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (e) {
        res.status(400).json(e);
    }
}