const express = require("express");
const router = express.Router();
const FormMController = require("../../controllers/Pfi/FormMController.js");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", FormMController.getFormMTerms)
  .post("/", setAuditFields, uploadMulti.any(), FormMController.createFormMTerm)
  .put("/", setAuditFields, FormMController.updateFormMTerm)
  .delete("/", FormMController.deleteFormMTerm);

module.exports = router;
