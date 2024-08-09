// this route will controll all things realated opo OPOMASTER and OPOITEMS
// routes/api.js
const express = require('express');
const router = express.Router();
const opoController = require('../controllers/OpoController/opoController.js');

const setAuditFields = require('../middleware/setAuditFields.js');




// API routes 
router
    .get('/list', opoController.getPO)
    .post('/create', setAuditFields, opoController.genratePo)
    .put('/update', opoController.updateOprById)
    .delete('/delete', opoController.deleteOprById)
    .post('/confirm', opoController.confirmOpr)
router
    .get('/items', oprItemsController.getOprItem)
    .put('/updateitem', oprItemsController.updateOprItemById)
    .delete('/deleteitem', oprItemsController.deleteOprdraftItem)
module.exports = router;
