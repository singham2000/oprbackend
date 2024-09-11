const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const setAuditFields = require('../middleware/setAuditFields.js');
const upload = require('../utilites/handlefile.js');

// Define routes
router.post('/create', upload.any('doc'),  setAuditFields,documentController.createDocument);
router.get('/', documentController.getAllDocuments);
// router.get('/:id', documentController.getDocumentById);
// router.put('/:id', documentController.updateDocument);
// router.delete('/:id', documentController.deleteDocument);

module.exports = router;