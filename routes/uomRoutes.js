
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const uomController = require('../controllers/uomController');

// API routes
router
    .get('/uoms', uomController.getAllUom)
    .post('/uom', uomController.createUom)
    .get('/uom/:id', uomController.getUomById)
    .delete('/uoms/:id', uomController.deleteUomById)

module.exports = router;
