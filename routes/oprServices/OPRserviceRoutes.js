const express = require("express");
const router = express.Router();
const ServicePO = require("../../controllers/Quo/QuoController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
    .get("/pos", ServicePO.getConfirmQuoList);

module.exports = router;