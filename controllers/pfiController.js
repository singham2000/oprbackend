const { Pfi_master, PaymentRequestMaster, po_master, sequelize, Pfi_line_items, item } = require("../models");
const formattedDateTime = require("../middleware/time");
const { Op, where } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require('./quotationItemsController');

// const { pfi_line_item } = require("../models/pfi_line_item");

// const getPfi = async (req, res, next) => {
//     const po_id = req.query.po_id;
//     try {
//         if (po_id) {
//             const query = `SELECT po_master.*
//       FROM po_master
//       INNER JOIN quotations_master
//       ON po_master.quo_id = quotations_master.quo_id where po_id = ${po_id};`;
//             const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
//             res.status(200).json(result);
//         }
//         else {
//             const query = `SELECT po_master.*
//       FROM po_master
//       INNER JOIN quotations_master
//       ON po_master.quo_id = quotations_master.quo_id;`;
//             const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
//             res.status(200).json(result);
//         }
//     } catch (error) {
//         console.error('Error calling UDF:', error);
//         throw error;
//     }

// };


const getPfi = async (req, res, next) => {
    try {
        const result = await Pfi_master.findAll()
        res.status(200).json(result);
    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
};


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
    console.log(po_id, company_id)
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


        console.log("*****");
        console.log(pfi_items2);
        res.status(200).json({ pfi_details: result, item_list: pfi_items2 })

    } catch (err) {
        next(err);
    }

}


// Controller method to Create po with status 1
const genratePfi = async (req, res, next) => {
    console.log("**************Pfi body**************")
    console.log(req.body);
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

        console.log("**************Pfi Response**************")
        console.log(PFI_response);
        console.log(pfi_items);

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
        // let query = `
        //     select * from opr_items
        //     where rfq_id in 
        //     ( select quotations_master.rfq_id as rfq_id from po_master
        //     inner join quotations_master
        //     on quotations_master.quo_id = po_master.quo_id  where po_master.po_id=${po_id})`
        // let [result, metadata] = await db.sequelize.query(query);

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
}


// Controller method to Create po with status 1
const genratePfi2 = async (req, res, next) => {
};

//update po status after send mail to vendor
// const po_email_conformation = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     const { po_id } = req.body;
//     console.log(`po id :${po_id}`)
//     const po_response = await po_master.update(
//       { status: 2 }, // New values to update
//       { where: { po_id: po_id } } // Condition to match records
//     );
//     next();
//   } catch (err) {
//     next(err);
//   }
// };



// const updatePOById = async (req, res, next) => {
//     const po_id = req.query.po_id;
//     try {
//         const { delivery_timeline_name, updated_by } = req.body;
//         const result = await po_master.update(
//             {
//                 delivery_timeline_name,
//                 updated_by,
//                 updated_on: formattedDateTime,
//             },
//             {
//                 where: {
//                     po_id: po_id,
//                 },
//             }
//         );
//         res.status(201).json({ message: "Updated Successfully" });
//     } catch (err) {
//         next(err);
//     }
// };

// const AcceptPO = async (req, res, next) => {
//     try {
//         const { status, po_id, remarks } = req.body;
//         let updated_by = '###'
//         console.log(req.body);
//         const result = await po_master.update(
//             {
//                 acceptance_remarks: remarks,
//                 status: status ? 3 : 4,
//                 updated_by: updated_by,
//                 updated_on: formattedDateTime,
//             },
//             {
//                 where: {
//                     po_id: po_id,
//                 },
//             }
//         );
//         res.status(201).json({ message: "Updated Successfully" });
//     } catch (err) {
//         next(err);
//     }
// };

// module.exports = { genratePfi, po_email_conformation, AcceptPO, getPO, deletePOById, genratePo, updatePOById };

module.exports = { genratePfi, getPfi, genratePfi2, getPfibyPoid, getPfibyid };
