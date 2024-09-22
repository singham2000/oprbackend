// const { opr_master } = ('../models');
const db = require('../models');
const { OprMaster: opr_master, company_master, OprItems, Vertical, ItemsMaster, sequelize } = db;
const formattedDateTime = require("../middleware/time");
const { Op, count } = require('sequelize');
const { generateSeries } = require("./seriesGenerate");
const { query } = require('express');

const getOpr = async (req, res, next) => {
    try {
        let { opr_id } = req.query
        let opr_detials = await opr_master.findAll({
            where: opr_id ? { opr_id: opr_id } : {},
            include: [
                { model: db.CompanyMaster, attributes: ['company_name', 'company_id'] },
                { model: db.Vertical, attributes: ['vertical_name'] },
                { model: db.Division, attributes: ['division_name'] },
                { model: db.ShipMode, attributes: ['shipment_mode_name'] },
                { model: db.DeliveryTimeline, attributes: ['delivery_timeline_name'] },
                { model: db.Department, attributes: ['dept_name'] },
                { model: db.BuyingHouse, attributes: ['buying_house_name'] },
                { model: db.ItemSuperGroupMaster, attributes: ['item_super_group_name'] },
                { model: db.OprItems }
            ],
            attributes: { exclude: ['department_id', 'opr_description', 'delivery_timeline_id', 'buying_house_id', 'created_by', 'updated_by', 'createdAt', 'updatedAt', 'vertical_id', 'company_id', 'division_id'] }
        })

        const itemCount = await db.OprItems.count({ where: { opr_id: 1086 } });
        console.log("**********************");
        console.log(itemCount);


        // // After fetching the results, you can add the count to each result
        // opr_detials = await Promise.all(opr_detials.map(async (opr) => {

        //     // return { ...opr.toJSON(), itemCount }; // Append itemCount to each opr
        // }));




        // Function to transform nested fields into top-level fields
        const transformData = (data) => {
            return data.map(item => {
                const transformed = {
                    ...item.toJSON(), // Convert Sequelize instance to plain object
                    company_name: item.company_master ? item.company_master.company_name : null,
                    vertical_name: item.vertical_opr ? item.vertical_opr.vertical_name : null,
                    division_name: item.Division ? item.Division.division_name : null,
                    shipment_mode_name: item.ShipMode ? item.ShipMode.shipment_mode_name : null,
                    delivery_timeline_name: item.DeliveryTimeline ? item.DeliveryTimeline.delivery_timeline_name : null,
                    dept_name: item.Department ? item.Department.dept_name : null,
                    buying_house_name: item.BuyingHouse ? item.BuyingHouse.buying_house_name : null,
                    buying_house_name: item.BuyingHouse ? item.BuyingHouse.buying_house_name : null

                };
                // Remove the now redundant nested objects
                delete transformed.company_master;
                delete transformed.vertical_opr;
                delete transformed.Division;
                delete transformed.ShipMode;
                delete transformed.DeliveryTimeline;
                delete transformed.Department;
                delete transformed.BuyingHouse;
                return transformed;
            });
        };

        opr_detials = await transformData(opr_detials);


        await Promise.all(opr_detials.map(async (item) => {
            item.total_item_count = await db.OprItems.count({ where: { opr_id: item.opr_id } });
            item.remaining_item_count = await db.OprItems.count({
                where: {
                    opr_id: item.opr_id,
                    rfq_id: {
                        [Op.is]: null // Checks that rfq_id is null
                    }
                }
            });

            return item; // Ensure each item is returned
        }));

        let rfqcountquery = `select COUNT(*) as qs from quotations_master
                                where rfq_id in (Select rfq_id from opr_items where opr_id=10)`
        opr_detials.received_quotatoins = await db.sequelize.query(rfqcountquery)

        res.status(200).json(opr_detials);
    } catch (err) {
        next(err)
    }
}

