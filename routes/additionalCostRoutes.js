// routes/api.js
const express = require('express');
const router = express.Router();
const additionalCostController = require('../controllers/additionalCostController');
const setAuditFields = require('../middleware/setAuditFields.js');



// API routes
router
    .get('/', additionalCostController.getAdditionalCost)
    .get('/compressdata', additionalCostController.getAdditionalCostByQuoIdCompressData)
    .get('/freight', additionalCostController.getFreightAdditionalCostByQuoId)
    .post('/', setAuditFields, additionalCostController.createAdditionalCost)
    .put('/', setAuditFields, additionalCostController.updateAdditionalCostById)
    .delete('/', setAuditFields, additionalCostController.deleteAdditionalCostById)
router
    .get('/', additionalCostController.getAdditionalCost)
    .post('/', setAuditFields, additionalCostController.createAdditionalCost)
    .put('/', setAuditFields, additionalCostController.updateAdditionalCostById)
    .delete('/', setAuditFields, additionalCostController.deleteAdditionalCostById)
module.exports = router;