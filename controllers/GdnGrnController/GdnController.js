const db = require("../../models");

const { GdnMaster, GdnItems } = db;

const createGdn = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    let { agency_code, agency_id, ref_doc, ref_doc_id, status, gdnitemsdata } =
      req.body;

    // Create the GDN master record
    const result = await GdnMaster.create({
      agency_code,
      agency_id,
      ref_doc,
      ref_doc_id,
      status,
    });

    // Get the last inserted GDN ID
    let lastInsertId = result.dataValues.gdn_id;

    // Prepare GDN items data by adding gdn_master_id
    const itemsWithGdnId = gdnitemsdata.map((item) => ({
      ...item,
      gdn_master_id: lastInsertId,
    }));
    console.log("itemsWithGdnId", itemsWithGdnId);

    // Bulk create the GDN items
    const itemResult = await GdnItems.bulkCreate(itemsWithGdnId);
    res.status(200).json({ msg: "GDN Created Successfully", data: result });
  } catch (error) {
    console.error("Error creating GDN:", error);
    next(error);
  }
};

const getAllGdn = async (req, res, next) => {
  try {
    let { gdn_id } = req.query;

    // Construct the where condition
    const whereCondition = gdn_id ? { gdn_id } : {};

    // Fetch GDN records based on the condition
    let foundGdn = await GdnMaster.findAll({
      where: whereCondition,
      include: {
        model: GdnItems,
      },
    });

    res.status(200).json({ message: "Success", data: foundGdn });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGdn, getAllGdn };
