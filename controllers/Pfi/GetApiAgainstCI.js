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

CommercialInvoiceControllerGet = {
  GetContainerAllocationByCiId,
};

module.exports = CommercialInvoiceControllerGet;
