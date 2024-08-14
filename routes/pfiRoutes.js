// routes/api.js
const express = require('express');
const router = express.Router();
const pfiController = require('../controllers/pfiController');
const { getPfiLineItemByPoid } = require('../controllers/PfiController/pfiItemController.js');
const setAuditFields = require('../middleware/setAuditFields.js');
// const {  } = require('../controllers/quotationController');

// API routes
router
    .get('/get', pfiController.getPfi)
    .get('/pfibypoid', pfiController.getPfibyPoid)
    .get('/pfibyid', pfiController.getPfibyid)
    .post('/create', setAuditFields, pfiController.genratePfi)
    .get('/create2', setAuditFields, pfiController.genratePfi2)

router.get('/pfiitems', getPfiLineItemByPoid)

module.exports = router; 