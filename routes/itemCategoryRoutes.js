const express = require('express');
const router = express.Router();
const {
    createItemCategory,
    getAllItemCategories,
    getItemCategoryById,
    updateItemCategory,
    deleteItemCategory
} = require('../controllers/itemCategoryController.js');
const setAuditFields = require('../middleware/setAuditFields.js');






// API routes for item categories
router
    .post('/itemcategory', setAuditFields, createItemCategory)
    .get('/itemcategories', getAllItemCategories)
    .get('/itemcategory/:id', getItemCategoryById)
    .put('/itemcategory/:id', updateItemCategory)
    .delete('/itemcategory/:id', deleteItemCategory);

module.exports = router;
