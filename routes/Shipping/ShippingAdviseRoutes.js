const express = require("express");
const router = express.Router();
const ShippingAdviseController = require("../../controllers/ShippingController/ShippingAdviseController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", ShippingAdviseController.getShippingAdviseTerms)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    ShippingAdviseController.createShippingAdviseTerm
  )
  .put("/", setAuditFields, ShippingAdviseController.updateShippingAdviseTerm)
  .delete("/", ShippingAdviseController.deleteShippingAdviseTerm);

module.exports = router;