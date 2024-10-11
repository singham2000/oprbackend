const db = require("../../models");
const { shippment_instructions, document } = db;
const { Op } = require("sequelize");

// Create a new shippment_instructions
const createShippingInstructionsTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
        po_id,
        vendor_id,
        quo_date,
        currency,
        delivery_terms,
        lead_time,
        payment_terms,
        remarks,
        buyer_name,
        buyer_address,
        shipper_po_vendor,
        po_number,
        supplier_ref_no,
        delivery_term,
        shipment_mode,
        no_of_previous_shipment,
        shipper,
        consignee,
        notify,
        port_of_loading,
        port_of_discharge,
        final_destination,
        goods_description,
        label_check,
        bill_of_loading_check
    } = req.body;

    const result = await shippment_instructions.create({
        po_id,
        po_num: po_number,
        vendor_id,
        quo_date,
        currency,
        delivery_terms,
        lead_time,
        payment_terms,
        remarks,
        buyer_name,
        buyer_address,
        shipper_po_vendor,
        supplier_ref_no,
        delivery_term,
        shipment_mode,
        no_of_previous_shipment,
        shipper,
        consignee,
        notify,
        port_of_loading,
        port_of_discharge,
        final_destination,
        goods_description,
        label_check,
        bill_of_loading_check,
      status: 1,
    });

    const lastInsertedId = result.shippment_instructions_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "shippment_instructions",
            type: "Shipping Instructions Documents",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating shippment_instructions term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getShippingInstructionsTerms = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;
  try {
    if (!shippment_instructions_id) {
      const result = await shippment_instructions.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shippment_instructions_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shippment_instructions.findByPk(shippment_instructions_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateShippingInstructionsTerm = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shippment_instructions.findByPk(shippment_instructions_id);

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
const deleteShippingInstructionsTerm = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;
  try {
    const result = await shippment_instructions.update(
      { status: 0 },
      {
        where: {
          shippment_instructions_id: shippment_instructions_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingInstructionsController = {
  createShippingInstructionsTerm,
  getShippingInstructionsTerms,
  updateShippingInstructionsTerm,
  deleteShippingInstructionsTerm,
};

module.exports = ShippingInstructionsController;
