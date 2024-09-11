const db = require("../../models");
const {
  commercial_invoice,
  ShippingMaster,
  Pfi_master,
  insurance,
  form_m,
  letter_of_credit,
  son_pfi,
  assessment

} = db;



const { Op } = require("sequelize");
const { generateSeries } = require("../seriesGenerate");


// Create a new penalty term
const createCommercialInvoiceTerm = async (req, res, next) => {
  try {
    const ci_series = await generateSeries('INVOICE');

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
      status: 1
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
              { model: ShippingMaster }

            ]
          }],
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
  const { roation_no,commercial_invoice_id } = req.body;
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
};

module.exports = CommercialInvoiceController; 