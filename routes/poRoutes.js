// routes/api.js
const express = require('express');
const router = express.Router();
const POController = require('../controllers/poController');
const { generatePo } = require('../controllers/quotationController');

// API routes
router
    .get('/list', POController.getPO)
    .post('/create', POController.genratePo)
    .put('/update', POController.updatePOById)
    .delete('/delete', POController.deletePOById)
    .post('/accept', POController.AcceptPO)
module.exports = router;