import express from 'express';
import admin from './admin';
import molecule from './molecule';
import blockchain from './blockchain';

const router = express.Router();

router.use('/blockchain', blockchain);
router.use('/admin', admin);
router.use('/molecule', molecule);
export default router;