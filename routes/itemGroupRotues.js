const express = require('express');
const router = express.Router();
const itemGroupController = require('../controllers/itemGroupController.js')
const setAuditFields = require('../middleware/setAuditFields.js');






// API routes for item categories
router
    .post('/group',setAuditFields, itemGroupController.createItemGroup)
    .get('/groups', itemGroupController.getAllItemGroups)
    .get('/group/:id', itemGroupController.getItemGroupById)
    .put('/itemcategory/:id', setAuditFields,itemGroupController.updateItemGroup)
    .delete('/itemcategory/:id', itemGroupController.deleteItemGroup);

module.exports = router;
