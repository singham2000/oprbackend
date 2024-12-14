// const db = require("../../models");
// const { opo_master, opo_items } = db;

// const { Op } = require("sequelize");
// const { generateSeries } = require("../seriesGenerate");

// const createOpo = async (req, res, next) => {
//   const transaction = await db.sequelize.transaction(); // Start a transaction

//   try {
//     const opo_series = await generateSeries("OPO");
//     console.log(req.body);
//     console.log(opo_series);

//     const {
//       quo_id,
//       quo_num,
//       total_cost,
//       opr_id,
//       opr_num,
//       vendor_id,
//       item_list,
//     } = req.body;

//     const result = await opo_master.create(
//       {
//         opo_num: opo_series,
//         quo_id,
//         quo_num,
//         opr_id,
//         opr_num,
//         vendor_id,
//         total_cost,
//         status: 1,
//       },
//       { transaction }
//     ); // Pass the transaction

//     const LastInsertedId = result.opo_master_id; // Use the result from the create operation

//     const opoItems = await Promise.all(
//       item_list.map(async (items) => {
//         const result2 = await opo_items.create(
//           {
//             opo_id: LastInsertedId,
//             ...items,
//             status: 1,
//           },
//           { transaction }
//         ); // Pass the transaction
//         return result2; // return the result if needed
//       })
//     );

//     await transaction.commit(); // Commit the transaction

//     return res.status(201).json({ message: "Submit Successfully" });
//   } catch (err) {
//     await transaction.rollback(); // Rollback the transaction on error
//     next(err); // Pass the error to the error handling middleware
//   }
// };

// // Get Commercial Invoice
// const getOpo = async (req, res, next) => {
//   const opo_master_id = req.query.opo_master_id;
//   try {
//     if (!opo_master_id) {
//       const result = await opo_master.findAll({
//         where: {
//           status: {
//             [Op.ne]: 0,
//           },
//         },
//         attributes: [
//           "opo_master_id",
//           "opo_num",
//           "quo_id",
//           "quo_num",
//           "opr_id",
//           "opr_num",
//           "vendor_id",
//           "total_cost",
//           "status",
//         ],
//         include: [
//           {
//             model: db.quotation_master,
//             attributes: [
//               "rfq_id",
//               "reference_no",
//               "reference_date",
//               "quo_date",
//               "currency",
//               "delivery_terms",
//               "country_origin",
//               "country_supply",
//               "port_loading",
//               "lead_time",
//               "payment_terms",
//               "remarks",
//               "total_cost",
//               "opr_lead_time",
//               "port_of_loading",
//               [
//                 db.sequelize.literal("dbo.fn_GetPaymentTerm(payment_terms)"),
//                 "payment_terms_name",
//               ],
//               [
//                 db.sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
//                 "delivery_terms_name",
//               ],
//             ],
//           },
//           {
//             model: db.OprMaster,
//             attributes: [
//               "vertical_id",
//               "company_id",
//               "opr_date",
//               "division_id",
//               "buy_from",
//               "buying_house_id",
//               "shipment_mode_id",
//               "delivery_timeline_id",
//               "department_id",
//               "requested_by",
//               "no_quot_email_alert",
//               "remarks",
//               "suppliers",
//               "item_category_id",
//             ],
//             include: [
//               { model: db.CompanyMaster, attributes: ['company_name', 'company_id'] },
//               { model: db.Vertical, attributes: ['vertical_name'] },
//               { model: db.Division, attributes: ['division_name'] },
//               { model: db.ShipMode, attributes: ['shipment_mode_name'] },
//               { model: db.Department, attributes: ['dept_name'] },
//               { model: db.BuyingHouse, attributes: ['buying_house_name'] },
//           ],
//           },
//           {
//             model: db.vendor,
//             attributes: [
//               "vendor_series",
//               "vendor_name",
//               "phone_number",
//               "alternate_phone_number",
//               "email",
//               "contact_person",
//               "contact_person_phone",
//               "contact_person_email",
//               "tax_id",
//               "payment_terms_id",
//               "pan_num",
//               "tin_num",
//               "gst_num",
//               "vat_num",
//               "reference_by",
//               "vendor_type_id",
//               "vendor_status",
//               "registration_date",
//               "compliance_status",
//             ],
//           },
//           {
//             model: db.opo_items,
//             attributes: [
//               "opo_items_id",
//               "opo_id",
//               "rfq_id",
//               "vendor_id",
//               "item_id",
//               "item_code",
//               "item_name",
//               "item_type",
//               "line_total",
//               "no_packs",
//               "opr_qty",
//               "pack_size",
//               "pack_type",
//               "quote_qtd",
//               "rate",
//               [
//                 db.sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
//                 "pack_type_name",
//               ],
//             ],
//           },
//         ],
//       });
//       return res.status(200).json(result);
//     } else {
//       const result = await opo_master.findByPk(opo_master_id, {
//         where: {
//           status: { [Op.ne]: 0 },
//         },
//       });
//       return res.status(200).json(result);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// // Update a penalty term by ID
// const updateOpo = async (req, res, next) => {
//   const opo_master_id = req.query.opo_master_id;

