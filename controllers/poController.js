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
      ON po_master.quo_id = quotations_master.quo_id where po_id = ${po_id};`;

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
  let { quo_id, quo_num, total_cost, rfq_id, vendor_id } = req.body;



  try {
    const doc_code = 'PO';
    const po_series = await generateSeries(doc_code);
    const { quo_id, quo_num, total_cost, vendor_id, created_by } = req.body;

    //genrate po
    const po_response = await po_master.create({
      po_num: po_series,
      vendor_id,
      quo_id,
      quo_num, total_cost, vendor_id,
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

    // extract item from quo_items by quo_id
    let quo_items = await getQuotationItemByQuoId(quo_id);
    let po_id = po_response.dataValues.po_id;

    // insert po_id and rfq_id in in each quo_items
    await quo_items.forEach(element => {
      element.dataValues.po_id = po_id, element.dataValues.rfq_id = rfq_id
    });


    const extractedData = quo_items.map(item => item.dataValues);
    console.log("PO -itesm to be inserted")
    console.log(extractedData);

    const response = await po_items.bulkCreate(extractedData)

    res.status(201).json({ message: "Submit Successfully" });

  } catch (err) {
    next(err);
  }
};


//update po status after send mail to vendor
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

const AcceptPO = async (req, res, next) => {
  try {
    const { status, po_id, remarks } = req.body;
    let updated_by = '###'

    console.log(req.body);

    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: status ? 3 : 4,
        updated_by: updated_by,
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


module.exports = { po_email_conformation, AcceptPO, getPO, deletePOById, genratePo, updatePOById };
