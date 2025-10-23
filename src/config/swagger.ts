import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerOptions } from './swaggerOptions';

/**
 * Initialize Swagger documentation
 * @param app - Express application instance
 */
export const setupSwagger = (app: Express): void => {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    
    // Serve swagger docs at /api-docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Content Moderation API Documentation',
    }));

    console.log('Swagger documentation available at /api-docs');
};