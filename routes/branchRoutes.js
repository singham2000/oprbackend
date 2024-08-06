// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createBranch, deleteBranchById, getAllBranch, getBranchById } = require('../controllers/branchController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
        .get('/branches', getAllBranch)
        .post('/branch', setAuditFields, createBranch)
        .get('/branch/:id', getBranchById)
        .delete('/branch/:id', deleteBranchById)
module.exports = router;
