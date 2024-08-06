// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTermsController = require('../controllers/paymentTermsController');

// API routes
router
    .get('/', PaymentTermsController.getPaymentTerms)
    .post('/', PaymentTermsController.createPaymentTerms)
    .put('/', PaymentTermsController.updatePaymentTermsById)
    .delete('/', PaymentTermsController.deletePaymentTermsById)

module.exports = router;