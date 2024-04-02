import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bookRoutes from './api/routes/bookRoutes';
import userRoutes from './api/routes/userRoutes';
import borrowedBookRoutes from './api/routes/borrowedBookRoutes'

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management System API',
            version: '1.0.0',
            description: 'A simple Express RESTFUL API'
        }
    },
    apis: ['src/api/routes/*.ts', 'src/schemas/*.yaml']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use('', bookRoutes);
app.use('', userRoutes);
app.use('', borrowedBookRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/api-docs`));
