// routes/api.js
const express = require('express');
const router = express.Router();
const setAuditFields = require('../middleware/setAuditFields.js');


// const itemController = require('../controllers/itemController');
const rfqControllers = require('../controllers/rfqControllers');

// API routes
router
    .get('/rfqs', rfqControllers.getAllRfq)
    .get('/rfq/:id', rfqControllers.getRfqById)
    .delete('/rfq/:id', setAuditFields, rfqControllers.deleteRfqById)
    .post('/rfq', setAuditFields, rfqControllers.createRfq)

module.exports = router;