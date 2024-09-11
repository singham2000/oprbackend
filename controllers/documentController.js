const db = require('../models')
const { document } = db
// Create a new document

exports.createDocument = async (req, res, next) => {
    try {
        // console.log("----------- Document Genreated -----------")
        //  // Log the request body and files
        //  console.log('Request Body:', req.body);
        //  console.log('Request Files:', req.files);


        const documentsData  = [];
        const metadata = req.body;

         // Loop over files
         for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];            
            // Create a document object for each file
            const document = {
                linked_id: metadata[i].linked_id || null,
                table_name: metadata[i].table_name || null,
                type: metadata[i].type || null,
                title: metadata[i].title || null,
                doc_name: file.originalname,
                doc_base64: file.buffer.toString('base64'), // Convert buffer to base64 string
                created_by: metadata.created_by || null,
            };
            documentsData.push(document);
        }        
        const newDocument = await document.bulkCreate(documentsData );
        res.status(201).json({msg:"document genreated Sucess fully",data:newDocument});
    } catch (error) {
        next(error);
    }
};



// Get all documents
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await document.findAll();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
    try {
        const doc = await document.findByPk(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a document by ID
exports.updateDocument = async (req, res) => {
    try {
        const [updated] = await document.update(req.body, {
            where: { document_id: req.params.id }
        });
        if (updated) {
            const updatedDocument = await document.findByPk(req.params.id);
            res.status(200).json(updatedDocument);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a document by ID
exports.deleteDocument = async (req, res) => {
    try {
        const deleted = await document.destroy({
            where: { document_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
