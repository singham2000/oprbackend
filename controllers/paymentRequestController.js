const { where } = require('sequelize');
const db = require('../models'); // Adjust the path to your models file
const { PaymentRequestMaster, PaymentTypeMaster, po_master, ServiceQUO } = db
const { generateSeries } = require("./seriesGenerate");



const updateDocumentStatus = async (doc_type, doc_id, res) => {
    try {
        switch (doc_type) {
            case 'po':
                const po = await po_master.findByPk(doc_id);
                if (!po) {
                    return res.status(404).json({ message: 'Po id is not valid' });
                }
                await po_master.update(
                    { status: 5 },
                    { where: { po_id: doc_id } }
                )
                break;
            case 'service_po':

                await ServiceQUO.update(
                    { status: 5 },
                    { where: { service_quo_id: doc_id } }
                )

                break;
            default:
                console.log("doct type is not give")
        }
    } catch (err) {
        console.error('Error updating document status:', err);
        throw err;
    }
};



// this function will genrate data in payment request table
// exports.createPaymentRequestMaster = async (req, res) => {
//     try {
//         const doc_code = 'PR';
//         const pr_series = await generateSeries(doc_code);
//         req.body.pr_num = pr_series;
//         const { pr_num, po_id, po_number, po_amount, advice_amount, advice_date, remarks, payment_type_id } = req.body;

//         // Ensure po_id is valid and update po_staus
//         const po = await po_master.findByPk(po_id);
//         if (!po) {
//             return res.status(404).json({ message: 'Po id is not valid' });
//         }

//         // Ensure payment_type_id is valid
//         const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
//         if (!paymentType) {
//             return res.status(404).json({ message: 'PaymentTypeMaster not found' });
//         }

//         const response = await PaymentRequestMaster.create({
//             po_id,
//             pr_num,
//             po_number,
//             po_amount,
//             advice_date,
//             advice_amount,
//             advice_remarks: remarks,
//             status: 2,
//             payment_type_id
//         });


//         //update po status
//         await po_master.update(
//             { status: 5 },
//             { where: { po_id: po_id } }
//         )

//         res.status(201).json(response);
//     } catch (error) {
//         console.error('Error creating PaymentRequestMaster:', error);
//         res.status(500).json({ error: 'An error occurred while creating the PaymentRequestMaster.' });
//     }
// };
exports.createPaymentRequestMaster = async (req, res) => {
    try {
        const doc_code = 'PR';
        const pr_series = await generateSeries(doc_code);
        req.body.pr_num = pr_series;
        // const { pr_num, po_id, po_number, po_amount, advice_amount, advice_date, remarks, payment_type_id } = req.body;
        const { pr_num, doc_id, doc_type, po_number, po_amount, advice_amount, advice_date, remarks, payment_type_id } = req.body;

        //update documents
        updateDocumentStatus(doc_type, doc_id, res);

        // Ensure payment_type_id is valid
        const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
        if (!paymentType) {
            return res.status(404).json({ message: 'PaymentTypeMaster not found' });
        }

        const response = await PaymentRequestMaster.create({
            po_id: doc_id,
            doc_type,
            pr_num,
            po_number,
            po_amount,
            advice_date,
            advice_amount,
            advice_remarks: remarks,
            status: 2,
            payment_type_id
        });

        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating PaymentRequestMaster:', error);
        res.status(500).json({ error: 'An error occurred while creating the PaymentRequestMaster.' });
    }
};
















// Get all PaymentRequestMaster records
exports.getAllPaymentRequestMasters = async (req, res) => {
    try {
        const paymentRequests = await PaymentRequestMaster.findAll({
            include: [{
                model: PaymentTypeMaster,
                as: 'paymentType'
            }]
        });
        res.status(200).json(paymentRequests);
    } catch (error) {
        console.error('Error fetching PaymentRequestMasters:', error);
        res.status(500).json({ error: 'An error occurred while fetching PaymentRequestMasters.' });
    }
};


