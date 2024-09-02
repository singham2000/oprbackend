const db = require("../../models");
const {
    ServiceRFQ,
} = db;



//generate service rfq
exports.CreateServiceRfq = async (req, res, next) => {
    try {
        console.log("Generase service rfq")
        console.log(req.body)
        const { service_type_id, po_id, service_description, vendor_ids_list, created_by } = req.body
        let newSRfq = await ServiceRFQ.create({ created_by, service_type_id, po_id, service_description, vendor_ids_list })
        if (newSRfq) {
            res.status(201).json({ message: "Rfq Generated Sucessfully" })
        }
    } catch (errr) {
        next(errr)
    }
}



//get service rfq list
exports.GetRfqList = async (req, res, next) => {
    try {
        let servicerfqList = await ServiceRFQ.findAll();
        if (servicerfqList) {
            res.status(201).json(servicerfqList)
        }
    } catch (errr) {
        next(errr)
    }
}