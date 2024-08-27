const db = require("../../models");
const { assessment, document } = db;
const { Op } = require("sequelize");

// Create a new assessment
const createAssessment = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfi_id,
      pfi_num,
      form_m_id,
      form_m_num,
      paar_id,
      paar_num,
      cNumber,
      assessmentDate,
      assessNo,
      agentName,
      dutyPaidToBank,
      exchangeRate,
      cifValue,
      dutyAmount,
      surchargeAmount,
      cissAmount,
      etlsAmount,
      levyAmount,
      vatAmount,
      penaltyAmount,
      totalDuty,      
    } = req.body;

    // assessmentDocument,
    //   sadDocument

    const result = await assessment.create({
      pfi_id,
      pfi_num,
      form_m_id,
      form_m_num,
      paar_id,
      paar_num,
      assessment_date: assessmentDate,   // Mapping req.body field to model field
      c_number: cNumber,                 // Mapping req.body field to model field
      assess_num: assessNo,             // Mapping req.body field to model field
      agent_name: agentName,            // Mapping req.body field to model field
      duty_to_be_paid_to_bank: dutyPaidToBank, // Mapping req.body field to model field
      exchange_rate: exchangeRate,      // Mapping req.body field to model field
      cif_value: cifValue,              // Mapping req.body field to model field
      duty_amount: dutyAmount,          // Mapping req.body field to model field
      surcharge_amount: surchargeAmount, // Mapping req.body field to model field
      ciss_amount: cissAmount,          // Mapping req.body field to model field
      elts_amount: etlsAmount,          // Mapping req.body field to model field
      levy_amount: levyAmount,          // Mapping req.body field to model field
      vat_amount: vatAmount,            // Mapping req.body field to model field
      penalty_amount: penaltyAmount,    // Mapping req.body field to model field
      total_duty: totalDuty, 
      status: 1,
    });

    const lastInsertedId = result.assessment_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "assessment",
            type: "PFI Add Assessment",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating assessment term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getAssessments = async (req, res, next) => {
  const assessment_id = req.query.assessment_id;
  try {
    if (!assessment_id) {
      const result = await assessment.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["assessment_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await assessment.findByPk(assessment_id, {
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
const updateAssessment = async (req, res, next) => {
  const assessment_id = req.query.assessment_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await assessment.findByPk(assessment_id);

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
const deleteAssessment = async (req, res, next) => {
  const assessment_id = req.query.assessment_id;
  try {
    const result = await assessment.update(
      { status: 0 },
      {
        where: {
          assessment_id: assessment_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

AssessmentController = {
  createAssessment,
  getAssessments,
  updateAssessment,
  deleteAssessment,
};

module.exports = AssessmentController;
