// routes/api.js
const express = require('express');
const router = express.Router();
const oprController = require('../controllers/oprController');
const oprItemsController = require('../controllers/oprItemsController');
const setAuditFields = require('../middleware/setAuditFields.js');
// const oprItemsController = require('../controllers/oprItemsController');



// API routes 
router
    .get('/oprs', oprController.getOpr)
    .post('/opr', setAuditFields, oprController.createOpr)
    .put('/opr', oprController.updateOprById)
    .delete('/opr/:id', oprController.deleteOprById)
    .post('/confirm/:opr_id', oprController.confirmOpr)
router
    .get('/items', oprItemsController.getOprItem)
    .get('/itemsforrfq', oprItemsController.getOprItemForRfq)
    .get('/v1/itemsforrfq', oprItemsController.getOprItemForRfq2)
    .get('/itembypo', oprItemsController.getOprListbyPoNumber)
    .get('/companypo', oprItemsController.getcompanylistPoNumber)
    .post('/combitems', oprItemsController.getCombinedItemsByOprItemIds)
    .post('/item', setAuditFields, oprItemsController.createOprItem)
    .put('/item', oprItemsController.updateOprItemById)
    .delete('/draftitem', oprItemsController.deleteOprdraftItem)
module.exports = router;