const db = require("../../models");
const { govt_charges, document } = db;
const { Op } = require("sequelize");

// Create a new govt_charges
const createGovtCharges = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      payment_types,
      add_expense,
      paid_to_others,
      invoice_num,
      invoice_date,
      amount,
      vat,
      remit_charges,
      narration,
      penalty_approval,
    } = req.body;

    const result = await govt_charges.create({
      payment_types,
      add_expense,
      paid_to_others,
      invoice_num,
      invoice_date,
      amount,
      vat,
      remit_charges,
      narration,
      penalty_approval,
      status: 1,
    });

    const lastInsertedId = result.govt_charges_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "govt_charges",
            type: "Add Govt Charges",
            doc_name: `${file.fieldname}-${file.originalname}`,
            title: "Govt Charges Document",
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating govt_charges term:", err);
    next(err);
  }
};

const createOtherCharges = async (req, res, next) => {
  try {
    console.log(req.body);

    const { invoice_num, other_amount, other_narration } = req.body;

    const result = await govt_charges.update(
      {
        other_amount,
        other_narration,
        govt_status: 1,
      },
      {
        where: {
          invoice_num: invoice_num,
        },
      }
    );

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating govt_charges term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;
  try {
    if (!govt_charges_id) {
      const result = await govt_charges.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["govt_charges_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await govt_charges.findByPk(govt_charges_id, {
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
const updateGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await govt_charges.findByPk(govt_charges_id);

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
const deleteGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;
  try {
    const result = await govt_charges.update(
      { status: 0 },
      {
        where: {
          govt_charges_id: govt_charges_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

GovtChargesController = {
  createGovtCharges,
  getGovtCharges,
  updateGovtCharges,
  deleteGovtCharges,
  createOtherCharges,
};

module.exports = GovtChargesController;
