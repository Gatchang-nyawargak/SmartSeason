const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartSeason API',
      version: '1.0.0',
      description: 'Field Monitoring System — REST API for managing fields, agents, and crop updates.',
    },
    servers: [{ url: 'http://localhost:5000/api', description: 'Local dev server' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste your JWT token from POST /auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Admin User' },
            email: { type: 'string', example: 'admin@smartseason.com' },
            role: { type: 'string', enum: ['admin', 'agent'] },
          },
        },
        Field: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Kiambu Plot A' },
            crop_type: { type: 'string', example: 'Maize' },
            planting_date: { type: 'string', format: 'date', example: '2025-01-10' },
            stage: { type: 'string', enum: ['planted', 'growing', 'ready', 'harvested'] },
            status: { type: 'string', enum: ['active', 'at_risk', 'completed'] },
            agent_id: { type: 'integer', nullable: true, example: 2 },
            agent_name: { type: 'string', nullable: true, example: 'Alice Agent' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        FieldUpdate: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            field_id: { type: 'integer', example: 1 },
            agent_id: { type: 'integer', example: 2 },
            agent_name: { type: 'string', example: 'Alice Agent' },
            stage: { type: 'string', enum: ['planted', 'growing', 'ready', 'harvested'] },
            notes: { type: 'string', nullable: true, example: 'Soil moisture is optimal.' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string', example: 'Invalid credentials' } },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
}

module.exports = swaggerJsdoc(options)
