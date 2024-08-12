// const { po_master } = ('../models');
const db = require("../models");

const { sequelize } = db
const { po_master, quotation_master, po_items } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");
const {generateSeries} = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require('./quotationItemsController')

const getPO = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    if (po_id) {
      const query = `SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id where po_id = ${po_id}`;

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json(result);
    }
    else {
      const query = `SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id;`;
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json(result);
    }
  } catch (error) {
    console.error('Error calling UDF:', error);
    throw error;
  }
};

// Controller method to delete by id
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

// Controller method to Create po with status 1
const genratePo = async (req, res, next) => {
  let { quo_id, quo_num, total_cost, rfq_id, opr_id, vendor_id, item_list } = req.body;

  try {
    const doc_code = 'PO';
    const po_series = await generateSeries(doc_code);
    const { quo_id, quo_num, total_cost, vendor_id, created_by } = req.body;

    //extrace some data form quo
    // "currency": "USD",
    // "delivery_terms": "FOB",
    // "payment_terms": "Abcd Payment terms",
    // "lead_time"

    const quodata =  await db.Rfq




    //genrate po
    const po_response = await po_master.create({
      po_num: po_series,
      vendor_id,
      quo_id,
      quo_num,
      opr_id,
      total_cost,
      status: 1,
      created_by,
      created_on: formattedDateTime,
    });

    //update quotation
    const result2 = await quotation_master.update(
      {
        po_status: 1,
      },
      {
        where: { quo_id },
      }
    );

    let po_id = po_response.dataValues.po_id;

    // insert items in po_items
    await item_list.forEach(element => {
      element.po_id = po_id, element.rfq_id = rfq_id
    });

    const response = await po_items.bulkCreate(item_list)
    res.status(201).json({ message: "Submit Successfully" });

  } catch (err) {
    next(err);
  }
};

//update po status after send mail to vendor
//po status will becom 2 when po sent to vendor
const po_email_conformation = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { po_id } = req.body;
    console.log(`po id :${po_id}`)

    const po_response = await po_master.update(
      { status: 2 }, // New values to update
      { where: { po_id: po_id } } // Condition to match records
    );
    next();
  } catch (err) {
    next(err);
  }
};


//po status will becom 3 when Vendor  accept po rejct= 4
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


// GET PO ITEMS
// const getPoItemsbypoid = async (req, res, next) => {
//   try {
//     const { po_id } = req.query;
//     const result = await po_items.findAll(
//       {
//         where: {
//           po_id: po_id,
//         },
//       }
//     );
//     res.status(201).json(result);
//   } catch (err) {
//     next(err);
//   }
// } // this will convert into getPodetails

const getPoItemsbypoid = async (req, res, next) => {
  try {
    const { po_id } = req.query;

    const result = await po_master.findAll(
      {
        include: [
          {
            model: db.VendorsMaster,
            // attributes: ['vendor_name', 'phone_number', 'email']
            attributes: ['vendor_id', 'vendor_series', 'vendor_name', 'phone_number', 'alternate_phone_number', 'email', 'contact_person', 'contact_person_phone', 'contact_person_email', 'tax_id', 'payment_terms_id', 'pan_num', 'tin_num', 'gst_num', 'vat_num', 'reference_by', 'vendor_type_id', 'vendor_status', 'registration_date', 'compliance_status', 'last_audited_docs_name'],
            include: [{
              model: db.VendorsAddressDetailsMaster,
              // attributes: ['item_name', 'item_code', 'uom_id'],
            }]
          },
          {
            model: db.po_items,
            attributes: ['po_item_id', 'po_qty', 'rate', 'remarks'],
            include: [{
              model: db.ItemsMaster,
              attributes: ['item_name', 'item_code', 'uom_id'],
            }]
          }
        ],
        where: {
          po_id: po_id,
        },
        attributes: ['po_id', 'po_num', 'status', 'created_on', 'currency', 'delivery_terms', 'payment_terms', 'lead_time']
      }
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

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


module.exports = { po_email_conformation, AcceptPO, getPO, deletePOById, genratePo, updatePOById, getPoItemsbypoid };
