// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createBranch, deleteBranchById, getAllBranch, updateBranch } = require('../controllers/branchController');
const setAuditFields = require('../middleware/setAuditFields.js'); 


// API routes
router
        .get('/branches', getAllBranch)
        .post('/branch', setAuditFields, createBranch)
        .delete('/branch', deleteBranchById)
        .put('/branch', updateBranch)
module.exports = router;
