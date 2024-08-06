// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createDivision, deleteDivisionById, getAllDivision, getDivisionById, updateDivision } = require('../controllers/divisionController');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/get', getAllDivision)
    .post('/create', setAuditFields, createDivision)
    .put('/update', setAuditFields, updateDivision)
    .get('/:id', getDivisionById)
    .delete('/:id', deleteDivisionById)
module.exports = router;
