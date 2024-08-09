
const db = require('../models')
const { ShipMode: ShipmentMode } = db
const { Op } = require('sequelize');


// Create a new shipment mode
const createShipmentMode = async (req, res, next) => {
    const { shipMode_name, created_by, updated_by, status } = req.body;
    try {
        const newShipmentMode = await ShipmentMode.create({ shipMode_name, created_by, updated_by, status });
        res.status(201).json(newShipmentMode);
    } catch (err) {
        next(err);
    }
};

// Get a shipment mode by ID
const getAllShipmentModeDropdown = async (req, res, next) => {
    try {
            const result = await ShipmentMode.findAll({
                where: {
                    status: { [Op.eq]: 1 }
                },
                order: [['shipment_mode_name', 'ASC']],
                attributes: [ 'shipment_mode_id', 'shipment_mode_name'],
            });
           return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get all shipment modes
const getAllShipmentModes = async (req, res, next) => {
    const shipment_mode_id = req.query.shipment_mode_id;
    try {
        if (!shipment_mode_id) {
            const result = await ShipmentMode.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['shipment_mode_id', 'DESC']]
            });
           return res.status(200).json(result);
        } else {
            const result = await ShipmentMode.findByPk((shipment_mode_id),{
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            return res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

// Update a shipment mode
const updateShipmentMode = async (req, res, next) => {
    const { id } = req.params;
    const { shipMode_name, created_by, updated_by, status } = req.body;
    try {
        const [updated] = await ShipmentMode.update({ shipMode_name, created_by, updated_by, status }, {
            where: { mode_id: id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Shipment mode not found' });
        }
        const updatedShipmentMode = await ShipmentMode.findByPk(id);
        res.status(200).json(updatedShipmentMode);
    } catch (err) {
        next(err);
    }
};

// Delete a shipment mode
const deleteShipmentMode = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await ShipmentMode.destroy({
            where: { mode_id: id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Shipment mode not found' });
        }
        res.status(204).json({ message: 'Shipment mode deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createShipmentMode,
    getAllShipmentModeDropdown,
    getAllShipmentModes,
    updateShipmentMode,
    deleteShipmentMode
};
