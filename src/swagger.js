import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Dashboard API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Asset: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid' },
            name: { type: 'string', example: 'Cash Account' },
            type: { type: 'string', example: 'Cash' },
            value: { type: 'number', example: 10000 },
            currency: { type: 'string', example: 'USD' },
          },
          required: ['name', 'type', 'value', 'currency'],
        },
        FamilyMember: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            relationship: { type: 'string', example: 'Spouse' },
            birthDate: { type: 'string', format: 'date', example: '1990-01-01' },
          },
          required: ['firstName', 'lastName', 'relationship'],
        },
      },
    },
  },
  // Files containing Swagger annotations (JSDoc) for routes
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
