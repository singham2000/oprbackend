const { PaymentTypeMaster, PaymentTerms, PenaltyTermsMaster } = require('../models')
const { Op } = require('sequelize')


//************************************************Payments Type Controller************************************************/
// Create a new payment type
exports.createPaymentType = async (req, res, next) => {
    try {
        const { payment_type_name, status } = req.body
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
        const paymentsTerms = await PaymentTerms.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(paymentsTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Create a new payment term
exports.createPaymentTerm = async (req, res, next) => {
    try {
        const { payment_terms_name, payment_type_id, penalty_terms_id, status, created_by, updated_by } = req.body;
        const paymentTerm = await PaymentTerms.create({
            payment_terms_name,
            payment_type_id,
            penalty_terms_id,
            status,
            created_by,
            updated_by
        });
        res.status(201).json({ message: 'Payment term created successfully', data: paymentTerm });
    } catch (error) {
        next(error);
    }
};

// Get payment terms (all or by ID)
exports.getPaymentTerms = async (req, res) => {
    try {
        const id = req.query.payment_terms_id;
        const paymentTerms = id
            ? await PaymentTerms.findByPk(id)
            : await PaymentTerms.findAll({
                where: { status: { [Op.ne]: 0 } }
            });

        if (id && !paymentTerms) {
            return res.status(404).json({ message: 'Payment Term not found' });
        }
        res.status(200).json(paymentTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payment terms for dropdown
exports.getPaymentTermsDropDown = async (req, res) => {
    try {
        const paymentTerms = await PaymentTerms.findAll({
            where: { status: { [Op.ne]: 0 } },
            attributes: ['payment_terms_id', 'payment_terms_name']
        });
        res.status(200).json(paymentTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single payment term by ID
exports.getPaymentTermById = async (req, res) => {
    try {
        const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
        if (paymentTerm && !paymentTerm.deletedAt) {
            res.status(200).json(paymentTerm);
        } else {
            res.status(404).json({ message: 'Payment Term not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a payment term
exports.updatePaymentTerm = async (req, res) => {
    try {
        const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
        if (paymentTerm) {
            await paymentTerm.update(req.body);
            res.status(200).json({ message: 'Payment term updated successfully' });
        } else {
            res.status(404).json({ message: 'Payment Term not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a payment term
exports.deletePaymentTerm = async (req, res, next) => {
    try {
        const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
        if (paymentTerm && paymentTerm.status !== 0) {
            paymentTerm.status = 0;
            await paymentTerm.save();
            res.status(204).json();
        } else if (paymentTerm && paymentTerm.status === 0) {
            res.status(404).json({ message: 'Payment Term already deleted' });
        } else {
            res.status(404).json({ message: 'Payment Term not found' });
        }
    } catch (error) {
        next(error);
    }
};


//************************************************Penalty terms  Controller************************************************/
// Create a new penalty term
exports.createPenaltyTerm = async (req, res, next) => {
    try {
        const { penalty_terms_name, created_by, updated_by, status } = req.body;
        const penaltyTerm = await PenaltyTermsMaster.create({
            penalty_terms_name,
            created_by,
            updated_by,
            status
        });
        res.status(201).json({ message: 'Penalty term created successfully', data: penaltyTerm });
    } catch (error) {
        next(error);
    }
};

// Get penalty terms (all or by ID)
exports.getPenaltyTerms = async (req, res) => {
    try {
        const id = req.query.penalty_terms_id;
        const penaltyTerms = id
            ? await PenaltyTermsMaster.findByPk(id)
            : await PenaltyTermsMaster.findAll({
                where: { status: { [Op.ne]: 0 } }
            });

        if (id && !penaltyTerms) {
            return res.status(404).json({ message: 'Penalty Term not found' });
        }
        res.status(200).json(penaltyTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all penalty terms for dropdown
exports.getPenaltyTermsDropDown = async (req, res) => {
    try {
        const penaltyTerms = await PenaltyTermsMaster.findAll({
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(penaltyTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single penalty term by ID
exports.getPenaltyTermById = async (req, res) => {
    try {
        const penaltyTerm = await PenaltyTermsMaster.findByPk(req.query.penalty_terms_id);
        if (penaltyTerm && !penaltyTerm.deletedAt) {
            res.status(200).json(penaltyTerm);
        } else {
            res.status(404).json({ message: 'Penalty Term not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a penalty term
exports.updatePenaltyTerm = async (req, res) => {
    try {
        const penaltyTerm = await PenaltyTermsMaster.findByPk(req.query.penalty_terms_id);
        if (penaltyTerm) {
            await penaltyTerm.update(req.body);
            res.status(200).json({ message: 'Penalty term updated successfully' });
        } else {
            res.status(404).json({ message: 'Penalty Term not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a penalty term
exports.deletePenaltyTerm = async (req, res, next) => {
    try {
        const penaltyTerm = await PenaltyTermsMaster.findByPk(req.query.penalty_terms_id);
        if (penaltyTerm && penaltyTerm.status !== 0) {
            penaltyTerm.status = 0;
            await penaltyTerm.save();
            res.status(204).json();
        } else if (penaltyTerm && penaltyTerm.status === 0) {
            res.status(404).json({ message: 'Penalty Term already deleted' });
        } else {
            res.status(404).json({ message: 'Penalty Term not found' });
        }
    } catch (error) {
        next(error);
    }
};



//************************************************PAYMENT REQUEST CONTOLLER************************************************/
