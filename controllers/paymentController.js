const {
    PaymentTypeMaster,
    PaymentTerms,
    PenaltyTermsMaster,
    PaymentRequestMaster,
    po_master,
    PaymentRequestTransactionsMaster,
    Pfi_master,
    sequelize,
    Pfi_line_items,
    ServiceQUO,
    PaymentTermsMilesStones, payment_milestone
} = require('../models')

const { Op } = require('sequelize')
const { where } = require('sequelize');
const { generateSeries } = require("./seriesGenerate");
const pfi_master = require('../models/pfi_master');
const company_master = require('../models/Company/company_master');



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
        console.log(penaltyTerm);
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

// this function will genrate data in payment request table
exports.createPaymentRequestMaster = async (req, res, next) => {
    try {
        const doc_code = 'PR';
        const pr_series = await generateSeries(doc_code);
        req.body.pr_num = pr_series;
        const { pr_num, po_id, po_number, po_amount, advice_amount, advice_date, remarks, payment_type_id } = req.body;

        // Ensure po_id is valid and update po_staus
        const po = await po_master.findByPk(po_id);
        if (!po) {
            return res.status(404).json({ message: 'Po id is not valid' });
        }

        // Ensure payment_type_id is valid
        const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
        if (!paymentType) {
            return res.status(404).json({ message: 'PaymentTypeMaster not found' });
        }

        const response = await PaymentRequestMaster.create({
            po_id,
            payment_type_id,
            pr_num,
            po_number,
            po_amount,
            advice_date,
            advice_amount,
            advice_remarks: remarks,
            status: 1
        });


        //update po status
        await po_master.update(
            { status: 5 },
            { where: { po_id: po_id } }
        )

        res.status(201).json({ msg: 'Payment Request Genreted Successfully', data: response });

    } catch (error) {
        console.error('Error creating PaymentRequestMaster:', error);
        next(error)
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

exports.deletePaymentRequestMaster = async (req, res) => {
    try {
        const { payment_request_id } = req.params;
        const paymentRequest = await PaymentRequestMaster.findByPk(payment_request_id);

        if (!paymentRequest) {
            return res.status(404).json({ message: 'PaymentRequestMaster not found' });
        }

        // Perform soft delete by setting status to 0
        await paymentRequest.update({ status: 0 });

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



//************************************************PAYMENT TRANSACTION CONTOLLER************************************************/
//this funcation will insert data in transaction table and same time i will also insert data in pfi master without pfi number(series)
// exports.createPaymentTransactions = async (req, res, next) => {
//     try {
//         const { payment_request_id, po_id } = req.body;
//         console.log(req.body)

//         //update request status 
//         const paymentRequest = await PaymentRequestMaster.update(
//             { status: 3 },
//             { where: { payment_request_id: payment_request_id } }
//         );

//         //if id not found in master
//         if (!paymentRequest) {
//             return res.status(404).json({ message: 'Request id is not valid' });
//         }

//         //update po status
//         const poMaterResponse = await po_master.update(
//             { status: 6 },
//             { where: { po_id: po_id } }
//         );

//         //if id not found in master
//         if (!poMaterResponse) {
//             return res.status(404).json({ message: 'Po id is not valid' });
//         }

//         // handle image file
//         const fileBuffer = req.files[0].buffer;
//         const base64String = await fileBuffer.toString('base64');
//         req.body.receipt_image = base64String;
//         req.body.receipt_image_name = req.files[0].originalname;

//         // genrate transactions
//         const newTransaction = await PaymentRequestTransactionsMaster.create(req.body);

//         //query for pfi items
//         let query = `
//                     SELECT * 
//                     FROM po_items
//                     INNER JOIN opr_items
//                     ON opr_items.rfq_id = po_items.rfq_id
//                     AND opr_items.item_id = po_items.item_id
//                     WHERE po_items.po_id = ${po_id}
//                 `;
//         // Execute the query with replacements
//         let itemsforPfi = await sequelize.query(query, {
//             replacements: { po_id: po_id },
//             type: sequelize.QueryTypes.SELECT
//         });

//         console.log(itemsforPfi);

//         // genrate pfi
//         let pfi_data = {
//             status: 1,
//             po_id: po_id,
//             payment_request_id: payment_request_id,
//             created_by: req.body.created_by,
//             company_id: itemsforPfi[0].company_id
//         }
//         const pfi_response = await Pfi_master.create(pfi_data);
//         console.log(pfi_data);

//         // create pfi items
//         const extractData = (data) => {
//             return data.map(item => ({
//                 pfi_id: item.po_item_id,
//                 payment_request_id: null,
//                 rfq_id: item.rfq_id,
//                 company_id: item.company_id,
//                 item_id: item.item_id,
//                 item_description: item.item_description,
//                 po_qty: item.po_qty,
//                 rate: item.rate,
//                 created_by: item.created_by
//             }));
//         };

//         let pfi_lineitems = extractData(itemsforPfi);


//         await pfi_lineitems.forEach(item => { item.status = 1, item.pfi_id = pfi_response.pfi_id, item.po_id = po_id, item.payment_request_id = payment_request_id })
//         const pfi_line_item = await Pfi_line_items.bulkCreate(pfi_lineitems);
//         res.status(201).json(newTransaction);


//     } catch (error) {
//         next(error);
//     }
// };


const updateDocumentStatus = async (doc_type, doc_id, res, payment_request_id, req) => {
    try {
        console.log(doc_type, doc_id, res, payment_request_id, req)
        switch (doc_type) {
            case 'po':
                //update po status
                let po_id = doc_id
                const poMaterResponse = await po_master.update(
                    { status: 6 },
                    { where: { po_id: po_id } }
                );
                //if id not found in master
                if (!poMaterResponse) {
                    return res.status(404).json({ message: 'Doc id  is not valid' });
                }
                break;
            case 'f_po':
                //update po status
                {
                    let po_id = doc_id
                    const poMaterResponse = await po_master.update(
                        { status: 9 },
                        { where: { po_id: po_id } }
                    );
                }
                break;
            case 'service_po':
                // const service_response = await po_master.findByPk(doc_id);
                // if (!service_response) {
                //     return res.status(404).json({ message: 'Service Quo is not valid' });
                // }
                await ServiceQUO.update(
                    { status: 6 },
                    { where: { service_quo_id: doc_id } }
                )
                break;
            default:
                throw new Error('Invalid document type');
        }
    } catch (err) {
        console.error('Error updating document status:', err);
        throw err;
    }
};



exports.createPaymentTransactions = async (req, res, next) => {
       try {
        const { payment_request_id, doc_type, doc_id, payment_milestone_id } = req.body;
        updateDocumentStatus(doc_type, doc_id, res, payment_request_id, req);
        //update request status 
        const paymentRequest = await PaymentRequestMaster.update(
            { status: 3 },
            { where: { payment_request_id } }
        );

        const UpdateMilestone = await payment_milestone.update(
            { status: 5 },
            { where: { payment_milestone_id } }
        );
        //if id not found in master
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Request id is not valid' });
        }
        // handle image file
        const fileBuffer = req.files[0].buffer;
        const base64String = await fileBuffer.toString('base64');
        req.body.receipt_image = base64String;
        req.body.receipt_image_name = req.files[0].originalname;
        // genrate transactions
        const newTransaction = await PaymentRequestTransactionsMaster.create(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
};



const sentPaymentforApproval = async (req, res, next) => {
    const { doc_id, status } = req.body;
    try {
        const response = await PaymentRequestMaster.findByPk(doc_id);
        if (!response) {
            return res.status(404).json({ message: "Document not found" });
        } else {
            response.status = status;
            await response.save();
            res.status(200).json({ message: "Payment sent for approval successfully", data: response });
        }
    } catch (err) {
        next(err);
    }
}