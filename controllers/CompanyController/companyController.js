const { CompanyMaster, AddressMaster, sequelize } = require('../../models');
const generateSeries = require('../../utilites/genrateSeries')
const { Op } = require('sequelize');


exports.createCompany = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {

        const { companyData, addressData } = req.body;
        companyData.company_series = await generateSeries('CMP') || 'CMP-000-CMP';
        companyData.created_by = req.body.created_by;
        const company = await CompanyMaster.create(companyData, { transaction });

        addressData.forEach(data => {
            data.entity_id = company.company_id;
            data.entity_type = 'company';
            data.created_by = req.body.created_by
        });

        const address = await AddressMaster.bulkCreate(addressData, { transaction });
        await transaction.commit();
        res.status(201).json({ company, address });
    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};


//get company by id and all company
exports.getCompanies = async (req, res, next) => {
    const { companyId } = req.query;
    try {
        let companies;
        if (companyId) {
            companies = await CompanyMaster.findOne({
                where: { company_id: companyId },
                include: [{
                    model: AddressMaster,
                }]
            });
            if (!companies) {
                return res.status(404).json({ message: 'Company not found' });
            }
        } else {
            companies = await CompanyMaster.findAll({
                include: [{
                    model: AddressMaster
                }]
            });
        }

        res.status(200).json(companies);
    } catch (err) {
        next(err);
    }
};




// Get company according to vertical
exports.getCompanyByVertical = async (req, res, next) => {
    const vertical_id = req.query.vertical_id;
    try {
        const result = await CompanyMaster.findAll({
            where: {
                vertical_id: vertical_id,
                status: { [Op.ne]: 0 }
            }
        });
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};


// Update a company by ID
// exports.updateCompany = async (req, res) => {
//     try {
//         const [updated] = await CompanyMaster.update(req.body, {
//             where: { company_id: req.params.id }
//         });
//         if (updated) {
//             const updatedCompany = await CompanyMaster.findByPk(req.params.id);
//             res.status(200).json(updatedCompany);
//         } else {
//             res.status(404).json({ error: 'Company not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Delete a company by ID
// exports.deleteCompany = async (req, res) => {
//     try {
//         const deleted = await CompanyMaster.destroy({
//             where: { company_id: req.params.id }
//         });
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: 'Company not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
