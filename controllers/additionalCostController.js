//This controller for Additional Cost
// const { additional_cost } = ('../models');
const db = require("../models");
const { additional_cost } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");

// Controller method to Create AdditionalCost
const createAdditionalCost = async (req, res, next) => {
  try {
    const {
      quo_id,
      quo_num,
      invalid_charges,
      freight_charges,
      inspection_charges,
      thc,
      container_stuffing,
      container_seal,
      bl,
      vgm,
      miscellaneous,
      additional_charges,
      charges_by,
    } = req.body;
    const result = await additional_cost.create({
      quo_id,
      quo_num,
      inland_charges: invalid_charges,
      freight_charges,
      inspection_charges,
      thc,
      container_stuffing,
      container_seal,
      bl,
      vgm,
      miscellaneous,
      additional_cost: additional_charges,
      charges_by,
      status: 1,
      created_on: formattedDateTime,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to getAdditionalCost
const getAdditionalCost = async (req, res, next) => {
  const additional_cost_id = req.query.additional_cost_id;
  const quo_id = req.query.quo_id;
  try {
    if (additional_cost_id) {
      const result = await additional_cost.findAll({
        where: {
          additional_cost_id: additional_cost_id,
          status: { [Op.ne]: 0 },
        },
      });
      res.status(200).json(result);
    } else if (quo_id) {
      const result = await additional_cost.findAll({
        where: {
          quo_id: quo_id,
          status: { [Op.ne]: 0 },
        },
      });
      res.status(200).json(result);
    } else {
      const result = await additional_cost.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Controller method to update additinalCost by id
const updateAdditionalCostById = async (req, res, next) => {
  const additional_cost_id = req.query.additional_cost_id;
  try {
    const { delivery_timeline_name, updated_by } = req.body;
    const result = await additional_cost.update(
      {
        delivery_timeline_name,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          additional_cost_id: additional_cost_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteAdditionalCostById = async (req, res, next) => {
  const additional_cost_id = req.query.additional_cost_id;
  try {
    const result = await additional_cost.update(
      { status: 0 },
      {
        where: {
          additional_cost_id: additional_cost_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

additionalCostController = {
  getAdditionalCost,
  deleteAdditionalCostById,
  createAdditionalCost,
  updateAdditionalCostById,
};
module.exports = additionalCostController;
