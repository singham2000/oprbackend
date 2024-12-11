const db = require("../../models");
const { Op } = require("sequelize");

const GetContainerAllocationByCiId = async (req, res, next) => {
  let ci_id = req.query.ci_id;
  try {
    let result = await db.container_allocation.findAll({
      where: { ci_id: ci_id, status: 1 },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetContainerByBL = async (req, res, next) => {
  let bl_num = req.query.bl_num;
  try {
    let result = await db.add_shippment_container.findAll({
      where: { bl_num: bl_num, status: 1 },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceControllerGet = {
  GetContainerByBL,
  GetContainerAllocationByCiId,
};

module.exports = CommercialInvoiceControllerGet;
