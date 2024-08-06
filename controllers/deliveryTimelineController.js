// const { delivery_timeline_opr } = ('../models');
const db = require('../models');
const { DeliveryTimeline:delivery_timeline_opr } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require('sequelize');

// Controller method to fetch all items
const getDeliveryTimeline = async (req, res, next) => {
    const delivery_timeline_id = req.query.delivery_timeline_id;
    try {
        if (!delivery_timeline_id) {
            const result = await delivery_timeline_opr.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                attributes: ['delivery_timeline_id', 'delivery_timeline_name']
            });
            res.status(200).json(result);
        } else {
            const result = await delivery_timeline_opr.findAll({
                where: {
                    delivery_timeline_id: delivery_timeline_id,
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
const deleteDeliveryTimelineById = async (req, res, next) => {
    const delivery_timeline_id = req.query.delivery_timeline_id;
    try {
        const result = await delivery_timeline_opr.update({ status: 0 }, {
            where: {
                delivery_timeline_id: delivery_timeline_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// Controller method to Create
const createDeliveryTimeline = async (req, res, next) => {
    try {
        const {
            delivery_timeline_name,
            created_by
        } = req.body;
        const result = await delivery_timeline_opr.create({
            delivery_timeline_name,
            status: 1,
            created_by,
            created_on: formattedDateTime
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

const updateDeliveryTimelineById = async (req, res, next) => {
    const delivery_timeline_id = req.query.delivery_timeline_id;
    try {
        const {
            delivery_timeline_name,
            updated_by
        } = req.body;
        const result = await delivery_timeline_opr.update({
            delivery_timeline_name,
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                delivery_timeline_id: delivery_timeline_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

deliveryTimelineController = { getDeliveryTimeline, deleteDeliveryTimelineById, createDeliveryTimeline, updateDeliveryTimelineById };
module.exports = deliveryTimelineController;




