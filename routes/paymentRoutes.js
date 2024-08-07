// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTermsController = require('../controllers/paymentTermsController');

// Payment types
router.get('/type_list', PaymentTermsController.getPaymentTerms);
router.post('/type_create', PaymentTermsController.createPaymentTerms);
router.put('/type_update', PaymentTermsController.updatePaymentTermsById);
router.delete('/type_delete', PaymentTermsController.deletePaymentTermsById);

// Penalty terms
router.get('/penaltyterms_list', PaymentTermsController.getPenaltyTerms);
router.post('/penaltyterms_create', PaymentTermsController.createPenaltyTerms);
router.put('/penaltyterms_update', PaymentTermsController.updatePenaltyTermsById);
router.delete('/penaltyterms_delete', PaymentTermsController.deletePenaltyTermsById);

// Payment terms
router.get('/pymtterms_list', PaymentTermsController.getPaymentTerms);
router.post('/pymtterms_create', PaymentTermsController.createPaymentTerms);
router.put('/pymtterms_update', PaymentTermsController.updatePaymentTermsById);
router.delete('/pymtterms_delete', PaymentTermsController.deletePaymentTermsById);

// Payment request
router.get('/request_list', PaymentTermsController.getPaymentRequests);
router.post('/request_create', PaymentTermsController.createPaymentRequest);

// Payment transaction
router.get('/transaction_list', PaymentTermsController.getPaymentTransactions);
router.post('/transaction_create', PaymentTermsController.createPaymentTransaction);

module.exports = router;
