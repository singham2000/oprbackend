const db = require('../models'); // Adjust the path according to your project structure
let { CategoryMaster: Itemcategory } = db


// Create a new item category
const createItemCategory = async (req, res, next) => {
    try {
        const itemCategory = await Itemcategory.create(req.body);
        res.status(201).json(itemCategory);
    } catch (error) {
        next(error)
    }
};

// Get all item categories
const getAllItemCategories = async (req, res, next) => {
    try {
        const itemCategories = await Itemcategory.findAll({ attributes: ['category_name'] });
        res.status(200).json(itemCategories);
    } catch (error) {
        next(error)
    }
};

// Get a single item category by ID
const getItemCategoryById = async (req, res, next) => {
    try {
        const itemCategory = await Itemcategory.findByPk(req.params.id);
        if (itemCategory) {
            res.status(200).json(itemCategory);
        } else {
            res.status(404).json({ error: 'Item category not found' });
        }
    } catch (error) {
        next(error)
    }
};

// Update an item category by ID
const updateItemCategory = async (req, res, next) => {
    try {
        const [updated] = await Itemcategory.update(req.body, {
            where: { item_category_id: req.params.id }
        });
        if (updated) {
            const updatedItemCategory = await Itemcategory.findByPk(req.params.id);
            res.status(200).json(updatedItemCategory);
        } else {
            res.status(404).json({ error: 'Item category not found' });
        }
    } catch (error) {
        next(error)
    }
};


// Delete an item category by ID  
// After deltion item still in data base but status of category  turn into zero
const deleteItemCategory = async (req, res, next) => {
    try {
        const [updated] = await Itemcategory.update(
            { status: 0 },
            { where: { item_category_id: req.params.id } }
        );
        if (updated) {
            res.status(200).json({ message: 'Item category status updated to 0' });
        } else {
            res.status(404).json({ error: 'Item category not found' });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createItemCategory,
    getAllItemCategories,
    getItemCategoryById,
    updateItemCategory,
    deleteItemCategory,
};
