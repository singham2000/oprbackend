const express = require('express');
const router = express.Router();
const paymentRequestTransactionsMasterController = require('../controllers/paymentRequestTransactionsController');
const upload = require('../utilites/handlefile.js');
const paymentRequestMasterController = require('../controllers/paymentRequestController');
const { confirmPaymentRequest } = require('../controllers/paymentRequestController.js')


router.post('/', upload.single('receipt_image'), paymentRequestTransactionsMasterController.createPaymentRequestTransactionsMaster);
router.get('/', paymentRequestTransactionsMasterController.getAllPaymentRequestTransactionsMasters);
router.post('/reject', paymentRequestMasterController.rejectPaymentRequestByTreasury);
router.get('/transaction', paymentRequestTransactionsMasterController.getPaymentRequestTransactionsMasterRequestId);
router.get('/transactionfile', paymentRequestTransactionsMasterController.getPaymentRequestTransactionsfileRequestId);
router.get('/:id', paymentRequestTransactionsMasterController.getPaymentRequestTransactionsMasterById);
router.put('/:id', paymentRequestTransactionsMasterController.updatePaymentRequestTransactionsMaster);
router.delete('/:id', paymentRequestTransactionsMasterController.deletePaymentRequestTransactionsMaster);
module.exports = router;
