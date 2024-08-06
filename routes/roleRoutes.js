// routes/api.js
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createRole, deleteRoleById, getAllRole, getRoleById } = require('../controllers/roleController');

// API routes
router
    .get('/roles', getAllRole)
    .post('/role', createRole)
    .get('/role/:id', getRoleById)
    .delete('/role/:id', deleteRoleById)
module.exports = router;
