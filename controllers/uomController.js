const db = require('../models')
const { UomMaster: Uom } = db


// Controller method to fetch all items
const getAllUom = async (req, res, next) => {
    try {
        const items = await Uom.findAll();
        res.status(200).json(items);

    } catch (err) {
        // console.error('Error fetching uom data:', err);
        // res.status(500).json({ error: 'Error fetching uom data' });
        next(err);
    }
};


// Controller method to fetch item by id
const getUomById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Uom.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'uom not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        // console.error(`Error fetching uom with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching uom item' });
        next(err);
    }
};



// Controller method to delte item by id
const deleteUomById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Uom.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'oum not found' });
        }

        item.destroy()
        res.status(200).json({ message: 'oum deleted successfully' });
    } catch (err) {
        // console.error(`Error fetching oum with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching oum' });
        next(err);
    }
};


// Controller method to delte item by id
const createUom = async (req, res) => {
    try {
        const { unit_of_measurement_name } = req.body;
        const newItem = await Uom.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating oum:', err);
        // res.status(500).json({ error: 'Error creating oum' });
        next(err);
    }
};

module.exports = {
    getAllUom,
    getUomById,
    deleteUomById,
    createUom
};





