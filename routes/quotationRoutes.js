// routes/api.js
const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/quotes', quotationController.getQuotation)
    .get('/quotebyrfqid', quotationController.getQuotationbyrfqId)
    .post('/quote', upload.single('quote_doc'), setAuditFields, quotationController.createQuotation)
    .put('/quote', quotationController.updateQuotationById)
    .delete('/quote', quotationController.deleteQuotationById)

module.exports = router;
