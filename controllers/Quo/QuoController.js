const db = require("../../models");
const { ServiceQUO } = db;



//generate service rfq
exports.createServiceQuotation = async (req, res, next) => {
    try {
        console.log("Service Quo")
        console.log(req.body)
        const { vendor_id, amount, po_id, remarks, service_rfq_id, status, created_by } = req.body
        let newServiceQuo = await ServiceQUO.create({ vendor_id, amount, po_id, remarks, status, service_rfq_id, created_by })
        if (newServiceQuo) {
            res.status(201).json({ message: "Quotation Generated Sucessfully" })
        }
    } catch (errr) {
        next(errr)
    }
}

//all quotaion list
exports.ServiceQuotationList = async (req, res, next) => {
    try {
        let serviceQuotation = await ServiceQUO.findAll()
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    }
}

//service quotation list
exports.ServiceQuotationListByServiceRFQid = async (req, res, next) => {
    try {
        let { service_rfq_id } = req.query;
        let serviceQuotation = await ServiceQUO.findAll({
            where: { service_rfq_id, status: 0 }
        })
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    }
}


// confirm quotaiton
exports.ServiceQuotationConfirmQuoid = async (req, res, next) => {
    try {
        // console.log("*********************")
        let { service_quo_id } = req.query;
        console.log(service_quo_id)
        let serviceQuotation = await ServiceQUO.update(
            { status: 2 },
            {
                where: { service_quo_id }
            })
        if (serviceQuotation) {
            console.log(serviceQuotation)
            res.status(201).json({ message: "Quotation Has Been confirm" })
        }


        // let data = await ServiceQUO.findByPk(service_quo_id)
        // console.log(data);
        // res.status(201).json({ message: "Quotation Has Been confirm" })
    } catch (errr) {
        next(errr)
    }
}





//service quotation list
exports.confirmQuotaion = async (req, res, next) => {
    try {
        let { service_rfq_id } = req.query;
        let serviceQuotation = await ServiceQUO.findAll({
            where: { status }
        })
        if (serviceQuotation) {
            res.status(201).json(serviceQuotation)
        }
    } catch (errr) {
        next(errr)
    }
}