//   try {
//     // Find the shipment mode by primary key
//     const PenaltyTerms = await opo_master.findByPk(opo_master_id);

//     // Update the shipment mode
//     const { penalty_terms_name, status } = req.body;
//     await PenaltyTerms.update({
//       penalty_terms_name,
//       status,
//     });

//     res.status(200).json({ message: "Updated Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete a penalty term by ID
// const deleteOpo = async (req, res, next) => {
//   const opo_master_id = req.query.opo_master_id;
//   try {
//     const result = await opo_master.update(
//       { status: 0 },
//       {
//         where: {
//           opo_master_id: opo_master_id,
//         },
//       }
//     );
//     return res.status(200).json({ message: "Deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

// OpoController = {
//   createOpo,
//   getOpo,
//   updateOpo,
//   deleteOpo,
// };

// module.exports = OpoController;

const db = require("../../models"); // Import the database models
const { opo_master, opo_items } = db; // Destructure models for easier access

const { Op } = require("sequelize"); // Import Sequelize operators
const { generateSeries } = require("../seriesGenerate"); // Import function to generate series numbers

// Create a new OPO (Order Processing Order)
const createOpo = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a database transaction

  try {
    const opo_series = await generateSeries("OPO"); // Generate a new OPO series number
    console.log(req.body); // Log the request body for debugging
    console.log(opo_series); // Log the generated OPO series

    // Destructure required fields from the request body
    const {
      quo_id,
      quo_num,
      total_cost,
      opr_id,
      opr_num,
      vendor_id,
      item_list,
      unit_justification,
      user_id,
      // opo_description,
      procurement_justification,
    } = req.body;
    if (unit_justification) {
      // Create a new OPO record in the opo_master table
      const result = await opo_master.create(
        {
          opo_num: opo_series, // Use the generated OPO series
          quo_id,
          quo_num,
          opr_id,
          opr_num,
          vendor_id,
          total_cost,
          unit_justification,
          // opo_description,
          procurement_justification,
          status: 1, // Active status
        },
        { transaction } // Pass the transaction to ensure atomicity
      );

      const LastInsertedId = result.opo_master_id; // Get the ID of the newly created OPO

      // Create related OPO items in a batch
      const opoItems = await Promise.all(
        item_list.map(async (items) => {
          const result2 = await opo_items.create(
            {
              opo_id: LastInsertedId, // Link the OPO item to the newly created OPO
              ...items, // Spread the item properties
              status: 1, // Active status
            },
            { transaction } // Pass the transaction
          );
          return result2; // Return the created item
        })
      );

      const result5 = await db.quotation_master.update(
        {
          status: 20,
        },
        {
          where: {
            quo_id: quo_id,
          },
        }
      );

      // Update the 'OprMaster' table
      await db.OprMaster.update(
        {
          status: 11, // Update the status to 10
        },
        {
          where: { opr_id }, // Find the row where opr_id matches
        },
        { transaction }
      );
    } else {
      // Update the 'quotation_master' table
      await db.quotation_master.update(
        {
          procurement_justification: procurement_justification, // Set procurement justification
          procurement_by: user_id, // Set user ID who performed the procurement
        },
        {
          where: { quo_id }, // Find the row where quo_id matches
        },
        { transaction }
      );

      // Update the 'OprMaster' table
      await db.OprMaster.update(
        {
          status: 10, // Update the status to 10
        },
        {
          where: { opr_id }, // Find the row where opr_id matches
        },
        { transaction }
      );
    }

    await transaction.commit(); // Commit the transaction
    return res.status(201).json({ message: "Submit Successfully" }); // Respond with success
  } catch (err) {
    await transaction.rollback(); // Rollback on error
    next(err); // Pass the error to the error handling middleware
  }
};

