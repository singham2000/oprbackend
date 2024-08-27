const express = require("express");
const router = express.Router();
const OperationsNafdacController = require("../../controllers/Opreations/NafdacController");
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");

// API routes
router
  .get("/", OperationsNafdacController.getOperationsNafdacs)
  .post(
    "/",
    setAuditFields,
    uploadMulti.any(),
    OperationsNafdacController.createOperationsNafdac
  )
  .put("/", setAuditFields, OperationsNafdacController.updateOperationsNafdac)
  .delete("/", OperationsNafdacController.deleteOperationsNafdac);

module.exports = router;
