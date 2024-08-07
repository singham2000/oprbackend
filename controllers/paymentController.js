// *****this controller controll all the paymene related things

const {
    PaymentTypeMaster,
    PaymentRequestMaster,
    PaymentRequestTransactionsMaster,
    PenaltyTermsMaster,
    payment_terms_quo
} = req.body;




//************************************************Payments Type Controller************************************************/
// Create a new payment type
exports.createPaymentType = async (req, res, next) => {
    try {
        const paymentType = await PaymentTypeMaster.create(req.body);
        res.status(201).json(paymentType);
    } catch (error) {
        next(error);
    }
};

// Get payment types (all or by ID)
exports.getPaymentTypes = async (req, res) => {
    try {
        const { id } = req.params;
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
        const paymentType = await PaymentTypeMaster.findByPk(req.params.id);
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
        const paymentType = await PaymentTypeMaster.findByPk(req.params.id);
        if (paymentType && !paymentType.deletedAt) {
            await paymentType.update(req.body);
            res.status(200).json(paymentType);
        } else {
            res.status(404).json({ message: 'Payment Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a payment type
exports.deletePaymentType = async (req, res) => {
    try {
        const paymentType = await PaymentTypeMaster.findByPk(req.params.id);
        if (paymentType && !paymentType.deletedAt) {
            await paymentType.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Payment Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};









// const PaymentTermsController = {
//     //payment type
//     getPaymentTypes :async(req,res,next){

//     },


//     getPaymentTerms: (req, res) => {
//         // Logic for fetching payment terms
//     },
//     createPaymentTerms: (req, res) => {
//         // Logic for creating payment terms
//     },
//     updatePaymentTermsById: (req, res) => {
//         // Logic for updating payment terms by ID
//     },
//     deletePaymentTermsById: (req, res) => {
//         // Logic for deleting payment terms by ID
//     },
//     getPenaltyTerms: (req, res) => {
//         // Logic for fetching penalty terms
//     },
//     createPenaltyTerms: (req, res) => {
//         // Logic for creating penalty terms
//     },
//     updatePenaltyTermsById: (req, res) => {
//         // Logic for updating penalty terms by ID
//     },
//     deletePenaltyTermsById: (req, res) => {
//         // Logic for deleting penalty terms by ID
//     },
//     getPaymentRequests: (req, res) => {
//         // Logic for fetching payment requests
//     },
//     createPaymentRequest: (req, res) => {
//         // Logic for creating a payment request
//     },
//     getPaymentTransactions: (req, res) => {
//         // Logic for fetching payment transactions
//     },
//     createPaymentTransaction: (req, res) => {
//         // Logic for creating a payment transaction
//     }
// };

// module.exports = PaymentTermsController;
