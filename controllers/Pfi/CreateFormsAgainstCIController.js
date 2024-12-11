const db = require("../../models");
const { Op } = require("sequelize");

const CreateContainerAllocationByCiId = async (req, res, next) => {
  try {
    const { NafdacData } = req.body;

    if (!Array.isArray(NafdacData)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. NafdacData must be an array." });
    }
    console.log(NafdacData);
    // Iterate over each item in NafdacData
    for (let item of NafdacData) {
      // Validate the necessary fields for each item
      // if (!item.ci_id || !item.ci_num || !item.bl_awb_no) {
      //   return res
      //     .status(400)
      //     .json({ message: "Missing required fields in data." });
      // }

      // Create the exchange control document entry
      // const exchangeControl = await db.exchange_control.create({
      //   ci_id: item.ci_id,
      //   ci_num: item.ci_num,
      //   bl_awb_no: item.bl_awb_no,
      //   ba_num: item.ba_num,
      //   ci_amount: item.ci_amount,
      //   revised_eta: item.revised_eta,
      //   tdo_dt: item.tdo_dt,
      //   ecd_received: item.ecd_received,
      //   ecd_received_dt: item.ecd_received_dt,
      //   submitted_to_bank: item.submitted_to_bank,
      //   created_at: new Date(),
      // });

      // Handle file uploads for multi_upload_copy
      if (item.multi_upload_copy && item.multi_upload_copy.length > 0) {
        for (let file of item.multi_upload_copy) {
          console.log("file.originalname");
          //     await db.uploaded_files.create({
          //       exchange_control_id: exchangeControl.id,
          //       file_name: file.originalname,
          //       file_path: file.path,  // Assuming files are stored in the uploads directory
          //       file_type: file.mimetype,
          //       created_at: new Date(),
          //     });
        }
      }

      //   // Handle file uploads for multi_upload_copy_bank
      //   if (item.submitted_to_bank === 'Yes' && item.multi_upload_copy_bank && item.multi_upload_copy_bank.length > 0) {
      //     for (let file of item.multi_upload_copy_bank) {
      //       await db.uploaded_files.create({
      //         exchange_control_id: exchangeControl.id,
      //         file_name: file.originalname,
      //         file_path: file.path,
      //         file_type: file.mimetype,
      //         created_at: new Date(),
      //       });
      //     }
      //   }
      // }

      return res
        .status(201)
        .json({ message: "Exchange Control Data submitted successfully." });
    }
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceControllerCreate = {
  CreateContainerAllocationByCiId,
};

module.exports = CommercialInvoiceControllerCreate;