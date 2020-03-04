import express from 'express';
const router = express.Router();

router.post('/upload', require('./upload'));
router.post('/search', require('./search'));
router.patch('/transfer_ownership/:name&:newOwnerId', require('./transfer_ownership'));

export default router;

