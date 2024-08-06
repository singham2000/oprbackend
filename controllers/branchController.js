const db = require('../models');
const { branch: Branch } = db;


const getAllBranch = async (req, res, next) => {
    try {
        const items = await Branch.findAll();
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};


// Controller method to fetch item by id
const getBranchById = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await Branch.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);

    } catch (err) {
        next(err)
    }
};

// Controller method to delte item by id
const deleteBranchById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Branch.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.destroy()
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// Controller method to delte item by id
const createBranch = async (req, res) => {
    try {
        const { branch_name } = req.body;
        const newItem = await Branch.create({ branch_name });
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};

module.exports = {
    getAllBranch,
    getBranchById,
    deleteBranchById,
    createBranch
};





