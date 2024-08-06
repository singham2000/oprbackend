const { Department: DepartmentMaster, DeptDesigMapping, desigMaster } = require('../models');
const { Op } = require('sequelize'); // Import Op from Sequelize
// Create a new department
exports.createDepartment = async (req, res, next) => {
    try {
        const { dept_name, status, created_by } = req.body;
        const newDepartment = await DepartmentMaster.create({
            dept_name,
            status,
            created_by
        });
        res.status(201).json(newDepartment);
    } catch (err) {
        next(err)
    }
};

// Get all departments
exports.getAllDepartments = async (req, res, next) => {
    try {
        const departments = await DepartmentMaster.findAll({
            attributes: ['dept_id', 'dept_name']
        });
        res.json(departments);
    } catch (err) {
        next(err)
    }
};

// Get a department by ID
exports.getDepartmentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const department = await DepartmentMaster.findByPk(id);
        if (!department) {
            res.status(404).json({ error: 'Department not found' });
        } else {
            res.json(department);
        }
    } catch (err) {
        next(err)
    }
};

// Update a department by ID
exports.updateDepartmentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [updated] = await DepartmentMaster.update(req.body, {
            where: { dept_id: id }
        });
        if (updated) {
            const updatedDepartment = await DepartmentMaster.findByPk(id);
            res.json(updatedDepartment);
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (err) {
        next(err)
    }
};

// Delete a department by ID
exports.deleteDepartmentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await DepartmentMaster.destroy({
            where: { dept_id: id }
        });
        if (deleted) {
            res.json({ message: 'Department deleted successfully' });
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (err) {
        next(err)
    }
};


// get designation by departmnets VIA mapped table
exports.getDesignation = async (req, res, next) => {
    try {
        const dept_id = req.query.dept_id;

        // design id list form dept and designation  mapping table
        const desig_id_list = await DeptDesigMapping.findAll({
            where: {
                dept_id: {
                    [Op.eq]: dept_id
                }
            },
            attributes: ['designation_id']
        })

        const desigIds = await desig_id_list.map(item => item.designation_id);

        // find designation as per ids
        const desiglist = await desigMaster.findAll({
            attributes: ['designation_id', 'designation_name'],
            where: {
                designation_id: {
                    [Op.in]: desigIds
                }
            }
        })


        res.status(200).json(desiglist);
    } catch (err) {
        next(err)
    }
}
