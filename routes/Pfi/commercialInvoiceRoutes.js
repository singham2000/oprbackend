const express = require("express");
const router = express.Router();
const CommercialInvoiceController = require("../../controllers/Pfi/CommercialInvoiceController");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", CommercialInvoiceController.getCommercialInvoiceTerms)
  .post("/", setAuditFields, CommercialInvoiceController.createCommercialInvoiceTerm)
  .post("/soncap", setAuditFields, CommercialInvoiceController.createSoncap)
  .post("/nafdac/inspection/expense", setAuditFields, CommercialInvoiceController.createNafdac)
  .post("/nafdac/clearance", setAuditFields, CommercialInvoiceController.createNafdacClearing)
  .post("/nafdac/penalty", setAuditFields, CommercialInvoiceController.createNafdacPenalty)
  .post("/other/govt/charges", setAuditFields, CommercialInvoiceController.createOtherGovtCharges)
  .post("/custom/clearance", setAuditFields, CommercialInvoiceController.createCustomClearance)
  .put("/", setAuditFields, CommercialInvoiceController.updateCommercialInvoiceTerm)
  .delete("/", CommercialInvoiceController.deleteCommercialInvoiceTerm);

module.exports = router;
