const {
  ShippingMaster,
  assessment,
  Pfi_master,
  PaymentRequestMaster,
  po_master,
  sequelize,
  Pfi_line_items,
  item,
  insurance,
  form_m,
  letter_of_credit,
  son_pfi,
  CompanyMaster,
  operations_nafdac,
  paar,
  operations_nafdac_master,
  govt_charges,
  nafdac_pfi,
} = require("../models");
const db = require("../models");

const formattedDateTime = require("../middleware/time");
const { Op, where } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require("./quotationItemsController");

const getPfi = async (req, res, next) => {
  try {
    // Check if ID is provided in the request parameters
    const { pfi_id } = req.query;

    // If an ID is provided, fetch a single record by ID
    if (pfi_id) {
      const result = await Pfi_master.findOne({
        where: { pfi_id }, // Assuming 'id' is the primary key
        include: [
          { model: insurance },
          { model: form_m },
          { model: letter_of_credit },
          { model: son_pfi },
          { model: assessment },
          { model: ShippingMaster },
          { model: CompanyMaster },
          { model: operations_nafdac },
          { model: paar },
          { model: operations_nafdac_master },
          { model: govt_charges },
          { model: nafdac_pfi },
        ],
      });

      // If no record is found, send a 404 response
      if (!result) {
        return res.status(404).json({ message: "Pfi_master not found" });
      }

      return res.status(200).json(result);
    }

    // If no ID is provided, fetch all records
    const results = await Pfi_master.findAll({
      include: [
        { model: insurance },
        { model: form_m },
        { model: letter_of_credit },
        { model: son_pfi },
        { model: assessment },
        { model: ShippingMaster },
        { model: CompanyMaster },
        { model: operations_nafdac },
        { model: paar },
        { model: operations_nafdac_master },
        { model: govt_charges },
        { model: nafdac_pfi },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error calling UDF:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// const getPfi = async (req, res, next) => {
//     try {
//         const result = await Pfi_master.findAll({
//             include: [
//                 { model: insurance },
//                 { model: form_m },
//                 { model: letter_of_credit },
//                 { model: son_pfi }
//             ]
//         })
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error calling UDF:', error);
//         throw error;
//     }
// };

const getPfiData = async (req, res, next) => {
  try {
    const result = await Pfi_master.findAll({
      attributes: [
        "pfi_id",
        "pfi_num",
        "opo_selected_id",
        "opo_selected_num",
        "opo_ids",
        "opo_nums",
        "remarks",
        "amount",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: db.Pfi_line_items,
          include: [
            {
              model: db.ItemsMaster,
              attributes: [
                "item_series",
                "item_name",
                "item_code",
                "factory",
                "item_type",
                "item_description",
                "hsn_code",
                "super_category_id",
                "group_name",
                "sub_group",
                "cria",
                "nafdac_name",
                "nafdac_category",
                "tolerance",
                "vendors",
                "lead_time",
                "quantity_in_stock",
                "quantity_on_order",
                "reorder_level",
                "unit_price",
                "msrp",
                "uom_id",
                [sequelize.literal("dbo.fn_UomName(uom_id)"), "uom_name"],
              ],
            },
          ],
        },
        {
          model: db.opo_master,
          include: [
            {
              model: db.OprMaster,
              attributes: [
                "opr_id",
                "opr_num",
                "vertical_id",
                "company_id",
                "opr_date",
                "division_id",
                "buy_from",
                "buying_house_id",
                "shipment_mode_id",
                "delivery_timeline_id",
                "department_id",
                "requested_by",
                "no_quot_email_alert",
                "remarks",
                "suppliers",
                "item_category_id",
                [
                  db.sequelize.literal(
                    "dbo.fn_ShipmentModeName(shipment_mode_id)"
                  ),
                  "shipment_mode_name",
                ],
              ],
              include: [
                {
                  model: db.BuyingHouse,
                  include: [
                    {
                      model: db.country, // Include the country model
                      as: 'CountryData', // Use the alias for the association
                      attributes: [
                        "country",
                      ],
                    },
                    {
                      model: db.state, // Include the country model
                      as: 'StateData', // Use the alias for the association
                      attributes: [
                        "state",
                      ],
                    },
                    {
                      model: db.city, // Include the country model
                      as: 'CityData', // Use the alias for the association
                      attributes: [
                        "city",
                      ],
                    },
                  ],
                },
                {
                  model: db.CompanyMaster,
                  include: [{ model: db.AddressMaster }],
                },
              ],
            },
            {
              model: db.quotation_master,
              include: [
                {
                  model: db.rfq,
                  attributes: [
                    "rfq_num",
                    "remarks",
                    "vendor_list",
                    "req_doc_id",
                    "port_of_destination",
                    "delivery_timeline_in_weeks",
                    [
                      db.sequelize.literal(
                        "dbo.fn_GetPortDestinationName(port_of_destination)"
                      ),
                      "port_destination_name",
                    ],
                  ],
                },
                {
                  model: db.additional_cost,
                  attributes: ["charge_name", "charge_amount", "heading"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

const getPfibyPoid = async (req, res, next) => {
  let { po_id } = req.query;
  try {
    const result = await Pfi_master.findAll({
      where: {
        po_id: po_id,
      },
    });
    await result.forEach(
      (item) => (item.dataValues.company_name = "ABCD Company")
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

// Controller method to delete by id
const deletePfiyId = async (req, res, next) => {
  const { po_id, company_id } = req.query;
  try {
    const result = await po_master.update(
      { status: 0 },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
const getPfibyid = async (req, res, next) => {
  let { pfi_id, company_id } = req.query;
  try {
    let query = `select pfi_master.pfi_num,company_master.company_name from pfi_master
                inner join company_master
                on company_master.company_id = pfi_master.company_id
                where pfi_id = ${pfi_id}`;

    let [result, metadata] = await sequelize.query(query);

    let pfi_items2 = await Pfi_line_items.findAll({
      where: {
        [Op.and]: [{ pfi_id }, { company_id }],
      },
    });
    res.status(200).json({ pfi_details: result, item_list: pfi_items2 });
  } catch (err) {
    next(err);
  }
};
// Controller method to Create po with status 1
const genratePfi = async (req, res, next) => {
  let {
    amount,
    opo_ids,
    opo_nums,
    selectedOPOid,
    selectedOPOnum,
    remarks,
    items,
  } = req.body;
  console.log("sharma", req.body);
  try {
    const doc_code = "PFI";
    pfi_num = await generateSeries(doc_code);

    //genrate po
    const PFI_response = await Pfi_master.create({
      pfi_num: pfi_num,
      opo_selected_id: selectedOPOid,
      opo_selected_num: selectedOPOnum,
      remarks: remarks,
      opo_nums,
      opo_ids,
      amount,
      status: 1,
    });
    LastInsertedId = PFI_response.pfi_id;

    const pfiItems = await Promise.all(
      items.map(async (item) => {
        console.log("item.line_total_margin", item.line_total_margin);

        const result2 = await Pfi_line_items.create({
          pfi_id: LastInsertedId, // Link the OPO item to the newly created OPO
          margin_percent: item.margin_percent,
          line_total: item.line_total_margin,
          opo_qty: item.quote_qtd,
          opo_item_id: item.opo_items_id,
          ...item, // Spread the item properties
          status: 1, // Active status
        });
        return result2; // Return the created item
      })
    );

    // const response = await Pfi_line_items.bulkCreate(pfi_items);
    res.status(201).json({ message: "Pfi Submit Successfully" });
  } catch (err) {
    next(err);
  }
};
// get opr item company list by po no
const getcompanylistPoNumber = async (req, res, next) => {
  try {
    let { po_id } = req.query;
    console.log("po_id", po_id);
    let query = `select  distinct  opr_items.company_id ,dbo.fn_companyname(opr_items.company_id)  as comp_name
            from opr_items            
			inner join po_items
			on opr_items.rfq_id =  po_items.rfq_id
			where  po_items.po_id=${po_id}`;

    let [result, metadata] = await db.sequelize.query(query);
    await result.forEach(
      (item, index) => (item.status = index % 2 == 0 ? 1 : 0)
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to Create po with status 1
const genratePfi2 = async (req, res, next) => {};

module.exports = {
  genratePfi,
  getPfi,
  genratePfi2,
  getPfibyPoid,
  getPfibyid,
  getPfiData,
};
