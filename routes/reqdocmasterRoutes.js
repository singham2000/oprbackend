const express = require('express');
const router = express.Router();
const reqDocController = require('../controllers/reqdocMasterController'); // Adjust the path as necessary
const setAuditFields = require('../middleware/setAuditFields.js'); // If you have middleware for auditing

// Required Document Routes
router.post('/create', setAuditFields, reqDocController.createRequiredDocument); // Create
router.get('/list', reqDocController.getAllRequiredDocuments); // List

// router.get('/require-:id', reqDocController.getRequiredDocumentById); // Get by ID
// router.put('/require-doc/:id', setAuditFields, reqDocController.updateRequiredDocument); // Update
// router.delete('/require-doc/:id', reqDocController.deleteRequiredDocument); // Soft Delete

module.exports = router;