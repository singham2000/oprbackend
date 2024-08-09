// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController')



// Payment types
router.get('/type_list', PaymentController.getPaymentTypes);
router.get('/type_dropdown', PaymentController.getPaymentTypesDropDown);
router.post('/type_create', PaymentController.createPaymentType);
// router.put('/type_update', PaymentController.updatePaymentType);
// router.delete('/type_delete', PaymentController.deletePaymentTermsById);

// // Penalty terms
// router.get('/penaltyterms_list', PaymentController.getPenaltyTerms);
// router.post('/penaltyterms_create', PaymentController.createPenaltyTerms);
// router.put('/penaltyterms_update', PaymentController.updatePenaltyTermsById);
// router.delete('/penaltyterms_delete', PaymentController.deletePenaltyTermsById);

// // Payment terms
// router.get('/pymtterms_list', PaymentController.getPaymentTerms);
// router.post('/pymtterms_create', PaymentController.createPaymentTerms);
// router.put('/pymtterms_update', PaymentController.updatePaymentTermsById);
// router.delete('/pymtterms_delete', PaymentController.deletePaymentTermsById);

// // Payment request
// router.get('/request_list', PaymentController.getPaymentRequests);
// router.post('/request_create', PaymentController.createPaymentRequest);

// // Payment transaction
// router.get('/transaction_list', PaymentController.getPaymentTransactions);
// router.post('/transaction_create', PaymentController.createPaymentTransaction);


//payment terms
router.get('/terms/dropdown', PaymentController.getAllPaymentTerms);
router.get('/terms/dropdown2', PaymentController.getAllPaymentTerms);


module.exports = router;