// Get OPO details or a list of OPOs
const getOpo = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id; // Get OPO ID from query parameters
  try {
    if (opo_master_id) {
      // If no specific OPO ID is provided, fetch all active OPOs
      const result = await opo_master.findAll({
        where: {
          opo_master_id: opo_master_id,
          status: {
            [Op.ne]: 0, // Exclude inactive OPOs
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
          "procurement_justification",
          "unit_justification",
          "opo_description",
        ],
        include: [
          {
            model: db.quotation_master, // Include related quotation details
            include: [
              {
                model: db.additional_cost,
                // attributes: ["charge_name", "charge_amount"],
              },
            ],
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
                db.sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
                "delivery_terms_name", // Alias for delivery term
              ],
            ],
          },
          {
            model: db.OprMaster, // Include related OPR details
            attributes: [
              "opr_id",
              "opr_num",
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
              {
                model: db.CompanyMaster,
                attributes: ["company_name", "company_id"],
              }, // Include company details
              { model: db.Vertical, attributes: ["vertical_name"] }, // Include vertical details
              { model: db.Division, attributes: ["division_name"] }, // Include division details
              { model: db.ShipMode, attributes: ["shipment_mode_name"] }, // Include shipment mode details
              { model: db.Department, attributes: ["dept_name"] }, // Include department details
              { model: db.BuyingHouse, attributes: ["buying_house_name"] }, // Include buying house details
            ],
          },
          {
            model: db.vendor, // Include vendor details
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
            model: db.opo_items, // Include related OPO items
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
                "pack_type_name", // Alias for package type
              ],
            ],
            include: [
              {
                model: db.ItemsMaster,
                attributes: {
                  exclude: ["item_img", "item_img_name"],
                },
              }, // Include ItemMaster details
            ],
          },
        ],
      });
      return res.status(200).json(result); // Respond with the list of OPOs
    } else {
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
          "procurement_justification",
          "unit_justification",
          "opo_description",
          "status",
        ],
        include: [
          {
            model: db.Pfi_master,
            include: [{ model: db.form_m }, { model: db.letter_of_credit }],
          },
          {
            model: db.quotation_master, // Include related quotation details
            include: [
              { model: db.rfq, include: { model: db.port_destination_master } },
              {
                model: db.additional_cost,
              },
            ],
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
                db.sequelize.literal(
                  "dbo.fn_GetDeliveryTerm(quotation_master.delivery_terms)"
                ),
                "delivery_terms_name", // Alias for delivery term
              ],
            ],
          },
          {
            model: db.OprMaster, // Include related OPR details
            attributes: [
              "opr_id",
              "opr_num",
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
              {
                model: db.CompanyMaster,
                attributes: ["company_name", "company_id"],
              }, // Include company details
              { model: db.Vertical, attributes: ["vertical_name"] }, // Include vertical details
              { model: db.Division, attributes: ["division_name"] }, // Include division details
              { model: db.ShipMode, attributes: ["shipment_mode_name"] }, // Include shipment mode details
              { model: db.Department, attributes: ["dept_name"] }, // Include department details
              { model: db.BuyingHouse, attributes: ["buying_house_name"] }, // Include buying house details
            ],
          },
          {
            model: db.vendor, // Include vendor details
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
            model: db.opo_items, // Include related OPO items
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
                "pack_type_name", // Alias for package type
              ],
            ],
            include: [
              {
                model: db.ItemsMaster,
                attributes: {
                  exclude: ["item_img", "item_img_name"],
                },
              }, // Include ItemMaster details
            ],
          },
        ],
      });
      return res.status(200).json(result); // Respond with the specific OPO
    }
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Get OPO details or a list of OPOs
const getOpoItemByOpoIds = async (req, res, next) => {
  const opo_ids = req.query.opo_ids; // Get OPO ID from query parameters
  const ids = opo_ids.includes(",") ? opo_ids.split(",") : opo_ids;
  console.log("ids", ids);
  try {
    const result = await db.opo_items.findAll({
      where: {
        opo_id: {
          [Op.in]: ids, // Use Op.in to specify multiple IDs
        },
        status: {
          [Op.ne]: 0, // Exclude inactive OPOs
        },
      },
    });
    return res.status(200).json(result); // Respond with the list of OPOs
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Update a penalty term by ID
const updateOpo = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id; // Get OPO ID from query parameters

  try {
    // Find the OPO by primary key
    const PenaltyTerms = await opo_master.findByPk(opo_master_id);

    // Update the OPO with new penalty terms
    const { penalty_terms_name, status } = req.body;
    await PenaltyTerms.update({
      penalty_terms_name,
      status,
    });

    res.status(200).json({ message: "Updated Successfully" }); // Respond with success
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Delete a penalty term by ID
const deleteOpo = async (req, res, next) => {
  const opo_master_id = req.query.opo_master_id; // Get OPO ID from query parameters
  try {
    const result = await opo_master.update(
      { status: 0 }, // Mark the OPO as inactive
      {
        where: {
          opo_master_id: opo_master_id, // Specify which OPO to update
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" }); // Respond with success
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Export the controller methods
const OpoController = {
  createOpo,
  getOpoItemByOpoIds,
  getOpo,
  updateOpo,
  deleteOpo,
};

module.exports = OpoController; // Export the controller for use in routes
