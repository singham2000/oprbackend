// routes/api.js
const express = require('express');
const router = express.Router();
const buyHouseController = require('../controllers/buyHouseController');
const setAuditFields = require('../middleware/setAuditFields.js');




// API routes
router

    .get('/houses', buyHouseController.getBuyHouse)
    .post('/house',setAuditFields, buyHouseController.createBuyHouse)
    .put('/house', buyHouseController.updateBuyHouseById)
    .delete('/house', buyHouseController.deleteBuyHouseById)

module.exports = router;
