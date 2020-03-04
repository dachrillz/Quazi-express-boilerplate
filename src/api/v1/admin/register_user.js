import {Container} from 'typedi';

/**
 * @swagger
 * /api/v1/admin/register_user:
 *   post:
 *     description: Registers a new user
 *     produces:
 *      - application/json
 *     requestBody:
 *       description: "User info for user that is to be registered"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            name: 'user'
 *            schema:
 *              $ref: '#/components/schemas/ReturnedUser'
 */
module.exports = async function(req, res) {
  const data = req.body;
  data['doctype'] = 'json';
  const jsonString = JSON.stringify(data);

  try {
    const fabric = Container.get('fabric');
    const result = await fabric.invoke('CreateUser', jsonString);

    res.status(200).json(JSON.parse(result.toString()));
  } catch (e) {
    res.status(400).json(e);
  }
};