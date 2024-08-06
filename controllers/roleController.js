const db = require('../models');
const { role: Role } = db


// Controller method to fetch all items
const getAllRole = async (req, res) => {
    try {
        const items = await Role.findAll({ attributes: ['role_id', 'role_name'] });
        res.status(200).json(items);

    } catch (err) {
        // console.error('Error fetching items:', err);
        // res.status(500).json({ error: 'Error fetching items' });
        next(err);
    }
};


// Controller method to fetch item by id
const getRoleById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Role.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err);
    }
};




// Controller method to delte item by id
const deleteRoleById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Role.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.destroy()
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err);
    }
};


// Controller method to delte item by id
const createRole = async (req, res) => {
    try {
        console.log(req.body);
        const { role_name } = req.body;
        const newItem = await Role.create({ role_name });
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};




module.exports = {
    getAllRole,
    getRoleById,
    deleteRoleById,
    createRole
};





