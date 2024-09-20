const express = require('express');
const router = express.Router();
const ApprovalLogController = require('../controllers/ApprovalController/approvalLogController'); // Adjust the path
const ApprovalMatrixController = require('../controllers/ApprovalController/approvalMatrixController'); // Adjust the path
const setAuditFields = require('../middleware/setAuditFields.js');




// ApprovalLog Routes
router.post('/logs', setAuditFields,ApprovalLogController.create); // Create a new approval log
router.get('/logs', ApprovalLogController.findAll); // Get all approval logs
router.get('/logs/:id', ApprovalLogController.findById); // Get an approval log by ID
router.put('/logs/:id',setAuditFields, ApprovalLogController.update); // Update an approval log by ID
router.delete('/logs/:id',setAuditFields, ApprovalLogController.delete); // Delete an approval log by ID

// ApprovalMatrix Routes
router.post('/matrices',setAuditFields, ApprovalMatrixController.create); // Create a new approval matrix
router.get('/matrices', ApprovalMatrixController.findAll); // Get all approval matrices
router.get('/matrices/:id', ApprovalMatrixController.findById); // Get an approval matrix by ID
router.put('/matrices/:id',setAuditFields, ApprovalMatrixController.update); // Update an approval matrix by ID
router.delete('/matrices/:id',setAuditFields, ApprovalMatrixController.delete); // Delete an approval matrix by ID

module.exports = router;