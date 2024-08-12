// Controller responsible for comparision approving and rejecting quotations *Rakesh*.
// const { quotation_master } = ('../models');
const db = require('../models');
const { quotation_master, po_master, quotation_items, QuoDoc, delivery_terms_quo, payment_terms_quo, lead_time_quo } = db;
const formattedDateTime = require("../middleware/time");
const { Op, where } = require('sequelize');
const {generateSeries} = require("./seriesGenerate");
const { sequelize, po_items } = require('../models/index')


const getQuotation = async (req, res, next) => {
  console.log("Quotation Item List")
  const quo_id = req.query.quo_id;
  try {
    if (quo_id) {
      // const query = ` SELECT * ,[dbo].[fn_additionalCost]([quo_id]) As additionalCost,
      //                 [dbo].[fn_vendorName]([vendor_id]) As vendorName,
      //                 [dbo].[fn_rfqNum]([rfq_id]) as rfq_num
      //                 FROM quotations_master
      //                 INNER JOIN payment_terms_master
      //                 ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
      //                 INNER JOIN delivery_terms_quo
      //                 ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
      //                 INNER JOIN lead_time_quo
      //                 ON quotations_master.lead_time = lead_time_quo.lead_time_id                      
      //                 where quo_id = ${quo_id}`;

      // const query = `SELECT [dbo].[fn_additionalCost]([quo_id]) As additionalCost,reference_no,reference_date,
      //                 vendors_master.vendor_name As vendorName,
      //                 vendors_master.email As vendor_email,
      //                 [dbo].[fn_vendorAddress](quotations_master.vendor_id) As vendor_address,
      //                 vendors_master.phone_number As vendor_phone_number,
      //                 [dbo].[fn_rfqNum]([rfq_id]) as rfq_num
      //                 FROM quotations_master
      //                 INNER JOIN payment_terms_master
      //                 ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
      //                 INNER JOIN delivery_terms_quo
      //                 ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
      //                 INNER JOIN lead_time_quo
      //                 ON quotations_master.lead_time = lead_time_quo.lead_time_id 
      //                 INNER JOIN vendors_master
      //                 ON vendors_master.vendor_id= quotations_master.vendor_id 
      //                 where quo_id = ${quo_id}
      //                 `
      // const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });


      // console.log(result);

      let quer2 =
        `select 
                dbo.fn_itemName(item_id) as item_name,
                item_description,opr_qty,rate
                from quotation_items
                where quo_id = ${quo_id}`

      let data = await sequelize.query(quer2, { type: sequelize.QueryTypes.SELECT });

      console.log(data);
      data.forEach(item => item.uom = 'KG')
      // result[0].item_list = data

      res.status(200).json(data);

    }
    else {
      const query = `SELECT * ,[dbo].[fn_additionalCost]([quo_id]) As additionalCost,
                      [dbo].[fn_vendorName]([vendor_id]) As vendorName,
                      [dbo].[fn_rfqNum]([rfq_id]) as rfq_num
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id`;
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json(result);
    }
  } catch (error) {
    next(error)
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
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

      // result.forEach(item => item.items = {
      //   await quotation_items.findall({
      //     where: { quo_id: item.quo_id }
      //   })
      // })

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id }
        });
      }
      res.status(200).json(result);
    }

    else {
      const query = `SELECT * 
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id`;

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id }
        });
      }

      res.status(200).json(result);
    }
  } catch (error) {
    next(error)
  }
}

// Controller method to delete by id
const deleteQuotationById = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const result = await quotation_master.update({ status: 0 }, {
      where: {
        quo_id: quo_id
      }
    });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err)
  }
};

// Controller method to Create
const createQuotation = async (req, res, next) => {
  const { quotation_details, quotation_docslist, created_by } = req.body

  try {

    const doc_code = 'QUO';
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
      ItemData
    } = quotation_details;

    //generate quotation
    const newQuotationMaster = await quotation_master.create({
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
      lead_time,
      payment_terms,
      remarks,
      total_cost,
      status: 1,
      created_by,
      created_on: formattedDateTime,
    });


    //transform quotation items
    const lastInsertedId = newQuotationMaster.quo_id;
    const updatedItemdata = ItemData.map(item => ({ ...item, quo_id: lastInsertedId, status: 1, rfq_id, vendor_id }))
    //insert quotation item
    await quotation_items.bulkCreate(updatedItemdata);

    //transform quotation docs
    await quotation_docslist.forEach((data, i) => {
      data.quotation_id = lastInsertedId;
      data.q_doc_filename = req.files[i].originalname;
      data.q_doc_file = req.files[i].buffer.toString("base64");
      i++;
    });

    // insert quotation documents
    await QuoDoc.bulkCreate(quotation_docslist);
    res.status(200).json({ message: "quotation genrated Suceesfully" });

  } catch (err) {
    console.log(err)
    next(err);
  }
}


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
      updated_by
    } = req.body;
    const result = await quotation_master.update({
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
      updated_on: formattedDateTime
    }, {
      where: {
        quo_id: quo_id
      }
    });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err)
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
  getQuotationbyrfqId
  // generatePo
};


module.exports = quotationController