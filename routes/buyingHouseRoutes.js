// routes/api.js
const express = require('express');
const router = express.Router();
const buyHouseController = require('../controllers/buyHouseController');
const setAuditFields = require('../middleware/setAuditFields.js');
const BuyingHouseController = require('../controllers/buyingHouseController.js');


router
    .post('/create',setAuditFields, BuyingHouseController.createBuyingHouse)
    .get('/dropdown', BuyingHouseController.getBhdropDown)
    .get('/list', BuyingHouseController.getAllBuyingHouses)
    .get('/buyinghouses/:id', BuyingHouseController.getBuyingHouseById)
    .put('/update', BuyingHouseController.updateBuyingHouse)
    .delete('/delete', BuyingHouseController.deleteBuyingHouse);

module.exports = router;

