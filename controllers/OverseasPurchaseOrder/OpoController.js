const db = require("../../models");
const { opo_master, opo_items } = db;

const { Op } = require("sequelize");
const { generateSeries } = require("../seriesGenerate");

// Create a new penalty term
// const createOpoTerm = async (req, res, next) => {
//   try {
//     const opo_series = await generateSeries("OPO");
//     console.log(req.body);
//     console.log(opo_series);

//     const { quo_id, quo_num, total_cost, opr_id, opr_num, vendor_id, item_list } = req.body;

//     const result = await opo_master.create({
//       opo_num: opo_series,
//       quo_id,
//       quo_num,
//       opr_id,
//       opr_num,
//       vendor_id,
//       total_cost,
//       status: 1,
//     });
//     const LastInsertedId = opo_master.opo_id

//     const opoItems = await Promise.all(item_list.map(async (items) => {
//       const result2 = await opo_items.create({
//         opo_id: LastInsertedId,
//         ...items,
//         status: 1
//       });
//       return result2; // return the result if needed
//     }));

//     return res.status(201).json({ message: "Submit Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
const createOpoTerm = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a transaction

  try {
    const opo_series = await generateSeries("OPO");
    console.log(req.body);
    console.log(opo_series);

    const {
      quo_id,
      quo_num,
      total_cost,
      opr_id,
      opr_num,
      vendor_id,
      item_list,
    } = req.body;

    const result = await opo_master.create(
      {
        opo_num: opo_series,
        quo_id,
        quo_num,
        opr_id,
        opr_num,
        vendor_id,
        total_cost,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction

    const LastInsertedId = result.opo_master_id; // Use the result from the create operation

    const opoItems = await Promise.all(
      item_list.map(async (items) => {
        const result2 = await opo_items.create(
          {
            opo_id: LastInsertedId,
            ...items,
            status: 1,
          },
          { transaction }
        ); // Pass the transaction
        return result2; // return the result if needed
      })
    );

    await transaction.commit(); // Commit the transaction

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction on error
    next(err); // Pass the error to the error handling middleware
  }
};

// Get Commercial Invoice
const getOpoTerms = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id;
  try {
    if (!opo_master_id) {
      const result = await opo_master.findAll({
        where: {
          status: {
            [Op.ne]: 0,
          },
        },
        attributes: [
          "opo_master_id",
          "opo_num",
          "quo_id",
          "quo_num",
          "opr_id",
          "opr_num",
          "vendor_id",
          "total_cost",
          "status",
        ],
        include: [
          {
            model: db.quotation_master,
            attributes: [
              "rfq_id",
              "reference_no",
              "reference_date",
              "quo_date",
              "currency",
              "delivery_terms",
              "country_origin",
              "country_supply",
              "port_loading",
              "lead_time",
              "payment_terms",
              "remarks",
              "total_cost",
              "opr_lead_time",
              "port_of_loading",
              [
                db.sequelize.literal("dbo.fn_GetPaymentTerm(payment_terms)"),
                "payment_terms_name",
              ],
              [
                db.sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
                "delivery_terms_name",
              ],
            ],
          },
          {
            model: db.OprMaster,
            attributes: [
              "vertical_id",
              "company_id",
              "opr_date",
              "division_id",
              "buy_from",
              "buying_house_id",
              "shipment_mode_id",
              "delivery_timeline_id",
              "department_id",
              "requested_by",
              "no_quot_email_alert",
              "remarks",
              "suppliers",
              "item_category_id",
            ],
            include: [
              { model: db.CompanyMaster, attributes: ['company_name', 'company_id'] },
              { model: db.Vertical, attributes: ['vertical_name'] },
              { model: db.Division, attributes: ['division_name'] },
              { model: db.ShipMode, attributes: ['shipment_mode_name'] },
              { model: db.DeliveryTimeline, attributes: ['delivery_timeline_name'] },
              { model: db.Department, attributes: ['dept_name'] },
              { model: db.BuyingHouse, attributes: ['buying_house_name'] },
          ],
          },
          {
            model: db.vendor,
            attributes: [
              "vendor_series",
              "vendor_name",
              "phone_number",
              "alternate_phone_number",
              "email",
              "contact_person",
              "contact_person_phone",
              "contact_person_email",
              "tax_id",
              "payment_terms_id",
              "pan_num",
              "tin_num",
              "gst_num",
              "vat_num",
              "reference_by",
              "vendor_type_id",
              "vendor_status",
              "registration_date",
              "compliance_status",
            ],
          },
          {
            model: db.opo_items,
            attributes: [
              "opo_items_id",
              "opo_id",
              "rfq_id",
              "vendor_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "opr_qty",
              "pack_size",
              "pack_type",
              "quote_qtd",
              "rate",
              [
                db.sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
        ],
      });
      return res.status(200).json(result);
    } else {
      const result = await opo_master.findByPk(opo_master_id, {
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
const updateOpoTerm = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await opo_master.findByPk(opo_master_id);

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
const deleteOpoTerm = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id;
  try {
    const result = await opo_master.update(
      { status: 0 },
      {
        where: {
          opo_master_id: opo_master_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

OpoController = {
  createOpoTerm,
  getOpoTerms,
  updateOpoTerm,
  deleteOpoTerm,
};

module.exports = OpoController;
