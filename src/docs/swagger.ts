import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.document.json';
import { Router } from 'express';

//@todo: Complete Swagger json file that user can use to see all available endpoints and data samples.
const swaggerRouter = Router();
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
