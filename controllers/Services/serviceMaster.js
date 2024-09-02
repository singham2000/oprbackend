const { ServiceMaster } = require('../../models')

//create service master

exports.createServiceMaster = async (req, res, next) => {
    try {
        const { service_name, service_code, service_type, status } = req.body;
        let response = await ServiceMaster.create({ service_name, service_code, service_type, status })
        if (response) {
            res.status(201).json({ message: "Services Crated Sucessfully" })
        }
    } catch (err) {
        next(err);
    }
} 