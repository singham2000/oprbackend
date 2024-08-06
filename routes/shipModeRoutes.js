
const express = require('express');
const router = express.Router();

const shipModeController = require('../controllers/shipModeController');

// API routes
router
    .get('/modes', shipModeController.getAllShipmentModes)
    .post('/mode', shipModeController.createShipmentMode)
    .get('/mode/:id', shipModeController.getShipmentModeById)
    .delete('/mode/:id', shipModeController.deleteShipmentMode)

module.exports = router;
