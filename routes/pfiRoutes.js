// routes/api.js
const express = require('express');
const router = express.Router();
const pfiController = require('../controllers/pfiController');
const setAuditFields = require('../middleware/setAuditFields.js');
// const {  } = require('../controllers/quotationController');

// API routes
router
    .get('/get', pfiController.getPfi)
    .get('/pfibypoid', pfiController.getPfibyPoid)
    .get('/pfibyid', pfiController.getPfibyid)
    .post('/create', setAuditFields, pfiController.genratePfi)
    .get('/create2', setAuditFields, pfiController.genratePfi2)
// .put('/', POController.updatePOById)
// .delete('/', POController.deletePOById)
// .post('/accept', POController.AcceptPO)
module.exports = router; 