const deleteOprById = async (req, res, next) => {
    const opr_id = req.query.opr_id;
    try {
        const result = await opr_master.update({ status: 0 }, {
            where: {
                opr_id: opr_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};

const createOpr = async (req, res, next) => {
    try {
        const doc_code = 'OPR';
        const opr_series = await generateSeries(doc_code);
        req.body.opr_num = opr_series

        const {
            vertical_id,
            company_id,
            opr_date,
            division_id,
            buy_from,
            buying_house_id,
            shipment_mode_id,
            delivery_timeline_id,
            department_id,
            requested_by,
            no_quot_email_alert,
            item_category_id,
            remarks,
            suppliers,
            created_by
        } = req.body;


        req.body.buying_house_id ? buying_house_id : 19
        req.body.status = 1;
        const result = await opr_master.create(req.body);
        res.status(201).json({ message: "Submit Successfully", opr_id: result.opr_id });

    } catch (err) {
        next(err)
    }
};

const updateOprById = async (req, res, next) => {
    const opr_id = req.query.opr_id;
    try {
        const {
            vertical_company,
            company_name,
            opr_date,
            division_id,
            buy_from,
            buy_house,
            shipment_mode_id,
            delivery_timeline_id,
            department_id,
            requested_by,
            no_quot_email_alert,
            item_category_id,
            remarks,
            suppliers,
            updated_by
        } = req.body;


        const result = await opr_master.update({
            vertical_company,
            company_name,
            opr_date,
            division_id,
            buy_from,
            buy_house,
            shipment_mode_id,
            delivery_timeline_id,
            department_id,
            requested_by,
            no_quot_email_alert,
            item_category_id,
            remarks,
            suppliers,
            opr_status: "Open",
            updated_by,
            updated_on: formattedDateTime
        }, {
            where: {
                opr_id: opr_id
            }
        });



        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

const confirmOpr = async (req, res, next) => {
    try {
        const opr_id = req.params.opr_id;
        const response = await opr_master.update(
            {
                status: 2,
            },
            {
                where: {
                    opr_id: opr_id
                },
            },
        );

        //update opr items status
        const response2 = await OprItems.update(
            { status: 2 },
            {
                where: {
                    opr_id: opr_id
                },
            },
        )

        res.status(201).json({ message: "OPR Genrated Successfully" });
    } catch (err) {

    }
}

const sentforApproval = async (req, res, next) => {
    const { doc_id, status } = req.body;
    try {
        const response = await opr_master.findByPk(doc_id);

        if (!response) {
            return res.status(404).json({ message: "Document not found" });
        } else {
            response.status = status; // Change to the new status
            await response.save(); // Save the updated document
            // res.status(200).json({ message: "OPR sent for approval successfully", data: response });
            next();
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}

const createOpr2 = async (req, res, next) => {
    try {
        const {
            vertical_id,
            company_id,
            opr_date,
            division_id,
            buy_from,
            buying_house_id,
            shipment_mode_id,
            delivery_timeline_id,
            department_id,
            requested_by,
            no_quot_email_alert,
            item_category_id,
            remarks,
            suppliers,
            created_by
        } = req.body;

        req.body.buying_house_id ? buying_house_id : 19
        req.body.status = 1;

        const result = await opr_master.create(req.body);
        res.status(201).json({ message: "Submit Successfully", opr_id: result.opr_id });
    } catch (err) {
        next(err)
    }
};

const itemforOpr = async (req, res, next) => {
    try {
        let { super_category_id } = req.query
        let foundItem = await ItemsMaster.findAll({
            where: { super_category_id },
            attributes: { exclude: ['item_img'] }
        })
        res.status(200).json({ msg: "Sucess", data: foundItem })
    } catch (err) {
        next(err);
    }
}

oprController = {
    confirmOpr,
    getOpr,
    deleteOprById,
    createOpr,
    updateOprById,
    itemforOpr,
    sentforApproval
};

module.exports = oprController