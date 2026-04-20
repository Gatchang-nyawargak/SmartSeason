const router = require('express').Router()
const pool = require('../db/pool')
const { auth, adminOnly } = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/agents:
 *   get:
 *     summary: List all field agents (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of agents available for field assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: Alice Agent
 *                   email:
 *                     type: string
 *                     example: alice@smartseason.com
 *       403:
 *         description: Admins only
 */
router.get('/agents', auth, adminOnly, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email FROM users WHERE role = 'agent' ORDER BY name`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
