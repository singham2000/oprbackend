const express = require("express");
const router = express.Router();
const PaarController = require("../../controllers/Pfi/PaarController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", PaarController.getPaarTerms)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    PaarController.createPaarTerm
  )
  .put("/", setAuditFields, PaarController.updatePaarTerm)
  .delete("/", PaarController.deletePaarTerm);

module.exports = router;
