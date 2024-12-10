const db = require("../../models");
const { Op } = require("sequelize");

const CreateContainerAllocationByCiId = async (req, res, next) => {
  const {
    pfi_id,
    pfi_num,
    ci_amount,
    ci_id,
    ci_num,
    bl_awb_no,
    ba_num,
    revised_eta,
    tdo_dt,
    ecd_received,
    ecd_received_dt,
    multi_upload_copy,
    submitted_to_bank,
    multi_upload_copy_bank,
  } = req.body;
  console.log("req.body", req.body);
  try {
    // let result = await db.container_allocation.findAll({
    //   where: { ci_id: ci_id, status: 1 },
    // });

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceControllerCreate = {
  CreateContainerAllocationByCiId,
};

module.exports = CommercialInvoiceControllerCreate;
