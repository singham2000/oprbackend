const db = require('../models')
const { Document } = db

// Create a new document
exports.createDocument = async (req, res, next) => {
    try {
        const { entity_id, entity_num, entity_name, document_description, document_name, document_string, uploaded_by } = req.body;

        const newDocument = await Document.create({
            entity_id,
            entity_num,
            entity_name,
            document_description,
            document_name,
            document_string,
            uploaded_by
        });

        res.status(201).json({
            message: 'Document created successfully',
            data: newDocument
        });
    } catch (err) {
        next(err);
    }
};

// Get all documents
exports.getAllDocuments = async (req, res, next) => {
    try {
        const documents = await Document.findAll();
        res.status(200).json({
            message: 'Documents retrieved successfully',
            data: documents
        });
    } catch (err) {
        next(err);
    }
};



// Get a document by ID
exports.getDocumentByEntityId = async (req, res, next) => {
    try {
        const { entity_id } = req.query;
        const document = await Document.findAll({
            where: { entity_id }
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({
            message: 'Document retrieved successfully',
            data: document
        });

    } catch (err) {
        next(err);
    }
};

