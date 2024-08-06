// const { delivery_terms_quo } = ('../models');
const db = require('../models');
const { delivery_terms_quo } = db;

const formattedDateTime = require("../middleware/time");
const { Op } = require('sequelize');

// Controller method to fetch all items
const getDeliveryTerms = async (req, res, next) => {
    const delivery_terms_id = req.query.delivery_terms_id;
    try {
        if (!delivery_terms_id) {
            const result = await delivery_terms_quo.findAll({
                attributes: ['delivery_terms_id', 'delivery_terms_name'],
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        } else {
            const result = await delivery_terms_quo.findAll({
                where: {
                    delivery_terms_id: delivery_terms_id,
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};



// Controller method to delete by id
const deleteDeliveryTermsById = async (req, res, next) => {
    const delivery_terms_id = req.query.delivery_terms_id;
    try {
        const result = await delivery_terms_quo.update({ status: 0 }, {
            where: {
                delivery_terms_id: delivery_terms_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// Controller method to Create
const createDeliveryTerms = async (req, res, next) => {
    try {
        const {
            delivery_terms_name,
            created_by
        } = req.body;
        const result = await delivery_terms_quo.create({
            delivery_terms_name,
            status: 1,
            created_by,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

const updateDeliveryTermsById = async (req, res, next) => {
    const delivery_terms_id = req.query.delivery_terms_id;
    try {
        const {
            delivery_terms_name,
            updated_by
        } = req.body;
        const result = await delivery_terms_quo.update({
            delivery_terms_name,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                delivery_terms_id: delivery_terms_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

DeliveryTermsController = { getDeliveryTerms, deleteDeliveryTermsById, createDeliveryTerms, updateDeliveryTermsById };
module.exports = DeliveryTermsController;




