// const { po_master } = ('../models');
const db = require("../models");
const { sequelize, document: Document } = db
const { po_master, quotation_master, po_items } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require('./quotationItemsController')

//get all po
const getPO = async (req, res, next) => {
  const po_id = req.query.po_id;
  console.log(req.query);
  try {
    if (po_id) {
      const query = `SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id where po_id = ${po_id}`;

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      // const result2 = await po_master.findAll({
      //   where: { po_id },
      //   include: [
      //     {
      //       model: db.VendorsMaster,
      //       attributes: ['vendor_name']
      //     },
      //     {
      //       model: db.po_items
      //     },
      //     {
      //       model: db.form_m
      //     }
      //   ]
      // })
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

//get po for grn
const getPOforGrn = async (req, res, next) => {
  try {
    const query = `  SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id where  po_master.[status] > 8 and po_master.grn_status is  null`;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(result);
  } catch (error) {
    next(error)
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

//This method will run when quotation gets confirm of final
//On this event po generate with status 1 and quota status update
//and po items also genrated and insert into po_item table 

const generatePo = async (req, res, next) => {
  try {
    const { quo_id, quo_num, total_cost, rfq_id, opr_id, vendor_id, item_list, created_by } = req.body;
    // Validate input
    if (!quo_id || !quo_num || !total_cost || !rfq_id || !opr_id || !vendor_id || !item_list || !created_by) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    //generate series
    const doc_code = 'PO';
    const po_series = await generateSeries(doc_code);

    //genrate po
    const po_response = await po_master.create({
      po_num: po_series,
      vendor_id,
      quo_id,
      opr_id,
      quo_num,
      total_cost,
      status: 1,
      created_by,
      created_on: formattedDateTime,
    });

    //update quotation po status 1
    await quotation_master.update(
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
//po status will become 2 when po sent to vendor
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
  const { po_id, pocompletion_docslist, created_by } = req.body

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
      data.table_name = 'PO';
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
}

const getPoItemsbypoid = async (req, res, next) => {
  try {
    const { po_id } = req.query;


    let FoundPoItems = await po_items.findAll({
      where: { po_id: po_id },
      include: [
        {
          model: db.ItemsMaster,
          include: [
            {
              model: db.UomMaster,
              attributes: ['uom_name']
            }
          ],
          attributes: ['item_name', 'item_type', 'item_code', 'quantity_in_stock', 'quantity_on_order', 'nafdac_category',]
        }
      ],
    });
    res.status(201).json(FoundPoItems)

  } catch (error) {
    next(error)
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
            }
          ],

        }
      ],
    });
    res.status(201).json(foudnVendor)

  } catch (error) {
    next(error)
  }
}


module.exports = { confimPoFinalPaymentsbyVendor, completePo, confimPoPaymentsbyVendor, getVendorDeailsByPoId, getPOforGrn, po_email_conformation, AcceptPO, getPO, deletePOById, generatePo, updatePOById, getPoItemsbypoid };