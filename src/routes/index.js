import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/users/routes/index.js';
import authentication from '../services/authentication/routes/index.js';

const router = Router();

router.use('/', notes);
router.use('/', users);
router.use('/', authentication);

export default router;
