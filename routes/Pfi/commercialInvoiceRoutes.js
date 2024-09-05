const express = require("express");
const router = express.Router();
const CommercialInvoiceController = require("../../controllers/Pfi/CommercialInvoiceController");
const setAuditFields = require("../../middleware/setAuditFields.js");

// API routes
router
  .get("/", CommercialInvoiceController.getCommercialInvoiceTerms)
  .post("/", setAuditFields, CommercialInvoiceController.createCommercialInvoiceTerm)
  .put("/", setAuditFields, CommercialInvoiceController.updateCommercialInvoiceTerm)
  .delete("/", CommercialInvoiceController.deleteCommercialInvoiceTerm);

module.exports = router;
