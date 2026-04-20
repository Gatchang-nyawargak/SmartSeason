require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express()
app.use(cors())
app.use(express.json())

// ── API Docs ──────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'SmartSeason API Docs',
  customCss: '.swagger-ui .topbar { background-color: #164212; }',
}))

// Raw OpenAPI JSON (useful for importing into Postman / Insomnia)
app.get('/api/docs.json', (_, res) => res.json(swaggerSpec))

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/fields', require('./routes/fields'))
app.use('/api/users', require('./routes/users'))

app.get('/api/health', (_, res) => res.json({ ok: true, docs: '/api/docs' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`)
  console.log(`📖  API Docs at  http://localhost:${PORT}/api/docs`)
})
