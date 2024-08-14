// // const { payment_terms_quo } = ('../models');
// const db = require('../models');
// const { payment_terms_quo } = db;
// const { Op } = require('sequelize');

// // Controller method to fetch all items
// const getPaymentTerms = async (req, res, next) => {
//     const payment_terms_id = req.query.payment_terms_id;
//     try {
//         if (!payment_terms_id) {
//             const result = await payment_terms_quo.findAll({
//                 attributes: ['payment_terms_id', 'payment_terms_name'],
//                 where: {
//                     status: { [Op.ne]: 0 }
//                 }
//             });
//             res.status(200).json(result);
//         } else {
//             const result = await payment_terms_quo.findAll({
//                 where: {
//                     payment_terms_id: payment_terms_id,
//                     status: { [Op.ne]: 0 }
//                 }
//             });
//             res.status(200).json(result);
//         }

//     } catch (err) {
//         next(err)
//     }
// };

// // Controller method to delete by id
// const deletePaymentTermsById = async (req, res, next) => {
//     const payment_terms_id = req.query.payment_terms_id;
//     try {
//         const result = await payment_terms_quo.update({ status: 0 }, {
//             where: {
//                 payment_terms_id: payment_terms_id
//             }
//         });
//         res.status(200).json({ message: 'Deleted successfully' });
//     } catch (err) {
//         next(err)
//     }
// };


// // Controller method to Create
// const createPaymentTerms = async (req, res, next) => {
//     try {
//         const {
//             payment_terms_name,
//             created_by
//         } = req.body;
//         const result = await payment_terms_quo.create({
//             payment_terms_name,
//             status: 1,
//             created_by,
//             created_on: formattedDateTime
//         });
//         res.status(201).json({ message: "Submit Successfully" });
//     } catch (err) {
//         next(err)
//     }
// };

// const updatePaymentTermsById = async (req, res, next) => {
//     const payment_terms_id = req.query.payment_terms_id;
//     try {
//         const {
//             payment_terms_name,
//             updated_by
//         } = req.body;
//         const result = await payment_terms_quo.update({
//             payment_terms_name,
//             updated_by,
//             updated_on: formattedDateTime
//         }, {
//             where: {
//                 payment_terms_id: payment_terms_id
//             }
//         });
//         res.status(201).json({ message: "Updated Successfully" });
//     } catch (err) {
//         next(err)
//     }
// };

// PaymentTermsController = { getPaymentTerms, deletePaymentTermsById, createPaymentTerms, updatePaymentTermsById };

// module.exports = PaymentTermsController;




const db = require('../models');
const { PenaltyTermsMaster: payment_terms_quo } = db;
const { Op } = require('sequelize');

// Controller method to fetch all payment terms or a specific one
exports.getPaymentTerms = async (req, res, next) => {
    const payment_terms_id = req.query.payment_terms_id;
    try {
        const condition = {
            status: { [Op.ne]: 0 }
        };

        if (payment_terms_id) {
            condition.payment_terms_id = payment_terms_id;
        }

        const result = await payment_terms_quo.findAll({
            attributes: ['payment_terms_id', 'payment_terms_name'],
            where: condition
        });

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Controller method to soft delete payment terms by ID
exports.deletePaymentTermsById = async (req, res, next) => {
    const payment_terms_id = req.query.payment_terms_id;
    try {
        const paymentTerm = await payment_terms_quo.findByPk(payment_terms_id);
        if (!paymentTerm) {
            return res.status(404).json({ message: 'Payment term not found' });
        }
        await paymentTerm.update({ status: 0 });
        res.status(200).json({ message: 'Payment term deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// Controller method to create a new payment term
exports.createPaymentTerms = async (req, res, next) => {
    try {
        const { payment_terms_name, created_by, status } = req.body;

        const result = await payment_terms_quo.create({
            payment_terms_name,
            status,
            created_by
        });

        res.status(201).json({ message: "Payment term created successfully", data: result });
    } catch (err) {
        next(err);
    }
};

// Controller method to update a payment term by ID
exports.updatePaymentTermsById = async (req, res, next) => {
    const payment_terms_id = req.query.payment_terms_id;
    try {
        const { payment_terms_name, updated_by } = req.body;

        const paymentTerm = await payment_terms_quo.findByPk(payment_terms_id);

        if (!paymentTerm) {
            return res.status(404).json({ message: 'Payment term not found' });
        }

        await paymentTerm.update({
            payment_terms_name,
            updated_by,
            updated_on: formattedDateTime
        });

        res.status(200).json({ message: "Payment term updated successfully", data: paymentTerm });
    } catch (err) {
        next(err);
    }
};
