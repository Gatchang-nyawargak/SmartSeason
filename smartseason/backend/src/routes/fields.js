const router = require('express').Router();
const pool = require('../db/pool');
const { auth, adminOnly } = require('../middleware/auth');
const { computeStatus } = require('../db/status');

const withStatus = (field) => ({ ...field, status: computeStatus(field.stage, field.planting_date) });

// GET /fields — admin sees all, agent sees assigned
router.get('/', auth, async (req, res) => {
  try {
    const query =
      req.user.role === 'admin'
        ? `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id ORDER BY f.created_at DESC`
        : `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id WHERE f.agent_id = $1 ORDER BY f.created_at DESC`;
    const params = req.user.role === 'admin' ? [] : [req.user.id];
    const { rows } = await pool.query(query, params);
    res.json(rows.map(withStatus));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /fields/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT f.*, u.name AS agent_name FROM fields f LEFT JOIN users u ON f.agent_id = u.id WHERE f.id = $1`,
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    if (req.user.role === 'agent' && rows[0].agent_id !== req.user.id)
      return res.status(403).json({ error: 'Forbidden' });
    res.json(withStatus(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /fields — admin only
router.post('/', auth, adminOnly, async (req, res) => {
  const { name, crop_type, planting_date, stage = 'planted', agent_id } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO fields (name, crop_type, planting_date, stage, agent_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, crop_type, planting_date, stage, agent_id || null]
    );
    res.status(201).json(withStatus(rows[0]));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /fields/:id — admin can update all; agent can only update stage/notes via update log
router.patch('/:id', auth, adminOnly, async (req, res) => {
  const { name, crop_type, planting_date, stage, agent_id } = req.body;
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
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(withStatus(rows[0]));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /fields/:id — admin only
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM fields WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /fields/:id/updates
router.get('/:id/updates', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT fu.*, u.name AS agent_name FROM field_updates fu
       JOIN users u ON fu.agent_id = u.id
       WHERE fu.field_id = $1 ORDER BY fu.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /fields/:id/updates — agent posts update, also advances field stage
router.post('/:id/updates', auth, async (req, res) => {
  const { stage, notes } = req.body;
  try {
    const { rows: fieldRows } = await pool.query('SELECT * FROM fields WHERE id = $1', [req.params.id]);
    if (!fieldRows[0]) return res.status(404).json({ error: 'Field not found' });
    if (req.user.role === 'agent' && fieldRows[0].agent_id !== req.user.id)
      return res.status(403).json({ error: 'Forbidden' });

    await pool.query('UPDATE fields SET stage = $1 WHERE id = $2', [stage, req.params.id]);
    const { rows } = await pool.query(
      `INSERT INTO field_updates (field_id, agent_id, stage, notes) VALUES ($1,$2,$3,$4) RETURNING *`,
      [req.params.id, req.user.id, stage, notes || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
