const express = require('express');
const router = express.Router();

const paymentTypeMasterController = require('../controllers/paymentTypeMasterController');

// Routes
router.post('/', paymentTypeMasterController.createPaymentTypeMaster); // Create a new PaymentTypeMaster
router.get('/', paymentTypeMasterController.getAllPaymentTypeMasters); // Get all PaymentTypeMasters
router.get('/:id', paymentTypeMasterController.getPaymentTypeMasterById); // Get PaymentTypeMaster by ID
router.put('/:id', paymentTypeMasterController.updatePaymentTypeMaster); // Update PaymentTypeMaster by ID
router.delete('/:id', paymentTypeMasterController.deletePaymentTypeMaster); // Delete PaymentTypeMaster by ID

module.exports = router;
