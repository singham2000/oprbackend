const express = require("express");
const router = express.Router();
const OpoController = require("../../controllers/OverseasPurchaseOrder/OpoController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", OpoController.getOpoTerms)
  .post("/", setAuditFields, OpoController.createOpoTerm)
  .put("/", setAuditFields, OpoController.updateOpoTerm)
  .delete("/", OpoController.deleteOpoTerm);

module.exports = router;
