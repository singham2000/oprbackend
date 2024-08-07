// const db = require('../models');
// const { RfqItemDetail } = db



// // Controller method to fetch all items
// const getAllRfqItem = async (req, res, next) => {
//     try {
//         const items = await RfqItemDetail.findAll();
//         res.status(200).json(items);

//     } catch (err) {
//         // console.error('Error fetching items:', err);
//         // res.status(500).json({ error: 'Error fetching items' });
//         next(err);
//     }
// };


// // Controller method to fetch item by id
// const getRfqItemById = async (req, res, next) => {
//     const itemid = req.params.id;
//     try {
//         const item = await RfqItemDetail.findByPk(itemid);

//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         res.status(200).json(item);
//     } catch (err) {
//         // console.error(`Error fetching item with id ${itemid}:`, err);
//         // res.status(500).json({ error: 'Error fetching item' });
//         next(err);
//     }
// };


// // Controller method to delete item by id
// const deleteRfqItemById = async (req, res, next) => {
//     const itemid = req.params.id;
//     try {
//         const item = await RfqItemDetail.findByPk(itemid);

//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         await item.destroy();
//         res.status(200).json({ message: 'Item deleted successfully' });
//     } catch (err) {
//         // console.error(`Error deleting item with id ${itemid}:`, err);
//         // res.status(500).json({ error: 'Error deleting item' });
//         next(err);
//     }
// };





// module.exports = {
//     getAllRfqItem,
//     getRfqItemById,
//     deleteRfqItemById
// };


// "rfq_item_id": 2,
// "item_id": 2,
// "rfq_id": 1,
// "quantity": 50,
// "additional_qty": 10,
// "created_by": "Jane Smith",
// "updated_by": "Jane Smith",
// "status": 1,
// "createdAt": "2024-07-11T11:00:00.000Z",
// "updatedAt": "2024-07-11T11:00:00.000Z"

const db = require('../models');
const { RfqItemDetail } = db;

// Controller method to fetch all RFQ items
const getAllRfqItem = async (req, res, next) => {
    try {
        const items = await RfqItemDetail.findAll({
            attributes: ['rfq_item_id', 'quantity', 'additional_qty'],
            include: [
                {
                    model: db.UomMaster,
                    attributes: ['uom_name']
                },
                {
                    model: db.AddressMaster,
                    attributes: ['city']
                }
            ]

        });
        res.status(200).json(items);
    } catch (err) {
        next(err); // Pass error to error handling middleware
    }
};

// Controller method to fetch RFQ item by id
const getRfqItemById = async (req, res, next) => {
    const itemId = req.params.id;
    try {
        const item = await RfqItemDetail.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        next(err); // Pass error to error handling middleware
    }
};

const getRfqItemByRfqid = async (req, res, next) => {
    const rfqid = req.query.rfqid;
    try {
        const item = await RfqItemDetail.findAll({
            where: {
                rfq_id: rfqid
            },
            include: [{
                model: db.ItemsMaster,
                include: {
                    model: db.UomMaster,
                    attributes: ['uom_name'],
                    // model: db.AddressMaster, attributes: ['city']
                },
                attributes: ['item_name', 'item_type', 'item_code', 'quantity_in_stock', 'quantity_on_order', 'nafdac_category',]
            },
            {
                model: db.AddressMaster,
                attributes: ['city']
            }
            ]

        });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        next(err); // Pass error to error handling middleware
    }
};

// Controller method to delete RFQ item by id
const deleteRfqItemById = async (req, res, next) => {
    const itemId = req.params.id;
    try {
        const item = await RfqItemDetail.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.destroy();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        next(err); // Pass error to error handling middleware
    }
};

module.exports = {
    getAllRfqItem,
    getRfqItemById,
    deleteRfqItemById, getRfqItemByRfqid
};

