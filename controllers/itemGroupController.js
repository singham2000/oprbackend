const { ItemGroupMaster } = require('../models'); // Adjust the path as necessary




// Create a new item group
exports.createItemGroup = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.create(req.body);
        res.status(201).json(itemGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all item groupss
exports.getAllItemGroups = async (req, res) => {
    try {
        const itemGroups = await ItemGroupMaster.findAll({
            attributes: ['item_group_id', 'item_group_name']
        });
        res.status(200).json(itemGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an item group by ID
exports.getItemGroupById = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.findByPk(req.params.id);
        if (itemGroup) {
            res.status(200).json(itemGroup);
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an item group by ID
exports.updateItemGroup = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.findByPk(req.params.id);
        if (itemGroup) {
            await itemGroup.update(req.body);
            res.status(200).json(itemGroup);
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an item group by ID
exports.deleteItemGroup = async (req, res) => {
    try {
        const itemGroup = await ItemGroupMaster.findByPk(req.params.id);
        if (itemGroup) {
            await itemGroup.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Item group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
