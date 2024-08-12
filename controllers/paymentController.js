const { PaymentTypeMaster, PaymentTerms } = require('../models')
const { Op } = require('sequelize')


//************************************************Payments Type Controller************************************************/
// Create a new payment type
exports.createPaymentType = async (req, res, next) => {
    try {
        const { payment_type_name } = req.body
        const paymentType = await PaymentTypeMaster.create(req.body);
        res.status(201).json({ message: 'payment terms created Sucessfully', data: paymentType });
    } catch (error) {
        next(error);
    }
};


// Get payment types (all or by ID)
exports.getPaymentTypes = async (req, res) => {
    try {
        const id = req.query.payment_type_id;
        const paymentTypes = id
            ? await PaymentTypeMaster.findByPk(id)
            : await PaymentTypeMaster.findAll({
                where: { status: { [Op.ne]: 0 } }
            });

        if (id && !paymentTypes) {
            return res.status(404).json({ message: 'Payment Type not found' });
        }
        res.status(200).json(paymentTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payment types fro drop down
exports.getPaymentTypesDropDown = async (req, res) => {
    try {
        const paymentTypes = await PaymentTypeMaster.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(paymentTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single payment type by ID
exports.getPaymentTypeById = async (req, res) => {
    try {
        const paymentType = await PaymentTypeMaster.findByPk(req.query.payment_type_id);
        if (paymentType && !paymentType.deletedAt) {
            res.status(200).json(paymentType);
        } else {
            res.status(404).json({ message: 'Payment Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a payment type
exports.updatePaymentType = async (req, res) => {
    try {
        const paymentType = await PaymentTypeMaster.findByPk(req.query.payment_type_id);
        await paymentType.update(req.body);
        res.status(200).json({ msg: 'Payment type updated Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a payment type
exports.deletePaymentType = async (req, res, next) => {
    try {
        const paymentType = await PaymentTypeMaster.findByPk(req.query.payment_type_id);
        if (paymentType && paymentType.status !== 0) {
            paymentType.status = 0;
            await paymentType.save();
            res.status(204).json();
        } else if (paymentType && paymentType.status === 0) {
            res.status(404).json({ message: 'Payment Type already deleted' });
        } else {
            res.status(404).json({ message: 'Payment Type not found' });
        }
    } catch (error) {
        next(error)
    }
};


//************************************************Payments terms Controller************************************************/


// Get all payment types fro drop down
exports.getAllPaymentTerms = async (req, res) => {
    try {
        console.log("hello payments terms")
        const paymentsTerms = await PaymentTerms.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        console.log(paymentsTerms)
        res.status(200).json(paymentsTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};