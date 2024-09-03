// routes/api.js
const express = require('express');
const router = express.Router();
const pfiController = require('../controllers/pfiController');
const newpfiController = require('../controllers/PfiController/pfiController.js');
const { getPfiLineItemByPoid } = require('../controllers/PfiController/pfiItemController.js');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/get', pfiController.getPfi)
    .get('/pfibypoid', pfiController.getPfibyPoid)
    .get('/pfibyid', pfiController.getPfibyid)
    // .post('/create', setAuditFields, pfiController.genratePfi)
    .get('/create2', setAuditFields, pfiController.genratePfi2)
router
    .post('/create', setAuditFields, newpfiController.create)
    .get('/list', newpfiController.pfilist)
router.get('/pfiitems', getPfiLineItemByPoid)


module.exports = router; 