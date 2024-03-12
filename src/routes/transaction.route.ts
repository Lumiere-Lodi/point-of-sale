import express from 'express';

import { createTransaction, retrieveTransaction } from '@server/controllers/transaction';
import { authenticateUser } from '@server/middleware/authenticateUser';

const router = express.Router();

// Only authenticated users allowed to send Request to transaction APIs
router.use(authenticateUser);

/**
 * Synchronous mode
 */
// Create a new transaction
router.post('/v1.0/sync/createTransaction', createTransaction);

// Retrieve details of a specific transaction
router.get('/v1.0/sync/transaction/:id', retrieveTransaction);

/**
 * Asynchronous mode (When the system grows the flow can become async if needed)
 */

export default router;
