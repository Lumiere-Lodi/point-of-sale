import express from 'express';

import { createUpsell, deleteUpsell, retrieveUpsell } from '@server/controllers/upsell';
import { authenticateUser } from '@server/middleware/authenticateUser';

const router = express.Router();

// Only authenticated users allowed to send Request to upsell APIs
router.use(authenticateUser);

/**
 * Synchronous mode
 */
// Create a new Upsell
router.post('/v1.0/sync/addUpsell', createUpsell);

// Get Upsell of a product
router.get('/v1.0/sync/retrieve/:id', retrieveUpsell);

// Delete upsell
router.delete('/v1.0/sync/delete/:product_id/:upsell_id', deleteUpsell);

/**
 * Asynchronous mode (When the system grows the flow can become async if needed)
 */

export default router;
