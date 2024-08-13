const db = require("../models");
const { status_master } = db;
const { Op } = require("sequelize");

// Create a new penalty term
const createStatus = async (req, res, next) => {
  try {
    const { module, table_name, field_name, value, description } = req.body;
    const result = await status_master.create({
      module,
      table_name,
      field_name,
      value,
      description,
      status: 1,
    });
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Get a single penalty term by ID
const getAllStatus = async (req, res, next) => {
  const status_id = req.query.status_id;
  try {
    if (!status_id) {
      const result = await status_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["status_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await status_master.findByPk(status_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateStatus = async (req, res, next) => {
  const status_id = req.query.status_id;

  try {
    // Find the shipment mode by primary key
    const StatusTerms = await status_master.findByPk(status_id);

    // Update the shipment mode
    const { module, table_name, field_name, value, description } = req.body;
    await StatusTerms.update({
      module,
      table_name,
      field_name,
      value,
      description,
    });

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteStatus = async (req, res, next) => {
  const status_id = req.query.status_id;
  try {
    const result = await status_master.update(
      { status: 0 },
      {
        where: {
          status_id: status_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStatus,
  getAllStatus,
  updateStatus,
  deleteStatus,
};
