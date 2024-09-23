const db = require('../models');
const { StatusMaster } = db;
const { Op } = require('sequelize');

async function getStatusName(doc_name, status_code) {
    try {
        const status_name = await StatusMaster.findOne({
            where: {
                status: { [Op.ne]: 0 },
                status_code,
                doc_name
            }
        });

        if (!status_name) {
            return status_code
        }

        return status_name.status_name;

    } catch (err) {
        throw err;
    }
}

module.exports = { getStatusName };