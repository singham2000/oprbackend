const { PaymentTypeMaster } = require('../models'); // Adjust the path to your models file

// Create a new PaymentTypeMaster
exports.createPaymentTypeMaster = async (req, res) => {
    try {
        const { payment_type_name, created_by, updated_by } = req.body;

        const newPaymentType = await PaymentTypeMaster.create({
            payment_type_name,
            created_by,
            updated_by
        });

        res.status(201).json(newPaymentType);
    } catch (error) {
        console.error('Error creating PaymentTypeMaster:', error);
        res.status(500).json({ error: 'An error occurred while creating the PaymentTypeMaster.' });
    }
};



// Get all PaymentTypeMaster records
exports.getAllPaymentTypeMasters = async (req, res) => {
    try {
        const paymentTypes = await PaymentTypeMaster.findAll();
        res.status(200).json(paymentTypes);
    } catch (error) {
        console.error('Error fetching PaymentTypeMasters:', error);
        res.status(500).json({ error: 'An error occurred while fetching PaymentTypeMasters.' });
    }
};

// Get a PaymentTypeMaster by ID
exports.getPaymentTypeMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentType = await PaymentTypeMaster.findByPk(id);

        if (!paymentType) {
            return res.status(404).json({ message: 'PaymentTypeMaster not found' });
        }

        res.status(200).json(paymentType);
    } catch (error) {
        console.error('Error fetching PaymentTypeMaster:', error);
        res.status(500).json({ error: 'An error occurred while fetching the PaymentTypeMaster.' });
    }
};

// Update a PaymentTypeMaster by ID
exports.updatePaymentTypeMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_type_name, created_by, updated_by } = req.body;

        const paymentType = await PaymentTypeMaster.findByPk(id);

        if (!paymentType) {
            return res.status(404).json({ message: 'PaymentTypeMaster not found' });
        }

        await paymentType.update({
            payment_type_name,
            created_by,
            updated_by
        });

        res.status(200).json(paymentType);
    } catch (error) {
        console.error('Error updating PaymentTypeMaster:', error);
        res.status(500).json({ error: 'An error occurred while updating the PaymentTypeMaster.' });
    }
};

// Delete a PaymentTypeMaster by ID
exports.deletePaymentTypeMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentType = await PaymentTypeMaster.findByPk(id);

        if (!paymentType) {
            return res.status(404).json({ message: 'PaymentTypeMaster not found' });
        }

        await paymentType.destroy();
        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting PaymentTypeMaster:', error);
        res.status(500).json({ error: 'An error occurred while deleting the PaymentTypeMaster.' });
    }
};
