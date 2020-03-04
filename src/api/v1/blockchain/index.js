import express from 'express';
const router = express.Router();

router.get('/asset_history/:index', require('./asset_history'));
router.get('/blockchain_info', require('./blockchain_info'));
router.get('/retrieve_block/:blockNumber', require('./retrieve_block'));
router.get('/retrieve_block_by_hash/:blockHash', require('./retrieve_block_by_hash'));
router.get('/get_block_by_tx_id/:txid', require('./get_block_by_tx_id'));

export default router;

