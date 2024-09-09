const db = require("../../models");
const { form_m, document } = db;
const { Op } = require("sequelize");

// Create a new form_m
const createFormMTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfiNum,
      pfiId,
      bank1_id,
      insurenceId,
      insurenceNum,
      formM_number,
      formm_date,
      pi_description,
      formm_expiry_date,
      ba_number,
      formm_rec_date,
    } = req.body;

    const result = await form_m.create({
      pfi_id: pfiId,
      pfi_num: pfiNum,
      insurance_id: insurenceId,
      insurance_num: insurenceNum,
      form_m_num: formM_number,
      form_m_date: formm_date,
      pfi_description: pi_description,
      form_m_expiry_date: formm_expiry_date,
      ba_num: ba_number,
      form_m_recd_date: formm_rec_date,
      status: 1,
      bank1_id
    });

    const lastInsertedId = result.form_m_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "form_m",
            type: "PFI Add FORM M",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating form_m term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getFormMTerms = async (req, res, next) => {
  const form_m_id = req.query.form_m_id;
  try {
    if (!form_m_id) {
      const result = await form_m.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["form_m_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await form_m.findByPk(form_m_id, {
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
const updateFormMTerm = async (req, res, next) => {
  const form_m_id = req.query.form_m_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await form_m.findByPk(form_m_id);

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
const deleteFormMTerm = async (req, res, next) => {
  const form_m_id = req.query.form_m_id;
  try {
    const result = await form_m.update(
      { status: 0 },
      {
        where: {
          form_m_id: form_m_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const chekFormAvlforpfiid = async (pfi_id) => {
  try {
    const count = await form_m.count({
      where: { pfi_id: pfi_id }
    });

    // Determine the status based on the count
    return count > 0 ? 1 : 0;
  } catch (err) {
    console.log("Chedck funtion ")
    console.log(err)
  }
}

const formm_docby_by_pfi_id = async (req, res, next) => {
  try {
    let { pfi_id } = req.query;
    const formData = await form_m.findAll({
      where: { pfi_id },
      include: [
        {
          model: db.document,
          where: {
            table_name: 'form_m'
          }
        },

      ]

    })
    res.status(200).json({
      data: formData
    })


  } catch (err) {
    next(err)
  }
}




FormMController = {
  createFormMTerm,
  getFormMTerms,
  updateFormMTerm,
  deleteFormMTerm,
  formm_docby_by_pfi_id,
  chekFormAvlforpfiid
};




module.exports = FormMController;
