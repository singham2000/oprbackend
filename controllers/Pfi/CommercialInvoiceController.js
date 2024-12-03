const db = require("../../models");
const {
  commercial_invoice,
  ShippingMaster,
  Pfi_master,
  insurance,
  form_m,
  letter_of_credit,
  son_pfi,
  assessment,
  CompanyMaster,
  operations_nafdac,
  paar,
  operations_nafdac_master,
  govt_charges,
} = db;

const { Op } = require("sequelize");
const { generateSeries } = require("../seriesGenerate");

const createCustomClearance = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      goods_examination_booking_dt,
      goods_examination_dont_dt,
      re_examination_required,
      re_examination_booking_dt,
      re_examination_done_dt,
      customs_release_received_on,
      customs_gate_release_rev_dt,
      custom_query,
      query_raised_on_dt,
      query_resolved_on_dt,
      exchange_con_rev,
      exchange_con_rev_dt,
      updatedStr,
      custom_clearance_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (custom_clearance_id) {
      await db.custom_clearance.update(
        {
          goods_examination_booking_dt,
          goods_examination_dont_dt,
          re_examination_required,
          re_examination_booking_dt,
          re_examination_done_dt,
          customs_release_received_on,
          customs_gate_release_rev_dt,
          custom_query,
          query_raised_on_dt,
          query_resolved_on_dt,
          exchange_con_rev,
          exchange_con_rev_dt,
          query_types: updatedStr,
          updated_by: user_id,
        },
        {
          where: { custom_clearance_id: custom_clearance_id },
        }
      );
    } else {
      await db.custom_clearance.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        goods_examination_booking_dt,
        goods_examination_dont_dt,
        re_examination_required,
        re_examination_booking_dt,
        re_examination_done_dt,
        customs_release_received_on,
        customs_gate_release_rev_dt,
        custom_query,
        query_raised_on_dt,
        query_resolved_on_dt,
        exchange_con_rev,
        exchange_con_rev_dt,
        query_types: updatedStr,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const createNafdacPenalty = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      endorsement_penalty_type,
      first_endorsement,
      Second_endorsement,
      penalty_item_label,
      invoiceItemsArr,
      nafdac_penalty_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    let lastInsertedId = 0;

    if (nafdac_penalty_id) {
      await db.nafdac_penalty.update(
        {
          endorsement_penalty_type,
          first_endorsement,
          Second_endorsement,
          penalty_item_label,
          updated_by: user_id,
        },
        {
          where: { nafdac_penalty_id: nafdac_penalty_id },
        }
      );
      lastInsertedId = nafdac_penalty_id;
    } else {
      let result = await db.nafdac_penalty.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        endorsement_penalty_type,
        first_endorsement,
        Second_endorsement,
        penalty_item_label,
        status: 1,
        created_by,
      });
      let lastInsertedId = result?.nafdac_penalty_id;

      if (invoiceItemsArr && invoiceItemsArr.length > 0) {
        await Promise.all(
          invoiceItemsArr.map(async (item) => {
            await db.nafdac_penalty_item.create({
              nafdac_penalty_id: lastInsertedId,
              ...item,
              status: 1,
            });
          })
        );
      }
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createNafdacClearing = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      nafdac_applied_dt,
      nafdac_clearance_type,
      invoice_received_dt,
      invoice_type,
      first_endorsement_received_dt,
      second_endorsement_received_dt,
      release_type,
      full_release_date,
      partial_release_date,
      full_release_received,
      full_release_received_date,
      sample_collected_dt,
      sample_collected_qty,
      sample_return,
      sample_return_date,
      sample_return_qty,
      nafdac_clearance_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (nafdac_clearance_id) {
      await db.nafdac_clearance.update(
        {
          nafdac_applied_dt,
          nafdac_clearance_type,
          invoice_received_dt,
          invoice_type,
          first_endorsement_received_dt,
          second_endorsement_received_dt,
          release_type,
          full_release_date,
          partial_release_date,
          full_release_received,
          full_release_received_date,
          sample_collected_dt,
          sample_collected_qty,
          sample_return,
          sample_return_date,
          sample_return_qty,
          updated_by: user_id,
        },
        {
          where: { nafdac_clearance_id: nafdac_clearance_id },
        }
      );
    } else {
      await db.nafdac_clearance.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        nafdac_applied_dt,
        nafdac_clearance_type,
        invoice_received_dt,
        invoice_type,
        first_endorsement_received_dt,
        second_endorsement_received_dt,
        release_type,
        full_release_date,
        partial_release_date,
        full_release_received,
        full_release_received_date,
        sample_collected_dt,
        sample_collected_qty,
        sample_return,
        sample_return_date,
        sample_return_qty,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createNafdac = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      payment_dt,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_type,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      nafdac_inspection_expense_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (nafdac_inspection_expense_id) {
      await db.nafdac_inspection_expense.update(
        {
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          payment_dt,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_type,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          updated_by: user_id,
        },
        {
          where: { nafdac_inspection_expense_id: nafdac_inspection_expense_id },
        }
      );
    } else {
      await db.nafdac_inspection_expense.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        bill_num,
        bill_dt,
        Amount,
        vat,
        inv_total,
        remita_charges,
        remita_vat,
        payment_total,
        payment_dt,
        ref_no,
        payment_bank,
        payment_bank_account_num,
        penalty_amount,
        penalty_type,
        penalty_vat,
        penalty_total,
        penalty_remita_charges,
        penalty_remita_vat,
        penalty_payment_total,
        penalty_approved_by,
        penalty_approved_dt,
        remarks,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createOtherGovtCharges = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      agency,
      payment_mode_to,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      payment_dt,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      other_govt_charges_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (other_govt_charges_id) {
      await db.other_govt_charges.update(
        {
          agency,
          payment_mode_to,
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          payment_dt,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          updated_by: user_id,
        },
        {
          where: { other_govt_charges_id: other_govt_charges_id },
        }
      );
    } else {
      await db.other_govt_charges.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        agency,
        payment_mode_to,
        bill_num,
        bill_dt,
        Amount,
        vat,
        inv_total,
        remita_charges,
        remita_vat,
        payment_total,
        payment_dt,
        ref_no,
        payment_bank,
        payment_bank_account_num,
        penalty_amount,
        penalty_vat,
        penalty_total,
        penalty_remita_charges,
        penalty_remita_vat,
        penalty_payment_total,
        penalty_approved_by,
        penalty_approved_dt,
        remarks,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new penalty term
const createSoncap = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      ConatinerArr,
      bl_num,
      soncap_master_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (ConatinerArr && ConatinerArr.length > 0) {
      await Promise.all(
        ConatinerArr.map(async (item) => {
          await db.add_shippment_container.update(
            {
              bl_num: bl_num,
              soncap_amount: item.amount,
            },
            {
              where: {
                add_shippment_container_id: item.add_shippment_container_id,
              },
            }
          );
        })
      );
    }

    if (soncap_master_id) {
      await db.soncap_master.update(
        {
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          updated_by: user_id,
        },
        {
          where: { soncap_master_id: soncap_master_id },
        }
      );
    } else {
      await db.soncap_master.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        bill_num,
        bill_dt,
        Amount,
        vat,
        inv_total,
        remita_charges,
        remita_vat,
        payment_total,
        ref_no,
        payment_bank,
        payment_bank_account_num,
        penalty_amount,
        penalty_vat,
        penalty_total,
        penalty_remita_charges,
        penalty_remita_vat,
        penalty_payment_total,
        penalty_approved_by,
        penalty_approved_dt,
        remarks,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new penalty term
const createCommercialInvoiceTerm = async (req, res, next) => {
  try {
    const ci_series = await generateSeries("INVOICE");

    const {
      pfiId,
      pfiNum,
      ciSender,
      ciSenderDate,
      customer,
      invoiceNo,
      invoiceDate,
      oprNo,
      shipmentType,
      mode,
      exchangeDate,
      totalPackage,
      portOfDC,
      deliveryTerms,
      portOfLoading,
      countryOfOrigin,
      countryOfSupply,
      paymentTerms,
      finalDestination,
      countryOfFinalDestination,
      blNo,
      blDate,
      vesselName,
      vesselNo,
      shippingLineName,
      etaDate,
      freeDays,
      totalNetWeight,
      totalGrossWeight,
      uom,
      sealNo,
      cbm,
      invoiceRemark,
      inlandCharges,
      freightCharges,
      inspectionCharges,
      fullandFinal,
    } = req.body;

    const result = await commercial_invoice.create({
      pfi_id: pfiId,
      pfi_num: pfiNum,
      ci_num: ci_series,
      ci_sender: ciSender,
      ci_sender_date: ciSenderDate,
      customer: customer,
      invoice_num: invoiceNo,
      invoice_date: invoiceDate,
      opr_num: oprNo,
      shipment_type: shipmentType,
      mode: mode,
      full_final: fullandFinal,
      currency: exchangeDate, // Assuming `exchangeDate` should map to `currency`, adjust if needed
      total_package: totalPackage,
      port_dc: portOfDC,
      delivery_terms: deliveryTerms,
      port_of_loading: portOfLoading,
      country_origin: countryOfOrigin,
      country_supply: countryOfSupply,
      payment_terms: paymentTerms,
      final_destination: finalDestination,
      country_final_destination: countryOfFinalDestination,
      bl_num: blNo,
      bl_date: blDate,
      vessel_name: vesselName,
      vessel_no: vesselNo,
      shipping_line_name: shippingLineName,
      eta_date: etaDate,
      free_days: freeDays,
      total_net_weight: totalNetWeight,
      total_gross_weight: totalGrossWeight,
      uom: uom,
      seal_num: sealNo,
      cbm: cbm,
      invoice_remarks: invoiceRemark,
      inland_charges: inlandCharges,
      freight_charges: freightCharges,
      inspection_charges: inspectionCharges,
      status: 1,
    });
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getCommercialInvoiceTerms = async (req, res, next) => {
  const commercial_invoice_id = req.query.commercial_invoice_id;
  try {
    if (!commercial_invoice_id) {
      const result = await commercial_invoice.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        include: [
          {
            model: Pfi_master,
            include: [
              { model: insurance },
              { model: form_m },
              { model: letter_of_credit },
              { model: son_pfi },
              { model: assessment },
              { model: ShippingMaster },
              { model: CompanyMaster },
              { model: operations_nafdac },
              { model: paar },
              { model: operations_nafdac_master },
              { model: govt_charges },
            ],
          },
        ],
        order: [["commercial_invoice_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await commercial_invoice.findByPk(commercial_invoice_id, {
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
const updateCommercialInvoiceTerm = async (req, res, next) => {
  const commercial_invoice_id = req.query.commercial_invoice_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await commercial_invoice.findByPk(
      commercial_invoice_id
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
const deleteCommercialInvoiceTerm = async (req, res, next) => {
  const commercial_invoice_id = req.query.commercial_invoice_id;
  try {
    const result = await commercial_invoice.update(
      { status: 0 },
      {
        where: {
          commercial_invoice_id: commercial_invoice_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const addRotaionNo = async (req, res, next) => {
  const { roation_no, commercial_invoice_id } = req.body;
  try {
    const result = await commercial_invoice.update(
      { status: 0 },
      {
        where: {
          commercial_invoice_id: commercial_invoice_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceController = {
  createCommercialInvoiceTerm,
  getCommercialInvoiceTerms,
  updateCommercialInvoiceTerm,
  deleteCommercialInvoiceTerm,
  createSoncap,
  createOtherGovtCharges,
  createNafdac,
  createNafdacClearing,
  createNafdacPenalty,
  createCustomClearance,
};

module.exports = CommercialInvoiceController;
