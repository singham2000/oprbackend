// routes/api.js
const express = require('express');
const router = express.Router();


// const itemController = require('../controllers/itemController');
const { getAllRfqItem, getRfqItemById, deleteRfqItemById, getRfqItemByRfqid } = require('../controllers/rfqItemsController');

// API routes
router
    .get('/items', getAllRfqItem)
    .get('/itemsbyrfqid', getRfqItemByRfqid)
    .get('/item/:id', getRfqItemById)
    .delete('/item/:id', deleteRfqItemById)
module.exports = router;
