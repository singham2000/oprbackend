const express = require('express');
const router = express.Router();
const itemGroupController = require('../controllers/itemGroupController.js')
const itemSubGroupController = require('../controllers/itemSubGroupController.js')
const setAuditFields = require('../middleware/setAuditFields.js');






// API routes for item categories
router
    .post('/group', setAuditFields, itemGroupController.createItemGroup)
    .get('/groups', itemGroupController.getAllItemGroups)
    .get('/group/:id', itemGroupController.getItemGroupById)
    .put('/itemcategory/:id', setAuditFields, itemGroupController.updateItemGroup)
    .delete('/itemcategory/:id', itemGroupController.deleteItemGroup);

module.exports = router;

// this for main group
router
    .post('/create', setAuditFields, itemGroupController.createItemGroup)
    .get('/list', itemGroupController.getAllItemGroups)
    .get('/dropdown', itemGroupController.itemGropuDrpDn)
    .put('/update', setAuditFields, itemGroupController.updateItemGroup)
    .delete('/delete', setAuditFields, itemGroupController.deleteItemGroup);

//this for sub group
router
    .post('/subgroup/create', setAuditFields, itemSubGroupController.createItemSubGroup)
    .get('/subgroup/list', itemSubGroupController.getAllItemSubGroups)
    .put('/subgroup/update', setAuditFields, itemSubGroupController.updateItemSubGroup)
    .delete('/subgroup/delete', setAuditFields, itemSubGroupController.deleteItemSubGroup);

