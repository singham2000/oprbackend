// const { po_master } = ('../models');
const db = require("../models");
const { sequelize, document: Document } = db;
const { po_master, opo_master, po_items } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");

//get all po
const getPO = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    if (po_id) {
      let result = await po_master.findAll({
        where: { po_id },
        include: [
          {
            model: db.po_items,
            include: [
              {model: db.ItemsMaster,
                attributes: {
                  include: [
                    [
                      sequelize.literal("dbo.fn_UomName(uom_id)"),
                      "uom"
                    ]
                  ]
                }
              }
            ],
            attributes: [
              "po_item_id",
              "po_id",
              "po_num",
              "opo_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "pack_size",
              "pack_type",
              "rate",
              "remarks",
              "address_id",
              "po_qty",
              "grn_qty",              
              [
                sequelize.literal("dbo.GetOpoNum(opo_id)"),
                "opo_num",
              ],
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
        ],
      });
      res.status(200).json(result);
    } else {
      let result = await po_master.findAll({
        include: [
          {
            model: db.po_items,
            include: [
              {model: db.ItemsMaster,
                attributes: {
                  include: [
                    [
                      sequelize.literal("dbo.fn_UomName(uom_id)"),
                      "uom"
                    ],
                  ],
                  exclude: ["item_img", "item_img_name"]
                }
              }
            ],
            attributes: [
              "po_item_id",
              "po_id",
              "po_num",
              "opo_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "pack_size",
              "pack_type",
              "rate",
              "remarks",
              "address_id",
              "po_qty",
              "grn_qty",              
              [
                sequelize.literal("dbo.GetOpoNum(opo_id)"),
                "opo_num",
              ],
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
        ],
      });
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

//get po for grn
const getPOforGrn = async (req, res, next) => {
  try {
    const query = `  SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id where  po_master.[status] > 8 and po_master.grn_status is  null`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// soft delte po by po id make status 0
const deletePOById = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    const result = await po_master.update(
      { status: 0 },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const generatePo = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a transaction
  try {console.log("Surya");
    console.log(req.body);
    const {
      opo_ids,
      opo_nums,
      total_cost,
      vendor_id,
      lead_time,
      payment_terms,
      delivery_terms,
      created_by,
      items_list,
    } = req.body;

    const doc_code = "PO";
    const po_series = await generateSeries(doc_code);

    const items2 = items_list.map((element) => ({
      line_total: Number(element.opr_qty) * Number(element.rate),
    }));

    function calculateTotalLineTotal(itemsList) {
      return itemsList.reduce((total, item) => {
        return total + item.line_total; // Accumulate the line total
      }, 0); // Start with 0
    }
    const totalAmount = calculateTotalLineTotal(items2)
    // Generate PO
    const po_response = await po_master.create(
      {
        po_num: po_series,
        vendor_id,
        opo_ids,
        opo_nums,
        total_cost: totalAmount,
        lead_time,
        payment_terms,
        delivery_terms,
        status: 1,
        created_by,
        created_on: new Date(), // Adjust date format if necessary
      },
      { transaction } // Pass the transaction
    );

    const arr = opo_ids.split(",").map(Number); // Convert to array of numbers

    console.log("before updating opo_master");
    await opo_master.update(
      {
        status: 2,
      },
      {
        where: {
          opo_master_id: {
            [Op.in]: arr, // Use the Op.in operator for the array of IDs
          },
        },
        transaction, // Pass the transaction
      }
    );

    let lastInserted = po_response.po_id;

    const items = items_list.map((element) => ({
      po_id: lastInserted,
      po_num: po_series,
      opo_id: element.opo_id,
      item_id: element.item_id,
      item_code: element.item_code,
      item_name: element.item_name,
      item_type: element.item_type,
      line_total: Number(element.opr_qty) * Number(element.rate),
      no_packs: Number(element.opr_qty) / Number(element.pack_size),
      pack_size: element.pack_size,
      pack_type: element.pack_type,
      rate: element.rate,
      status: 1,
      po_qty: element.opr_qty,
    }));

    console.log("Items to be inserted:", items);
    const response = await po_items.bulkCreate(items, { transaction }); // Pass the transaction

    await transaction.commit(); // Commit the transaction if all is well
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction on error
    next(err);
  }
};

const po_email_conformation = async (req, res, next) => {
  try {
    const { po_id } = req.body;
    const po_response = await po_master.update(
      { status: 2 },
      { where: { po_id: po_id } }
    );
    next();
  } catch (err) {
    next(err);
  }
};

const AcceptPO = async (req, res, next) => {
  try {
    const { status, po_id, remarks } = req.body;
    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: status ? 3 : 4,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const confimPoPaymentsbyVendor = async (req, res, next) => {
  try {
    const { status, po_id, remarks } = req.body;
    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: 7,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const confimPoFinalPaymentsbyVendor = async (req, res, next) => {
  try {
    const { status, po_id, final_doc_dispatch_no, disptach_date } = req.body;
    const result = await po_master.update(
      {
        final_doc_dispatch_no,
        disptach_date,
        status: 10,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const completePo = async (req, res, next) => {
  const { po_id, pocompletion_docslist, created_by } = req.body;

  try {
    //change po_master Status
    const result = await po_master.update(
      {
        status: 8,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    //transform quotation docs
    await pocompletion_docslist.map((data, i) => {
      data.linked_id = po_id;
      data.table_name = "PO";
      data.doc_name = req.files[i].originalname;
      data.doc_base64 = req.files[i].buffer.toString("base64");
      data.uploaded_by = created_by;
    });

    // insert quotation documents
    await Document.bulkCreate(pocompletion_docslist);
    res.status(200).json({ message: "Po completion update Suceesfully" });
  } catch (err) {
    next(err);
  }
};

const getPoItemsbypoid = async (req, res, next) => {
  try {
    const { po_id } = req.query;

    let FoundPoItems = await po_items.findAll({
      where: { po_id: po_id },
      include: [
        {
          // model: db.po_items,
          model: db.ItemsMaster,
          include: [
            {
              model: db.UomMaster,
              attributes: ["uom_name"],
            },
          ],
          // attributes: [
          //   "item_name",
          //   "item_type",
          //   "item_code",
          //   "quantity_in_stock",
          //   "quantity_on_order",
          //   "nafdac_category",
          // ],
        },
      ],
    });
    res.status(201).json(FoundPoItems);
  } catch (error) {
    next(error);
  }
};
const updatePOById = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    const { delivery_timeline_name, updated_by } = req.body;
    const result = await po_master.update(
      {
        delivery_timeline_name,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const getVendorDeailsByPoId = async (req, res, next) => {
  try {
    const { po_id } = req.query;
    let foudnVendor = await po_master.findAll({
      where: { po_id: po_id },
      include: [
        {
          model: db.VendorsMaster,
          include: [
            {
              model: db.VendorsAddressDetailsMaster,
            },
          ],
        },
      ],
    });
    res.status(201).json(foudnVendor);
  } catch (error) {
    next(error);
  }
};

const poStatusController = async (req, res, next) => {
  let { po_id, action } = req.body;
  try {
    let foundPo = await po_master.findByPk(po_id);
    if (!foundPo) {
      res.status(404).json({ message: "Document not found" });
    } else {
      switch (action) {
        case "approve":
          foundPo.status = 1;
          await foundPo.save();
          break;
        case "reject":
          foundPo.status = 1;
          await foundPo.save();
          break;
        case "archive":
          foundPo.status = 1;
          await foundPo.save();
          break;
        default:
          return res.status(400).json({ message: "Invalid action" });
      }
      // Common response
      res.status(200).json({ message: "Action processed successfully" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  poStatusController,
  confimPoFinalPaymentsbyVendor,
  completePo,
  confimPoPaymentsbyVendor,
  getVendorDeailsByPoId,
  getPOforGrn,
  po_email_conformation,
  AcceptPO,
  getPO,
  deletePOById,
  generatePo,
  updatePOById,
  getPoItemsbypoid,
};
