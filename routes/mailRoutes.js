// routes/api.js
const express = require('express');
const senEmail = require('../utilites/sendmail')
const { createEmailMessage } = require('../controllers/emailMessageController.js')
const router = express.Router();
const upload = require('../utilites/handlefile.js');
const { po_email_conformation } = require('../controllers/poController.js')


// API routes
router
    .post('/send', upload.single('attachment'), createEmailMessage, po_email_conformation, senEmail)
module.exports = router;