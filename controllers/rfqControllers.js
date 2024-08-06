const { where, Op } = require('sequelize');
const db = require('../models')
const { rfq: RfqMaster, RfqItemDetail, OprItems } = db
const getPenaltyTermsNameById = require('../middleware/databyid/penaltyTermsName');
const generateSeries = require("./seriesGenerate");
const { Where } = require('sequelize/lib/utils');


// fucntion for count item
const countItem = async (rfq_id) => {
    let query = `
                SELECT COUNT(*) AS item_count
                FROM rfq_items
                WHERE rfq_id  = ${rfq_id}`;
    let [result, data] = await db.sequelize.query(query);
    const count = result[0].item_count;
    return count;
}


const countItem2 = async (rfq_id) => {
    let { sequelize } = db;
    let count = await RfqItemDetail.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('item_id')), 'coutn']],
        Where: { rfq_id: rfq_id }
    });
    console.log(count.dataValues);
}



const getAllRfq = async (req, res, next) => {
    try {
        const items = await RfqMaster.findAll();
        // Map over items and fetch count for each rfq_id
        const updatedItems = await Promise.all(items.map(async (item) => {
            countItem2();
            let count2 = await countItem(item.dataValues.rfq_id);
            item.dataValues.items_count = count2;
            return item;
        }));
        res.status(200).json(updatedItems);
    } catch (err) {
        next(err);
    }
};


// Controller method to fetch item by id
const getRfqById = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await RfqMaster.findAll({
            where: { rfq_id: itemid }
        });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        let newitem = await getPenaltyTermsNameById(item)

        let items = await RfqItemDetail.findAll({
            where: { rfq_id: newitem[0].rfq_id }
        });
        newitem[0].dataValues.items = items;
        console.log(newitem)
        res.status(200).json(newitem);
    } catch (err) {
        next(err);

    }
};


const createRfq = async (req, res, next) => {
    try {
        const { penalty_terms_id, opr_item_ids, vendor_ids, item_list, created_by, updated_by } = req.body;
        const doc_code = 'RFQ';
        const rfq_series = await generateSeries(doc_code);

        // Check if all necessary data is provided
        if (!opr_item_ids || !vendor_ids || !item_list) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Create RFQ master record
        const rfqres = await RfqMaster.create({
            rfq_num: rfq_series || 'series not genratged',
            vendor_list: vendor_ids.join(','),
            penalty_terms_id: penalty_terms_id,
            created_by,
            updated_by
        });
        const { rfq_id } = rfqres;
        // Update item list with RFQ ID and quantity
        item_list.forEach(element => {
            element.rfq_id = rfq_id;
        });



        // Bulk create RFQ item details
        const rfqitemres = await RfqItemDetail.bulkCreate(item_list);
        // Update OPR items with new status and RFQ ID
        // const opritemres = await OprItems.upda(
        //     { status: 3, rfq_id: rfq_id },
        //     { where: { opr_item_id: opr_item_ids } }
        // );
        //update opr items
        // let opr_item_id_list = opr_item_ids.map(item => item.opr_item_id);
        // console.log(opr_item_id_list);

        await OprItems.update(
            { status: 3, rfq_id: rfq_id },

            {
                where: {
                    opr_item_id: {
                        [Op.in]: opr_item_ids
                    }
                }
            }
        );
        res.status(201).json({ message: "RFQ Generated Successfully" });
    } catch (err) {
        next(err);
    }
};




// Controller method to delete RFQ by id
const deleteRfqById = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await RfqMaster.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        await item.destroy(); // This will delete the item from the database

        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (err) {
        next(err);
    }
};




module.exports = {
    getAllRfq,
    getRfqById,
    deleteRfqById,
    createRfq
};


