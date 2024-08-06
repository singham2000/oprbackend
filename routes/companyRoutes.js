// routes/api.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const companyController2 = require('../controllers/CompanyController/companyController.js');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/', companyController.getCompany)
    .get('/v1', companyController2.getCompanies)
    .post('/', setAuditFields, companyController.createCompany)
    .post('/v1', setAuditFields, companyController2.createCompany)
    .get('/vertical', companyController.getCompanyByVertical)
    .get('/byvertical', companyController.getCompanyByVertical)
    .get('/buyinghouse', companyController.getBuyingHouse)
    .put('/', companyController.updateCompanyById)
    .delete('/', companyController.deleteCompanyById)

module.exports = router;