// designation_masterController.js

const db = require('../models');

const { desigMaster: DesignationMaster } = db
// Create a new designation
exports.createDesignation = async (req, res, next) => {
    try {
        const { designation_name, status, created_by } = req.body;
        const newDesignation = await DesignationMaster.create({
            designation_name,
            status,
            created_by
        });
        res.status(201).json(newDesignation);
    } catch (err) {
        next(err);
    }
};

// Get all designations
exports.getAllDesignations = async (req, res, next) => {
    try {
        const designations = await DesignationMaster.findAll({
            attributes: ['designation_id', 'designation_name']
        });
        res.json(designations);
    } catch (err) {
        next(err);
    }
};

// Get a designation by ID
exports.getDesignationById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const designation = await DesignationMaster.findByPk(id);
        if (!designation) {
            res.status(404).json({ error: 'Designation not found' });
        } else {
            res.json(designation);
        }
    } catch (err) {
        next(err);
    }
};

// Update a designation by ID
exports.updateDesignationById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [updated] = await DesignationMaster.update(req.body, {
            where: { designation_id: id }
        });
        if (updated) {
            const updatedDesignation = await DesignationMaster.findByPk(id);
            res.json(updatedDesignation);
        } else {
            res.status(404).json({ error: 'Designation not found' });
        }
    } catch (err) {
        next(err);
    }
};

// Delete a designation by ID
exports.deleteDesignationById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await DesignationMaster.destroy({
            where: { designation_id: id }
        });
        if (deleted) {
            res.json({ message: 'Designation deleted successfully' });
        } else {
            res.status(404).json({ error: 'Designation not found' });
        }
    } catch (err) {
        next(err);
    }
};
