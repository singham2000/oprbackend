const db = require("../../models");
const { shippment_advise_master, shippment_advise_additional_instruction, document } = db;
const { Op } = require("sequelize");

// Create a new shippment_advise_master
const createShippingAdviseTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      po_num,
      po_id,
      shipment_status,
      invoice_amount,
      bl_awb_no,
      bl_awb_date,
      type_of_bl,
      shipment_type,
      cbm_information,
      free_days,
      shipping_vehicle,
      vehicle_description,
      port_of_loading,
      port_of_discharge,
      final_destination,
      goods_description,
      shipper_name,
      consignee_name,
      notify_name,
      free_days_time,
      freight,
      eta,
      additional_information,
      doc_list
    } = req.body;

    const result = await shippment_advise_master.create({
      po_id,
      po_num,
      shipment_status,
      invoice_amount,
      bl_awb_no,
      bl_awb_date,
      type_of_bl,
      shipment_type,
      cbm_information,
      free_days,
      shipping_vehicle,
      vehicle_description,
      port_of_loading,
      port_of_discharge,
      final_destination,
      goods_description,
      shipper_name,
      consignee_name,
      notify_name,
      free_days_time,
      freight,
      eta,
      status: 1,
    });

    const lastInsertedId = result.shippment_advise_master_id;

    if (additional_information && additional_information.length > 0) {
      await Promise.all(
        additional_information.map(async (item) => {
          await shippment_advise_additional_instruction.create({
            shippment_advise_id: lastInsertedId,
            po_id: po_id,
            po_num: po_num,
            other: item.other,
            status: 1,
          });
        })
      );
    }

    const updatedShippingAdviseDocs = doc_list.map((data, index) => ({
        quotation_id: '',
        doc_id: lastInsertedId,
        module: 'shippment_advise_master',
        q_doc_remarks: data.name, 
        q_doc_name: data.remark,
        q_doc_filename: req.files[index]?.originalname,
        q_doc_file: req.files[index]?.buffer.toString("base64"),
      }));

      await db.QuoDoc.bulkCreate(updatedShippingAdviseDocs);

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating shippment_advise_master term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getShippingAdviseTerms = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    if (!shippment_advise_master_id) {
      const result = await shippment_advise_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shippment_advise_master_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shippment_advise_master.findByPk(
        shippment_advise_master_id,
        {
          where: {
            status: { [Op.ne]: 0 },
          },
        }
      );
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shippment_advise_master.findByPk(
      shippment_advise_master_id
    );

    // Update the shipment mode
    const { penalty_terms_name, status } = req.body;
    await PenaltyTerms.update({
      penalty_terms_name,
      status,
    });

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    const result = await shippment_advise_master.update(
      { status: 0 },
      {
        where: {
          shippment_advise_master_id: shippment_advise_master_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingAdviseController = {
  createShippingAdviseTerm,
  getShippingAdviseTerms,
  updateShippingAdviseTerm,
  deleteShippingAdviseTerm,
};

module.exports = ShippingAdviseController;
