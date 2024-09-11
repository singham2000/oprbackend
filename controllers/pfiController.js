const {
    ShippingMaster,
    assessment,
    Pfi_master,
    PaymentRequestMaster,
    po_master,
    sequelize,
    Pfi_line_items,
    item, db, insurance,
    form_m, letter_of_credit, son_pfi,
    ShippingMaster
} = require("../models");

const formattedDateTime = require("../middleware/time");
const { Op, where } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require('./quotationItemsController');



const getPfi = async (req, res, next) => {
    try {
        // Check if ID is provided in the request parameters
        const { pfi_id } = req.query;

        // If an ID is provided, fetch a single record by ID
        if (pfi_id) {
            const result = await Pfi_master.findOne({
                where: { pfi_id }, // Assuming 'id' is the primary key
                include: [
                    { model: insurance },
                    { model: form_m },
                    { model: letter_of_credit },
                    { model: son_pfi },
                    { model: assessment },
                    { model: ShippingMaster }
                ]
            });

            // If no record is found, send a 404 response
            if (!result) {
                return res.status(404).json({ message: 'Pfi_master not found' });
            }

            return res.status(200).json(result);
        }

        // If no ID is provided, fetch all records
        const results = await Pfi_master.findAll({
            include: [
                { model: insurance },
                { model: form_m },
                { model: letter_of_credit },
                { model: son_pfi },
                { model: assessment },
                { model: ShippingMaster }

            ]
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error calling UDF:', error);
        next(error); // Pass the error to the error-handling middleware
    }
};

// const getPfi = async (req, res, next) => {
//     try {
//         const result = await Pfi_master.findAll({
//             include: [
//                 { model: insurance },
//                 { model: form_m },
//                 { model: letter_of_credit },
//                 { model: son_pfi }
//             ]
//         })
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error calling UDF:', error);
//         throw error;
//     }
// };


const getPfibyPoid = async (req, res, next) => {
    let { po_id } = req.query
    try {
        const result = await Pfi_master.findAll({
            where: {
                po_id: po_id
            }
        })
        await result.forEach(item => item.dataValues.company_name = 'ABCD Company')
        res.status(200).json(result);
    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }

};

// Controller method to delete by id
const deletePfiyId = async (req, res, next) => {
    const { po_id, company_id } = req.query;
    try {
        const result = await po_master.update(
            { status: 0 },
            {
                where: {
                    po_id: po_id,
                },
            }
        );
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};
const getPfibyid = async (req, res, next) => {
    let { pfi_id, company_id } = req.query;
    try {
        let query =
            `select pfi_master.pfi_num,company_master.company_name from pfi_master
                inner join company_master
                on company_master.company_id = pfi_master.company_id
                where pfi_id = ${pfi_id}`

        let [result, metadata] = await sequelize.query(query)

        let pfi_items2 = await Pfi_line_items.findAll({
            where: {
                [Op.and]: [
                    { pfi_id }, { company_id }
                ]
            }
        })
        res.status(200).json({ pfi_details: result, item_list: pfi_items2 })

    } catch (err) {
        next(err);
    }

};
// Controller method to Create po with status 1
const genratePfi = async (req, res, next) => {
    let { payment_request_id, po_id, amount, company_id, remarks, pfi_id, pfi_items } = req.body;
    try {
        const doc_code = 'PFI';
        pfi_num = await generateSeries(doc_code);

        //genrate po
        const PFI_response = await Pfi_master.update(
            { pfi_num, status: 2, amount },
            {
                where: {
                    pfi_id: pfi_id
                }
            }
        );

        await pfi_items.forEach(item => {
            item.created_by = req.body.created_by;
            item.po_id = PFI_response.po_id;
            item.pfi_id = pfi_id;
            item.status = 1;
        });

        const response = await Pfi_line_items.bulkCreate(pfi_items)
        res.status(201).json({ message: "Pfi Submit Successfully" });
    } catch (err) {
        next(err);
    }
};
// get opr item company list by po no
const getcompanylistPoNumber = async (req, res, next) => {
    try {
        let { po_id } = req.query
        console.log('po_id', po_id)
        let query = `select  distinct  opr_items.company_id ,dbo.fn_companyname(opr_items.company_id)  as comp_name
            from opr_items            
			inner join po_items
			on opr_items.rfq_id =  po_items.rfq_id
			where  po_items.po_id=${po_id}`

        let [result, metadata] = await db.sequelize.query(query);
        await result.forEach((item, index) => item.status = index % 2 == 0 ? 1 : 0)

        res.status(200).json(result);

    } catch (err) {
        next(err)
    }
};

// Controller method to Create po with status 1
const genratePfi2 = async (req, res, next) => {
};

module.exports = { genratePfi, getPfi, genratePfi2, getPfibyPoid, getPfibyid };
