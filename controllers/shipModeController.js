
const db = require('../models')
const { ShipMode: ShipmentMode } = db

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
const getShipmentModeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const shipmentMode = await ShipmentMode.findByPk(id);
        if (!shipmentMode) {
            return res.status(404).json({ error: 'Shipment mode not found' });
        }
        res.status(200).json(shipmentMode);
    } catch (err) {
        next(err);
    }
};

// Get all shipment modes
const getAllShipmentModes = async (req, res, next) => {
    try {
        const shipmentModes = await ShipmentMode.findAll({ attributes: ['shipment_mode_id', 'shipment_mode_name'] });
        res.status(200).json(shipmentModes);
    } catch (err) {
        next(err);
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
    getShipmentModeById,
    getAllShipmentModes,
    updateShipmentMode,
    deleteShipmentMode
};
