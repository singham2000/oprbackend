// Controller responsible for comparision approving and rejecting quotations *Rakesh*.
// const { quotation_master } = ('../models');
const db = require("../models");
const {
  quotation_master,
  OprItems,
  po_master,
  quotation_items,
  QuoDoc,
  delivery_terms_quo,
  payment_terms_quo,
  lead_time_quo,
  additional_cost,
} = db;
const getApprovalData = require("./GlobalFunction/GetApprovalData.js");

const formattedDateTime = require("../middleware/time");
const { generateSeries } = require("./seriesGenerate");
const { sequelize, po_items } = require("../models/index");
const { Op, where, col } = require("sequelize");

const getQuotation = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  const company_id = req.query.company_id;
  const opr_id = req.query.opr_id;
  const rfq_id = req.query.rfq_id;
  console.log(company_id, opr_id);
  try {
    if (quo_id) {
      let quo_details = await quotation_master.findAll({
        where: {
          quo_id: quo_id,
        },
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
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
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          {
            model: db.additional_cost,
            attributes: ["charge_name", "charge_amount"],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              "q_doc_file",
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    } else if (company_id && opr_id) {
      const oprItems = await OprItems.findAll({
        where: {
          company_id: company_id,
          opr_id: opr_id,
        },
        attributes: ["item_id"],
      });

      // Extract item_ids from the retrieved OprItems
      const item_ids = oprItems.map((item) => item.item_id);

      let opr_details = await OprItems.findAll({
        where: {
          company_id: company_id,
          opr_id: opr_id,
        },
        include: [
          {
            model: db.rfq,
            include: [
              {
                model: db.quotation_master,
                attributes: [
                  "quo_id",
                  "quo_num",
                  "rfq_id",
                  "vendor_id",
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
                  "approval_status",
                  "total_cost",
                  "po_status",
                  "opo_status",
                  "quote_doc",
                  "quote_doc_name",
                  "opr_lead_time",
                  "port_of_loading",
                  [
                    sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
                    "delivery_terms_name",
                  ],
                ],
                include: [
                  {
                    model: db.additional_cost,
                    attributes: ["charge_name", "charge_amount"],
                  },
                  {
                    model: db.vendor,
                    attributes: ["vendor_name", "vendor_series"],
                  },
                  {
                    model: db.quotation_items,
                    attributes: [
                      "quo_item_id",
                      "quo_id",
                      "item_id",
                      "item_type",
                      "line_total",
                      "opr_qty",
                      "quote_qtd",
                      "rate",
                      "remarks",
                      "item_name",
                      "no_packs",
                      "pack_size",
                      "pack_type",
                      "quo_num",
                      "item_code",
                      "rfq_item_id",
                      [
                        sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                        "pack_type_name",
                      ],
                    ],
                    where: {
                      item_id: item_ids, // Filter using the item_id directly
                    },
                  },
                  {
                    model: db.QuoDoc,
                    attributes: [
                      "q_doc_id",
                      "quotation_id",
                      "q_doc_name",
                      "q_doc_remarks",
                      "q_doc_filename",
                      // "q_doc_file",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(opr_details);
    } else if (rfq_id) {
      let quo_details = await quotation_master.findAll({
        where: {
          rfq_id: rfq_id,
        },
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
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
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          {
            model: db.additional_cost,
            attributes: ["charge_name", "charge_amount"],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              "q_doc_file",
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    } else {
      console.log("check");
      let quo_details = await quotation_master.findAll({
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
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
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          {
            model: db.additional_cost,
            attributes: ["charge_name", "charge_amount"],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              // "q_doc_file",
            ],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    }
  } catch (error) {
    next(error);
  }
};

// quotation by rfq it with items
const getQuotationbyrfqId = async (req, res, next) => {
  try {
    const rfq_id = req.query.rfq_id;
    if (rfq_id) {
      const query = `SELECT * 
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id where rfq_id = ${rfq_id};`;
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      // result.forEach(item => item.items = {
      //   await quotation_items.findall({
      //     where: { quo_id: item.quo_id }
      //   })
      // })

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id },
        });
      }
      res.status(200).json(result);
    } else {
      const query = `SELECT * 
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id`;

      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id },
        });
      }

      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const GetApprovalsByQuoId = async (req, res, next) => {
  const { quo_id, quo_num } = req.query;
  try {
    const result = await getApprovalData("QUO", quo_id, quo_num);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteQuotationById = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const result = await quotation_master.update(
      { status: 0 },
      {
        where: {
          quo_id: quo_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createQuotation = async (req, res, next) => {
  console.log(req.body.quotation_details.payment_milestone);
  // console.log(req.files);
  const { quotation_details, quotation_docslist } = req.body;

  const transaction = await sequelize.transaction(); // Start a transaction

  try {
    const doc_code = "QUO";
    const quotation_series = await generateSeries(doc_code);

    const {
      rfq_id,
      vendor_id,
      reference_no,
      reference_date,
      quo_date,
      currency,
      delivery_terms,
      country_origin,
      country_supply,
      port_loading,
      lead_time,
      payment_terms,
      remarks,
      total_cost,
      opr_lead_time,
      port_of_loading,
      charges,
      ItemData,
      payment_milestone,
    } = quotation_details;

    // Generate quotation
    const newQuotationMaster = await quotation_master.create(
      {
        quo_num: quotation_series,
        rfq_id,
        vendor_id,
        reference_no,
        reference_date,
        quo_date,
        currency,
        delivery_terms,
        country_origin,
        country_supply,
        port_loading,
        lead_time: `${lead_time} Weeks`,
        payment_terms,
        remarks,
        total_cost,
        opr_lead_time,
        port_of_loading,
        status: 1,
      },
      { transaction }
    );

    const lastInsertedId = newQuotationMaster.quo_id;

    // Process charges
    const processCharges = async () => {
      for (const key in charges) {
        // console.log("rfq and vendor", rfq_id, vendor_id);
        await additional_cost.create(
          {
            quo_id: lastInsertedId,
            quo_num: quotation_series,
            charge_name: key,
            charge_amount: charges[key],
            heading:
              key === "load_transportation" ||
              key === "special_packaging" ||
              key === "inspection_charges" ||
              key === "miscellaneous_inland"
                ? "Inland_Charges"
                : key === "bl" ||
                  key === "container_seal" ||
                  key === "container_stuffing" ||
                  key === "thc" ||
                  key === "vgm" ||
                  key === "miscellaneous"
                ? "FOB"
                : "Freight_Charges",
            status: 1,
          },
          { transaction }
        );
      }
    };

    await processCharges(); // Await the charge processing

    const promises = payment_milestone.map(async (i) => {
      await db.payment_milestone.create(
        {
          quo_id: lastInsertedId,
          quo_num: quotation_series,
          vendor_id: vendor_id,
          milestone: i.milestone,
          percentage: i.percentage_value,
          payment_status: 0,
          status: 1,
        },
        { transaction }
      );
    });

    await Promise.all(promises);

    // Prepare and insert quotation items
    const updatedItemdata = ItemData.map((item) => ({
      quo_id: lastInsertedId,
      quo_num: quotation_series,
      rfq_id: rfq_id,
      vendor_id: vendor_id,
      ...item,
      status: 1,
    }));

    await quotation_items.bulkCreate(updatedItemdata, { transaction });

    // console.log("quotation_docslist", quotation_docslist);
    // Transform and insert quotation documents
    const updatedQuotationDocs = quotation_docslist.map((data, index) => ({
      ...data,
      quotation_id: lastInsertedId,
      q_doc_filename: req.files[index]?.originalname,
      q_doc_file: req.files[index]?.buffer.toString("base64"),
    }));

    await QuoDoc.bulkCreate(updatedQuotationDocs, { transaction });

    await transaction.commit(); // Commit the transaction

    res.status(200).json({ message: "Quotation generated successfully" });
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction in case of error
    console.error("Error creating quotation:", err); // More specific logging
    next(err);
  }
};

const updateQuotationById = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const {
      rfq_id,
      vendor_id,
      reference_no,
      reference_date,
      quo_date,
      currency,
      delivery_terms,
      country_origin,
      country_supply,
      port_loading,
      lead_time,
      payment_terms,
      remarks,
      total_cost,
      updated_by,
    } = req.body;
    const result = await quotation_master.update(
      {
        rfq_id,
        vendor_id,
        reference_no,
        reference_date,
        quo_date,
        currency,
        delivery_terms,
        country_origin,
        country_supply,
        port_loading,
        lead_time,
        payment_terms,
        remarks,
        total_cost,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          quo_id: quo_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const getQuotationmilestone = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const result = await db.payment_milestone.findAll({
      where: {
        quo_id: quo_id,
        status: { [Op.eq]: 1 },
      },
      attributes: [
        "payment_milestone_id",
        "quo_num",
        "quo_id",
        "vendor_id",
        "milestone",
        "percentage",
        "payment_status",
      ],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

//this function will genrate po with status 2 after finalize quotation
// const generatePo = async (req, res, next) => {
//   const doc_code = 'PO';
//   const po_series = await generateSeries(doc_code);

//   try {
//     const { quo_id, quo_num, total_cost, vendor_id, created_by } = req.body;
//     const result = await po_master.create({
//       po_num: po_series,
//       quo_id,
//       quo_num,
//       total_cost,
//       vendor_id,
//       status: 2,
//       created_by,
//       created_on: formattedDateTime,
//     });

//     const result2 = await quotation_master.update(
//       {
//         po_status: 2,
//       },
//       {
//         where: { quo_id },
//       }
//     );

//     // // extract item from quo_items by quo_id
//     // let quo_items = getQuotationItemByQuoId(quo_id);
//     // console.log("****************************");
//     // console.log(quo_items);

//     // //inset item in po_items table
//     // const response = await po_items.create({
//     //   po_id: po_response.po_id,
//     //   quo_id,
//     // })

//     res.status(201).json({ message: "Submit Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

quotationController = {
  getQuotation,
  deleteQuotationById,
  createQuotation,
  updateQuotationById,
  getQuotationbyrfqId,
  GetApprovalsByQuoId,
  getQuotationmilestone,
  // generatePo
};

module.exports = quotationController;