// Get a PaymentRequestMaster by ID
exports.getPaymentRequestMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentRequest = await PaymentRequestMaster.findByPk(id, {
            include: [{
                model: PaymentTypeMaster,
                as: 'paymentType'
            }]
        });

        if (!paymentRequest) {
            return res.status(404).json({ message: 'PaymentRequestMaster not found' });
        }

        res.status(200).json(paymentRequest);
    } catch (error) {
        console.error('Error fetching PaymentRequestMaster:', error);
        res.status(500).json({ error: 'An error occurred while fetching the PaymentRequestMaster.' });
    }
};


// Update a PaymentRequestMaster by ID
exports.updatePaymentRequestMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const { po_id, po_number, po_amount, advice_date, advice_amount, advice_remarks, status, created_by, updated_by, payment_type_id } = req.body;

        const paymentRequest = await PaymentRequestMaster.findByPk(id);

        if (!paymentRequest) {
            return res.status(404).json({ message: 'PaymentRequestMaster not found' });
        }

        if (payment_type_id) {
            // Ensure payment_type_id is valid
            const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
            if (!paymentType) {
                return res.status(404).json({ message: 'PaymentTypeMaster not found' });
            }
        }

        await paymentRequest.update({
            po_id,
            po_number,
            po_amount,
            advice_date,
            advice_amount,
            advice_remarks,
            status,
            created_by,
            updated_by,
            payment_type_id
        });

        res.status(200).json(paymentRequest);
    } catch (error) {
        console.error('Error updating PaymentRequestMaster:', error);
        res.status(500).json({ error: 'An error occurred while updating the PaymentRequestMaster.' });
    }
};



// Delete a PaymentRequestMaster by ID
exports.deletePaymentRequestMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentRequest = await PaymentRequestMaster.findByPk(id);

        if (!paymentRequest) {
            return res.status(404).json({ message: 'PaymentRequestMaster not found' });
        }

        await paymentRequest.destroy();
        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting PaymentRequestMaster:', error);
        res.status(500).json({ error: 'An error occurred while deleting the PaymentRequestMaster.' });
    }
};


exports.rejectPaymentRequestByTreasury = async (req, res, next) => {

    try {
        const { request_id, remarks } = req.body

        //verify request id
        const paymentRequest = await PaymentRequestMaster.findByPk(request_id);
        if (!paymentRequest) {
            return res.status(404).json({ message: 'PaymentRequestMaster not found' });
        }

        //update PaymentRequest
        const response = await PaymentRequestMaster.update(
            { status: 4, remarks: remarks },
            { where: { payment_request_id: request_id } }
        )


        res.status(200).send();

    } catch (error) {
        // console.error('Error deleting PaymentRequestMaster:', error);
        // res.status(500).json({ error: 'An error occurred while deleting the PaymentRequestMaster.' });
        next(error);
    }
}

exports.PaymentRequestListForTreasury = async (req, res, next) => {
    try {
        const paymentRequests = await PaymentRequestMaster.findAll({
            include: [{
                model: PaymentTypeMaster,
                as: 'paymentType'
            }],
            where: {
                status: [2, 4, 3]
            }
        });
        res.status(200).json(paymentRequests);
    } catch (error) {
        next(error)
        // console.error('Error fetching PaymentRequestMasters:', error);
        // res.status(500).json({ error: 'An error occurred while fetching PaymentRequestMasters.' });
    }

}


// exports.confirmPaymentRequest = async (req, res, next) => {
//     let { payment_request_id } = req.body
//     console.log(payment_request_id);
//     try {
//         const paymentRequests = await PaymentRequestMaster.update(
//             { status: 3 },
//             {
//                 where: {
//                     payment_request_id: payment_request_id
//                 }
//             }

//         );
//         res.status(200).json(paymentRequests);
//     } catch (error) {
//         next(error)
//     }

// }

