// routes/api.js
const express = require('express');
const router = express.Router();
const POController = require('../controllers/poController');
const { generatePo } = require('../controllers/quotationController');

// API routes
router
    .get('/', POController.getPO)
    .post('/create',POController.genratePo)
    .put('/', POController.updatePOById)
    .delete('/', POController.deletePOById)
    .post('/accept', POController.AcceptPO)
module.exports = router;