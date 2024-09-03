const express = require('express');
const router = express.Router();
const {
    getDocumentByEntityId
} = require('../controllers/documentsController.js');
const setAuditFields = require('../middleware/setAuditFields.js');






// API routes for item categories
router
    .get('/docbyentityid', getDocumentByEntityId)

module.exports = router;
