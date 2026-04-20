const router = require('express').Router()
const pool = require('../db/pool')
const { auth, adminOnly } = require('../middleware/auth')
const { computeStatus } = require('../db/status')

const withStatus = (field) => ({ ...field, status: computeStatus(field.stage, field.planting_date) })

/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: Field management — CRUD and stage updates
 */

/**
 * @swagger
 * /fields:
 *   get:
 *     summary: List fields (admin sees all; agent sees only assigned)
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of fields with computed status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', auth, async (req, res) => {
  try {
    const query =
      req.user.role === 'admin'
        ? `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id ORDER BY f.created_at DESC`
        : `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id WHERE f.agent_id = $1 ORDER BY f.created_at DESC`
    const params = req.user.role === 'admin' ? [] : [req.user.id]
    const { rows } = await pool.query(query, params)
    res.json(rows.map(withStatus))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields/{id}:
 *   get:
 *     summary: Get a single field by ID
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Field ID
 *     responses:
 *       200:
 *         description: Field object with computed status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       403:
 *         description: Agent trying to access a field not assigned to them
 *       404:
 *         description: Field not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id WHERE f.id = $1`,
      [req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    if (req.user.role === 'agent' && rows[0].agent_id !== req.user.id)
      return res.status(403).json({ error: 'Forbidden' })
    res.json(withStatus(rows[0]))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields:
 *   post:
 *     summary: Create a new field (admin only)
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, crop_type, planting_date]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kiambu Plot A
 *               crop_type:
 *                 type: string
 *                 example: Maize
 *               planting_date:
 *                 type: string
 *                 format: date
 *                 example: '2025-03-01'
 *               stage:
 *                 type: string
 *                 enum: [planted, growing, ready, harvested]
 *                 default: planted
 *               agent_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *     responses:
 *       201:
 *         description: Field created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       403:
 *         description: Admins only
 */
router.post('/', auth, adminOnly, async (req, res) => {
  const { name, crop_type, planting_date, stage = 'planted', agent_id } = req.body
  try {
    const { rows } = await pool.query(
      `INSERT INTO fields (name, crop_type, planting_date, stage, agent_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, crop_type, planting_date, stage, agent_id || null]
    )
    res.status(201).json(withStatus(rows[0]))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields/{id}:
 *   patch:
 *     summary: Update field details (admin only)
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               crop_type:
 *                 type: string
 *               planting_date:
 *                 type: string
 *                 format: date
 *               stage:
 *                 type: string
 *                 enum: [planted, growing, ready, harvested]
 *               agent_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated field
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       403:
 *         description: Admins only
 *       404:
 *         description: Field not found
 */
router.patch('/:id', auth, adminOnly, async (req, res) => {
  const { name, crop_type, planting_date, stage, agent_id } = req.body
  try {
    const { rows } = await pool.query(
      `UPDATE fields SET
        name = COALESCE($1, name),
        crop_type = COALESCE($2, crop_type),
        planting_date = COALESCE($3, planting_date),
        stage = COALESCE($4, stage),
        agent_id = COALESCE($5, agent_id)
       WHERE id = $6 RETURNING *`,
      [name, crop_type, planting_date, stage, agent_id, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    res.json(withStatus(rows[0]))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields/{id}:
 *   delete:
 *     summary: Delete a field (admin only)
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Field deleted
 *       403:
 *         description: Admins only
 */
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM fields WHERE id = $1', [req.params.id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields/{id}/updates:
 *   get:
 *     summary: Get all updates for a field
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Array of field updates ordered newest first
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FieldUpdate'
 */
router.get('/:id/updates', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT fu.*, u.name AS agent_name FROM field_updates fu
       JOIN users u ON fu.agent_id = u.id
       WHERE fu.field_id = $1 ORDER BY fu.created_at DESC`,
      [req.params.id]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /fields/{id}/updates:
 *   post:
 *     summary: Log a field update and advance its stage
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [stage]
 *             properties:
 *               stage:
 *                 type: string
 *                 enum: [planted, growing, ready, harvested]
 *                 example: growing
 *               notes:
 *                 type: string
 *                 nullable: true
 *                 example: Soil moisture is optimal after irrigation.
 *     responses:
 *       201:
 *         description: Update logged and field stage advanced
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldUpdate'
 *       403:
 *         description: Agent not assigned to this field
 *       404:
 *         description: Field not found
 */
router.post('/:id/updates', auth, async (req, res) => {
  const { stage, notes } = req.body
  try {
    const { rows: fieldRows } = await pool.query('SELECT * FROM fields WHERE id = $1', [req.params.id])
    if (!fieldRows[0]) return res.status(404).json({ error: 'Field not found' })
    if (req.user.role === 'agent' && fieldRows[0].agent_id !== req.user.id)
      return res.status(403).json({ error: 'Forbidden' })

    await pool.query('UPDATE fields SET stage = $1 WHERE id = $2', [stage, req.params.id])
    const { rows } = await pool.query(
      `INSERT INTO field_updates (field_id, agent_id, stage, notes) VALUES ($1,$2,$3,$4) RETURNING *`,
      [req.params.id, req.user.id, stage, notes || null]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
