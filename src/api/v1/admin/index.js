import express from 'express';
const router = express.Router();

router.post('/register_user', require('./register_user'));

export default router;

