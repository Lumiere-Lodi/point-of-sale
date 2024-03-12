import express from 'express';

import { addUser, verifyUniqueEmail, validateInputData, login } from '@server/controllers/user';

const router = express.Router();

/**
 * Synchronous mode
 */
// Add a new user
router.post('/v1.0/sync/register', validateInputData, verifyUniqueEmail, addUser);

// User Login
router.post('/v1.0/sync/login', login);

// @todo: Update user information

// @todo: add user role and status

// @todo: Add async handler
/**
 * Asynchronous mode (When the system grows the flow can become async if needed)
 */

export default router;
