const { ApprovalLog } = require('../../models'); // Adjust the path as needed

const ApprovalLogController = {
    // Create a new approval log
    async create(req, res) {
        try {
            let { approval_matrix_id, doc_id, doc_number, user_id, action, comments } = req.body;
            const approvalLog = await ApprovalLog.create(req.body);
            return res.status(201).json(approvalLog);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // Get all approval logs
    async findAll(req, res) {
        try {
            const approvalLogs = await ApprovalLog.findAll();
            return res.status(200).json(approvalLogs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Get an approval log by ID
    async findById(req, res) {
        try {
            const approvalLog = await ApprovalLog.findByPk(req.params.id);
            if (!approvalLog) {
                return res.status(404).json({ error: 'Approval log not found' });
            }
            return res.status(200).json(approvalLog);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Get an approval log by ID
    async findAll(req, res) {
        try {
            const approvalLog = await ApprovalLog.findAll();
            if (!approvalLog) {
                return res.status(404).json({ error: 'Approval log not found' });
            }
            return res.status(200).json(approvalLog);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Update an approval log by ID
    async update(req, res) {
        try {
            const [updated] = await ApprovalLog.update(req.body, {
                where: { approval_id: req.params.id },
            });
            if (!updated) {
                return res.status(404).json({ error: 'Approval log not found' });
            }
            const updatedApprovalLog = await ApprovalLog.findByPk(req.params.id);
            return res.status(200).json(updatedApprovalLog);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // Delete an approval log by ID
    async delete(req, res) {
        try {
            const deleted = await ApprovalLog.destroy({
                where: { approval_id: req.params.id },
            });
            if (!deleted) {
                return res.status(404).json({ error: 'Approval log not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ApprovalLogController;
