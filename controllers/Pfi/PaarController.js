const db = require("../../models");
const { paar, document } = db;
const { Op } = require("sequelize");

// Create a new paar
const createPaarTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfi_id,
      pfi_num,
      form_m_id,
      form_m_num,
      paar_no,
      paar_date,
      received_on,
      exchange_rate,
      fob_invoice_amount,
      fob_uplift,
      freight_uplift,
      insurance_uplift,
      cif_value_naira,
      remarks,
    } = req.body;

    const result = await paar.create({
        pfi_id,
        pfi_num,
        form_m_id,
        form_m_num,
        paar_num: paar_no, // Ensure this field matches the model
        paar_date,
        received_on,
        exchange_rate, // Ensure this field matches the model
        fob_invoice_amount,
        fob_uplift,
        freight_uplift,
        insurance_uplift,
        cif_value_naira,
        remarks,
      status: 1,
    });

    const lastInsertedId = result.paar_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "paar",
            type: "PFI Add PAAR",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating paar term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getPaarTerms = async (req, res, next) => {
  const paar_id = req.query.paar_id;
  try {
    if (!paar_id) {
      const result = await paar.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["paar_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await paar.findByPk(paar_id, {
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
const updatePaarTerm = async (req, res, next) => {
  const paar_id = req.query.paar_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await paar.findByPk(paar_id);

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
const deletePaarTerm = async (req, res, next) => {
  const paar_id = req.query.paar_id;
  try {
    const result = await paar.update(
      { status: 0 },
      {
        where: {
          paar_id: paar_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

PaarController = {
  createPaarTerm,
  getPaarTerms,
  updatePaarTerm,
  deletePaarTerm,
};

module.exports = PaarController;
