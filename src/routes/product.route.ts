import express from 'express';

import { addProduct, updatebyId, deleteById, retrieveAll, validateInputProductData } from '@server/controllers/product';
import { authenticateUser } from '@server/middleware/authenticateUser';

const router = express.Router();

// Only authenticated users allowed to send Request to product APIs
router.use(authenticateUser);

/**
 * Synchronous mode
 */
// Add a new product
router.post('/v1.0/sync/addProduct', validateInputProductData, addProduct);

// Retrieve all product
router.get('/v1.0/sync/all', retrieveAll);

// Update an existing product
router.put('/v1.0/sync/update/:id', updatebyId);

// Delete a product
router.delete('/v1.0/sync/delete/:id', deleteById);

/**
 * Asynchronous mode (When the system grows the flow can become async if needed)
 */

export default router;
