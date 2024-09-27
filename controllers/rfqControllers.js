const { where, Op } = require("sequelize");
const db = require("../models");
const {
  rfq: RfqMaster,
  RfqItemDetail,
  OprItems,
  VendorsMaster,
  sequelize,
  reqdocMaster
} = db;

const getPenaltyTermsNameById = require("../middleware/databyid/penaltyTermsName");
const { generateSeries } = require("./seriesGenerate");
const { Where } = require("sequelize/lib/utils");

// fucntion for count item
const countItem = async (rfq_id) => {
  let query = `
                SELECT COUNT(*) AS item_count
                FROM rfq_items
                WHERE rfq_id  = ${rfq_id}`;
  let [result, data] = await db.sequelize.query(query);
  const count = result[0].item_count;
  return count;
};

const countItem2 = async (rfq_id) => {
  let { sequelize } = db;
  let count = await RfqItemDetail.findAll({
    attributes: [[sequelize.fn("COUNT", sequelize.col("item_id")), "coutn"]],
    Where: { rfq_id: rfq_id },
  });
};


const getDocsRfqIds = async (docIdsString) => {
  try {
    // Split the book_ids string into an array
    const docIds = docIdsString ? docIdsString.split(',').map(Number) : [];
    // Fetch books based on the extracted IDs
    const books = await reqdocMaster.findAll({
      where: {
        req_doc_id: docIds,
      },
    });

    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Error fetching books');
  }
};


const getVendorsByRfqId = async (req, res, next) => {
  const rfqid = req.query.rfqid;

  try {
    const result1 = await RfqMaster.findAll({
      where: {
        rfq_id: rfqid,
      },
    });
    let vendors = result1[0].vendor_list;
    const vendor = vendors.split(",").map(Number);

    const result = await VendorsMaster.findAll({
      where: {
        vendor_id: vendor,
      },
      attributes: [
        "vendor_id",
        "vendor_series",
        "vendor_name",
        "phone_number",
        "email",
        "contact_person",
        "contact_person_phone",
        "contact_person_email",
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


const getAllRfq = async (req, res, next) => {
  try {
    const rfqs = await RfqMaster.findAll({
      attributes: { include: ['*', [sequelize.literal('dbo.fn_GetPortDestinationName(port_of_destination)'), 'port_of_destination_name'], 
        [sequelize.literal('dbo.GetNamesFromIds(vendor_list)'), 'vendors'], [sequelize.literal('dbo.GetMinDeliveryTimelineByRfqID(rfq_id)'), 'deliveryTime'] ]},
    });


    //this funcation will add no of item included in a rfq
    const trnsFormData = await Promise.all(
      rfqs.map(async (rfqs) => {
        countItem2();
        let count2 = await countItem(rfqs.dataValues.rfq_id);
        let doc_list = await getDocsRfqIds(rfqs.dataValues.penalty_terms_id)
        rfqs.dataValues.items_count = count2;
        rfqs.dataValues.req_doc_list = doc_list;
        return rfqs;
      })
    );
    res.status(200).json(trnsFormData);
  } catch (err) {
    next(err);
  }
};

// Controller method to fetch item by rfq_id
const getRfqById = async (req, res, next) => {
  try {
    const rfq_id = req.params.id;
    let items = await RfqItemDetail.findAll({
      where: {
        rfq_id
      }
    })
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }


};

// this is create rfq
// on rfq creation
// opr items stuatus will change to 3 and update rfq id

const createRfq = async (req, res, next) => {
 


  const transaction = await sequelize.transaction();
  try {
    const {
      req_doc_id,
      opr_item_ids,
      vendor_ids,
      remarks,
      port_of_destination,
      item_list,
      created_by,
      updated_by,
    } = req.body;
    const rfq_series = await generateSeries("RFQ");

    // Check if all necessary data is provided
    if (!opr_item_ids || !vendor_ids || !item_list) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create RFQ master record
    const rfqres = await RfqMaster.create({
      rfq_num: rfq_series,
      vendor_list: vendor_ids.join(","),
      req_doc_id: req_doc_id,
      remarks,
      port_of_destination,
      status: 1,
      created_by,
      updated_by,
    });

    const { rfq_id } = rfqres;
    // Update item list with RFQ ID and quantity
    item_list.forEach((element) => {
      element.rfq_id = rfq_id;
      element.status = 1;
    });

    // Bulk create RFQ item details
    const rfqitemres = await RfqItemDetail.bulkCreate(item_list);

    //here  opr_items update status 3 and insert rfq id in opr_line item
    await OprItems.update(

      { status: 3, rfq_id: rfq_id },

      {
        where: {
          opr_item_id: {
            [Op.in]: opr_item_ids,
          },
        },
      }
    );

    res.status(201).json({ message: "RFQ Generated Successfully" });
  } catch (err) {
    next(err);
  }
};



// Controller method to delete RFQ by id
const deleteRfqById = async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const item = await RfqMaster.findByPk(itemid);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await item.destroy(); // This will delete the item from the database

    res.status(200).json({ message: "Item successfully deleted" });
  } catch (err) {
    next(err);
  }
};

//get vendor detail by rfq id
const vendorListbyrfqid = async (req, res, next) => {
  try {
    let rfq_id = req.query.rfq_id;

    let rfqMasterRecord = await RfqMaster.findByPk(rfq_id, {
      attributes: ['vendor_list']
    });

    if (!rfqMasterRecord) {
      return res.status(404).json({ message: 'RFQ not found' });
    }

    // Extract the 'vendor_list' value and convert it to an array of numbers
    const vendorListString = rfqMasterRecord.dataValues.vendor_list;
    const vendorIds = vendorListString ? vendorListString.split(',').map(Number) : [];

    if (vendorIds.length === 0) {
      return res.status(200).json([]); // Return an empty array if no vendors are found
    }

    // Fetch vendors whose IDs are in the vendorIds array
    let vendors = await VendorsMaster.findAll({
      where: {
        vendor_id: {
          [Op.in]: vendorIds
        }
      },
      attributes: [
        'vendor_id',
        'vendor_series',
        'vendor_name',
        'phone_number',
        'email',
        'contact_person',
        'contact_person_phone',
        'contact_person_email'
      ]
    });

    res.status(200).json(vendors);

  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRfq,
  getRfqById,
  deleteRfqById,
  createRfq,
  getVendorsByRfqId,
  vendorListbyrfqid
};
