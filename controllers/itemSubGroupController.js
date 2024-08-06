const { ItemSubGroupMaster } = require('../models')

// Create a new item sub group
exports.createItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.create(req.body);
        res.status(201).json(itemSubGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all item sub groups
exports.getAllItemSubGroups = async (req, res) => {
    try {
        const itemSubGroups = await ItemSubGroupMaster.findAll();
        res.status(200).json(itemSubGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an item sub group list by parnt Group id
exports.getAllItemGroupsByGropuid = async (req, res) => {
    let groupId = req.query.groupid
    try {
        const itemGroups = await ItemSubGroupMaster.findAll({
            where: {
                item_parent_group_id: groupId
            },
            attributes: ['item_sub_group_id', 'item_sub_group_name']
        });
        res.status(200).json(itemGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// Get an item sub group by ID
exports.getItemSubGroupById = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an item sub group by ID
exports.updateItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            await itemSubGroup.update(req.body);
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an item sub group by ID
exports.deleteItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            await itemSubGroup.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new item sub group
exports.createItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.create(req.body);
        res.status(201).json(itemSubGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all item sub groups
exports.getAllItemSubGroups = async (req, res) => {
    try {
        const itemSubGroups = await ItemSubGroupMaster.findAll();
        res.status(200).json(itemSubGroups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an item sub group by ID
exports.getItemSubGroupById = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an item sub group by ID
exports.updateItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            await itemSubGroup.update(req.body);
            res.status(200).json(itemSubGroup);
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an item sub group by ID
exports.deleteItemSubGroup = async (req, res) => {
    try {
        const itemSubGroup = await ItemSubGroupMaster.findByPk(req.params.id);
        if (itemSubGroup) {
            await itemSubGroup.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Item sub group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
