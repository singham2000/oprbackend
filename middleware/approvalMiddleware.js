const { ApprovalMatrix, ApprovalLog } = require('../models'); // Adjust the path


const approvalMiddleware = async (req, res, next) => {
    const { module, id } = req.params;

    // Validate the module type
    const validModules = ['OPR', 'QUO', 'RFQ', 'OPO', 'CI'];
    if (!validModules.includes(module)) {
        logger.error(`Invalid module type: ${module}`);
        return res.status(400).json({ error: 'Invalid module type' });
    }


    try {
        // Check if the record exists
        const approvalMatrix = await ApprovalMatrix.findByPk(id);
        if (!approvalMatrix) {
            logger.error(`Approval matrix not found for ID: ${id}`);
            return res.status(404).json({ error: 'Approval matrix not found' });
        }

        // Attach the approvalMatrix to the request object for later use
        req.approvalMatrix = approvalMatrix;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = approvalMiddleware;