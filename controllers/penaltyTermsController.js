/**
* Description: penalty terms show in rfq
* Developer: Rakesh
* Created Date: 17-07-2024
* Updated By:
* Last Updated:17-07-2024
*/


const db = require('../models');
const { PenaltyTermsMaster } = db;

// Create a new penalty term
const createPenaltyTerm = async (req, res, next) => {
    try {
        const { penalty_terms_name, created_by, updated_by, status } = req.body;

        const newTerm = await PenaltyTermsMaster.create({
            penalty_terms_name,
            created_by,
            updated_by,
            status
        });

        res.status(201).json(newTerm);
    } catch (error) {
        next(error);
    }
};

// Get all penalty terms
const getAllPenaltyTerms = async (req, res, next) => {
    try {
        const terms = await PenaltyTermsMaster.findAll();
        res.status(200).json(terms);
    } catch (error) {
        next(error);
    }
};

// Get a single penalty term by ID
const getPenaltyTermById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const term = await PenaltyTermsMaster.findByPk(id);

        if (!term) {
            return res.status(404).json({ message: 'Penalty term not found' });
        }

        res.status(200).json(term);
    } catch (error) {
        next(error);
    }
};

// Update a penalty term by ID
const updatePenaltyTerm = async (req, res, next) => {
    const { id } = req.params;
    const { penalty_terms_name, created_by, updated_by, status } = req.body;

    try {
        const [updated] = await PenaltyTermsMaster.update(
            { penalty_terms_name, created_by, updated_by, status },
            { where: { penalty_terms_id: id } }
        );

        if (updated) {
            const updatedTerm = await PenaltyTermsMaster.findByPk(id);
            res.status(200).json(updatedTerm);
        } else {
            res.status(404).json({ message: 'Penalty term not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a penalty term by ID
const deletePenaltyTerm = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await PenaltyTermsMaster.destroy({
            where: { penalty_terms_id: id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Penalty term not found' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPenaltyTerm,
    getAllPenaltyTerms,
    getPenaltyTermById,
    updatePenaltyTerm,
    deletePenaltyTerm
};
