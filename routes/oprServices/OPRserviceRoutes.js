const express = require("express");
const router = express.Router();
const ServicePO = require("../../controllers/Quo/QuoController.js");
const NewServicePO = require("../../controllers/Services/servicePo.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
    .get("/pos", ServicePO.getConfirmQuoList)
    .get("/pos/vacceptance", NewServicePO.getServicePoForVendorAcceptance)
    .post("/pos/accpetvend", NewServicePO.confirmpoAcceptance);

module.exports = router;